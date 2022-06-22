import { Client } from "@notionhq/client";
import hljs from "highlight.js/lib/common";

const client = new Client({ auth: process.env.NOTION_KEY });

const HTML = {
  parseText(text, annotations) {
    let result = text;
    if (annotations.bold) {
      result = `<strong>${result}</strong>`;
    }
    if (annotations.italic) {
      result = `<em>${result}</em>`;
    }
    if (annotations.strikethrough) {
      result = `<del>${result}</del>`;
    }
    if (annotations.underline) {
      result = `<u>${result}</u>`;
    }
    if (annotations.code) {
      result = `<code class="code">${result}</code>`;
    }
    return result;
  },
  parseCode(obj) {
    const str = obj[obj.type].rich_text[0].plain_text;
    const language = obj.code.language;

    const codeObj = hljs.highlight(str, { language });

    const captionHTML = this.parseTexts({
      type: "caption",
      caption: {
        rich_text: obj.code.caption,
      },
    });

    return `<pre class="code">${captionHTML}<div class="code__language">${language}</div><code class="hljs language-${codeObj.language}">${codeObj.value}</code></pre>`;
  },
  parseTexts(obj, children = "") {
    let result = "";
    for (const text of obj[obj.type].rich_text) {
      const t = text.plain_text.replace("\n", "<br />");
      result += this.parseText(t, text.annotations);
    }
    let tag = "";
    let className = "";
    switch (obj.type) {
      case "heading_1":
        tag = "h1";
        break;
      case "heading_2":
        tag = "h2";
        break;
      case "heading_3":
        tag = "h3";
        break;
      case "quote":
        tag = "blockquote";
        break;
      case "paragraph":
        tag = "p";
        break;
      case "to_do":
        tag = "div";
        className = "to-do";
        if (obj.to_do.checked) {
          className += " checked";
        }
        break;
      case "bulleted_list_item":
      case "numbered_list_item":
        tag = "li";
        break;
      case "callout":
        tag = "div";
        className = "callout__content";
      case "caption":
        tag = "p";
        className = "code__caption";
    }

    let openTag = `<${tag}`;
    if (className) {
      openTag += ` class=${className}`;
    }
    openTag += ">";
    const closeTag = `</${tag}>`;

    return `${openTag}${result}${children}${closeTag}`;
  },
  parse(content) {
    let html = "";
    let prevType = null;

    content.forEach((c, idx) => {
      const childrenHTML = this.parse(c.children);

      // li -> p : list 끝  </ul> </ol> 추가
      if (prevType != c.type) {
        if (prevType == "bulleted_list_item") {
          html += "</ul>";
        } else if (prevType == "numbered_list_item") {
          html += "</ol>";
        }
      }

      switch (c.type) {
        case "heading_1":
        case "heading_2":
        case "heading_3":
        case "paragraph":
        case "quote":
        case "to_do":
        case "bulleted_list_item":
        case "numbered_list_item":
          if (prevType != c.type) {
            if (c.type === "numbered_list_item") {
              html += "<ol>";
            } else if (c.type === "bulleted_list_item") {
              html += "<ul>";
            }
          }

          html += HTML.parseTexts(c, childrenHTML);
          break;
        case "code":
          html += HTML.parseCode(c);
          break;
        case "divider":
          html += "<hr />";
          break;
        case "image":
          html += `<img src='${c.image.file.url}' />`;
          break;
        case "video":
          const re = /.*v=(.*)/gi;
          const videoId = re.exec(c.video.external.url)[1];

          html += `<div class="video"><div class="video-container"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width=100%"></iframe></div></div>`;
          break;
        case "audio":
          html += `<audio controls preload="none" src=${c.audio.file.url}></audio>`;
          break;
        case "callout":
          html += "<div class='callout'>";
          html += `<div class='callout__emoji'>${c.callout.icon.emoji}</div>`;
          html += HTML.parseTexts(c, childrenHTML);
          html += "</div>";
          break;
      }

      if (idx == content.length - 1) {
        if (c.type == "bulleted_list_item") {
          html += "</ul>";
        } else if (c.type == "numbered_list_item") {
          html += "</ol>";
        }
      }

      prevType = c.type;
    });

    console.log(html);

    return html;
  },
};

const queryDatabase = async function (
  databaseId,
  pageSize,
  hasMore,
  startCursor,
  category
) {
  const body = {
    database_id: databaseId,
    page_size: parseInt(pageSize),

    // Publish 된 것만 가져온다.
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },

    // 생성일 기준 내림차순정렬
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  };

  // hasMore인 경우 startCursor 추가
  if (hasMore) {
    body.start_cursor = startCursor;
  }

  // Category 필터 추가
  if (category) {
    body.filter.and.push({
      property: "category",
      select: {
        equals: category,
      },
    });
  }

  return await client.databases.query(body);
};

const getAllBlock = async function (id) {
  const blocks = [];
  const res = await client.blocks.children.list({ block_id: id });
  for (const block of res.results) {
    block.children = [];
    if (block.has_children) {
      block.children = await getAllBlock(block.id);
    }

    blocks.push(block);
  }
  return blocks;
};

const retrievePage = async function (id) {
  try {
    const page = await client.pages.retrieve({ page_id: id });
    const blocks = await getAllBlock(id);
    const body = await HTML.parse(blocks);

    return {
      cover: page.cover,
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
      category: page.properties.category.select.name,
      title: page.properties.title.title[0].plain_text,
      tags: page.properties.tags.multi_select.map((v) => v.name),
      body,
    };
  } catch (e) {
    console.error(e.name, e.message);
  }
};

export { queryDatabase, retrievePage };
