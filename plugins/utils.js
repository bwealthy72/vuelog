import variable from "~/assets/scss/base/variable.scss";

const getScssLength = function (scssVar) {
  let v = variable[scssVar];
  if (v.includes("rem")) {
    v = parseInt(v.slice(0, -3) + "0");
  } else if (v.includes("px")) {
    v = parseInt(v.slice(0, -2));
  }
  return v;
};

export default ({ app }, inject) => {
  inject("getScssLength", getScssLength);
};
