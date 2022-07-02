export default function ({ $axios, error: nuxtError }) {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
  });

  $axios.onError((error, app) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 429) {
      // TODO: too many handling
      alert("조금 천천히 조작해주세요 ^^");
      app.router.refresh();
    }
  });
  $axios.onResponse((response) => {
    console.log("request done");
  });
}
