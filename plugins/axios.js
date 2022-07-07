export default function ({ $axios, error: nuxtError }) {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
  });
  $axios.onResponse((response) => {
    console.log("request done");
  });
}
