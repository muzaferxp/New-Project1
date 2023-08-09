const fs = require("fs");

const config = (function () {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.SSL_ENABLED === "1"
  ) {
    var key = fs.readFileSync(process.env.SSL_KEY_PATH);
    var cert = fs.readFileSync(process.env.SSL_CERT_PATH);
    return {
      key: key,
      cert: cert,
    };
  } else return;
})();

export default config;
