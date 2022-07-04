<template>
  <section class="window-list">
    <template v-for="(w, name) in windows">
      <DesktopWindow
        :name="name"
        v-if="w.opened"
        v-show="w.opened && !w.minimized"
      >
        <component :is="name" />
      </DesktopWindow>
    </template>
  </section>
</template>

<script>
import Post from "@/components/desktop/windows/Post";
import Post1 from "@/components/desktop/windows/Post";
import Post2 from "@/components/desktop/windows/Post";
import { mapState } from "vuex";
export default {
  components: {
    Post,
    Post1,
    Post2,
  },
  data() {
    return {
      cursor: "inherit",
      selectedWindow: null,
      mode: null,
      moveStartPos: [],
    };
  },
  computed: {
    ...mapState("window", [
      "windows",
      "boundary",
      "maxZIndex",
      "categoryWidth",
      "listWidth",
    ]),
  },
  watch: {
    cursor(c) {
      document.body.style.cursor = c;
    },
  },
  methods: {
    getRect(window) {
      return {
        l: window.x,
        t: window.y,
        r: window.x + window.w,
        b: window.y + window.h,
      };
    },
    mouseDownHandler(e) {
      const { name, mode } = this.selectWindow(e);
      this.mode = mode;
      this.selectedWindow = name;

      if (name) {
        this.focus(name);
        if (mode == "move") {
          this.moveStartPos = [e.clientX, e.clientY];
        }
      }
    },
    mouseMoveHandler(e) {
      if (this.mode == null) {
        const { mode } = this.selectWindow(e);
        this.changeCursor(mode);
      } else if (this.mode.startsWith("resize")) {
        this.resize([e.clientX, e.clientY], this.mode, this.selectedWindow);
      } else if (this.mode == "move") {
        this.move([e.clientX, e.clientY]);
      }
    },
    mouseUpHandler(e) {
      if (this.mode === "move") {
        this.move([e.clientX, e.clientY]);
        this.moveStartPos = [];
      }
      this.selectedWindow = null;
      this.mode = null;
      this.changeCursor(this.mode);
    },
    selectWindow(e) {
      let maxZIndex = -1;
      let name = null;
      let mode = null;
      // 모든 윈도우 중 zIndex에서 제일 상단의 window를 찾고 해당 window구한다.
      for (const w in this.windows) {
        const m = this.getMouseMode(e, this.windows[w]);
        if (m && maxZIndex <= this.windows[w].zIndex) {
          maxZIndex = this.windows[w].zIndex;

          name = w;
          mode = m;
        }
      }
      return { name, mode };
    },
    getMouseMode(e, window) {
      const [x, y] = [e.clientX, e.clientY];
      const { l, r, t, b } = this.getRect(window);
      const windowHeaderHeight = this.$getScssLength("windowHeaderHeight");

      const edge = 8;

      const isLeft = Math.abs(x - l) < edge;
      const isRight = Math.abs(x - r) < edge;
      const isTop = Math.abs(y - t) < edge;
      const isBottom = Math.abs(y - b) < edge;

      let result = null;
      // Window 안에 있는지
      if (l - edge < x && x < r + edge && t - edge < y && y < b + edge) {
        result = "in";

        if (isLeft && isTop) {
          result = "resize-tl";
        } else if (isRight && isTop) {
          result = "resize-tr";
        } else if (isLeft && isBottom) {
          result = "resize-bl";
        } else if (isRight && isBottom) {
          result = "resize-br";
        } else if (isTop) {
          result = "resize-t";
        } else if (isLeft) {
          result = "resize-l";
        } else if (isRight) {
          result = "resize-r";
        } else if (isBottom) {
          result = "resize-b";
        } else if (y < windowHeaderHeight + t) {
          // 특수 케이스로 Post에서 헤더에서는 Resize가 되는 공간이 있음.
          if (
            Math.abs(x - this.categoryWidth - l) < 5 ||
            Math.abs(x - this.categoryWidth - this.listWidth - l) < 5
          ) {
            result = "post-resize";
          } else {
            result = "move";
          }
        }
      }

      return result;
    },
    changeCursor(mousePos) {
      let cursor = "inherit";
      if (mousePos == "resize-tl" || mousePos == "resize-br") {
        cursor = "nwse-resize";
      } else if (mousePos == "resize-tr" || mousePos == "resize-bl") {
        cursor = "nesw-resize";
      } else if (mousePos == "resize-t" || mousePos == "resize-b") {
        cursor = "ns-resize";
      } else if (mousePos == "resize-l" || mousePos == "resize-r") {
        cursor = "ew-resize";
      }
      this.cursor = cursor;
    },
    resize([nx, ny], mode, name) {
      if (ny < this.boundary.top) {
        ny = this.boundary.top;
      }
      const { l, r, t, b } = this.getRect(this.windows[name]);
      let x = this.windows[name].x;
      let y = this.windows[name].y;
      let w = this.windows[name].w;
      let h = this.windows[name].h;

      if (mode === "resize-tl") {
        x = nx;
        y = ny;
        w = r - nx;
        h = b - ny;
      } else if (mode === "resize-tr") {
        y = ny;
        w = nx - l;
        h = b - ny;
      } else if (mode === "resize-bl") {
        x = nx;
        w = r - nx;
        h = ny - t;
      } else if (mode === "resize-br") {
        w = nx - l;
        h = ny - t;
      } else if (mode === "resize-t") {
        y = ny;
        h = b - ny;
      } else if (mode === "resize-b") {
        h = ny - t;
      } else if (mode === "resize-l") {
        x = nx;
        w = r - nx;
      } else if (mode === "resize-r") {
        w = nx - l;
      }

      this.$store.commit("window/setRect", { name, x, y, w, h });
    },
    move([nx, ny]) {
      const window = this.windows[this.selectedWindow];

      let newX = window.x + (nx - this.moveStartPos[0]);
      let newY = window.y + (ny - this.moveStartPos[1]);

      if (newY < this.boundary.top) {
        newY = this.boundary.top;
      }

      this.$store.dispatch("window/move", {
        name: this.selectedWindow,
        x: newX,
        y: newY,
      });

      this.moveStartPos = [nx, ny];
    },
    focus(name) {
      if (this.windows[name].zIndex < this.maxZIndex - 1) {
        this.$store.dispatch("window/focus", name);
      }
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.mouseDownHandler);
    document.addEventListener("mousemove", this.mouseMoveHandler);
    document.addEventListener("mouseup", this.mouseUpHandler);
  },
  beforeDestroy() {
    document.removeEventListener("mousedown", this.mouseDownHandler);
    document.removeEventListener("mousemove", this.mouseMoveHandler);
    document.removeEventListener("mouseup", this.mouseUpHandler);
  },
};
</script>
