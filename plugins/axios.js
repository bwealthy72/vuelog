export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
  });
  $axios.onResponse((response) => {
    console.log("request done");
  });
}
