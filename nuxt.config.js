import shrinkRay from "shrink-ray-current";

export default {
  server: {
    host: "0", // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "My VueLog",
    htmlAttrs: {
      lang: "ko",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },

      { hid: "og:title", property: "og:title", content: "My VueLog" },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "My VueLog",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:image",
        property: "og:image",
        content: "/logo.png",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/logo.png",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: process.env.VERCEL_URL,
      },
      {
        hid: "description",
        name: "description",
        content: "Welcome to my VueLog!!",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Welcome to my VueLog!!",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Welcome to my VueLog!!",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/vs2015.min.css",
      },
    ],
  },

  serverMiddleware: [{ path: "/api", handler: __dirname + "/api/index.js" }],

  router: {
    middleware: ["layout"],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/index.scss"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment", "@nuxtjs/device"],
  moment: {
    locales: ["ko"],
  },

  plugins: [
    "~/plugins/axios.js",
    "~/plugins/utils.js",
    { src: "~/plugins/vue-infinite-loading.js", mode: "client" },
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxtjs/axios",
    "@nuxt/image",
    "@nuxtjs/pwa",
  ],

  image: {
    domains: ["https://s3.us-west-2.amazonaws.com"],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // env: {
  //   baseUrl: process.env.VERCEL_URL || "http://127.0.0.1:3000",
  // },
  axios: {
    proxy: true,
    retry: {
      retries: 4, // 최대 재전송 횟수 4회
      shouldResetTimeout: true, // 재전송 간 타임아웃을 리셋하기
      retryDelay: (retry) => {
        return retry * 10000; // 재전송 횟수 * 0.1초만큼 재전송 시작 시간을 지연시키기
      },
      retryCondition: (error) => error.response.status === 429, // 서버 혼잡이 일어났을 경우에만 재전송하기
    },
    progress: false,
  },

  proxy: {
    "/api": process.env.VERCEL_URL,
  },

  render: {
    compressor: shrinkRay(),
  },
};
