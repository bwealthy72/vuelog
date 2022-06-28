export default {
  server: {
    host: "0", // default: localhost
  },
  target: "server",

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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/index.scss"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment"],
  moment: {
    locales: ["ko"],
  },

  plugins: ["~/plugins/utils.js"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxtjs/axios",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // env: {
  //   baseUrl: process.env.VERCEL_URL || "http://127.0.0.1:3000",
  // },
  axios: {
    proxy: true, // Can be also an object with default options
  },

  proxy: {
    "/api": process.env.VERCEL_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
