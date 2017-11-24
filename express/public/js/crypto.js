(function() {
  "use strict";

  var crypto_vue = new Vue({
    el: "#crypto_vue",
    data: {
      name: "crypto.js",
      message: "",
      pk: "",
      sk: "",
      reqResult: "",
      signature: "",
      showreqresult: true,
      waiting: false
    },
    methods: {
      sign: function() {
        try {
          console.log("message:", this.message);
          let keyPair = nacl.sign.keyPair();
          console.log("pk:", keyPair);
          this.pk = nacl.util.encodeBase64(keyPair.publicKey);
          this.sk = nacl.util.encodeBase64(keyPair.secretKey);
          this.signature = nacl.util.encodeBase64(
            nacl.sign.detached(
              nacl.util.decodeUTF8(this.message),
              keyPair.secretKey
            )
          );
        } catch (err) {
          console.log("err:", err);
          this.reqResult = err + "";
          return;
        }
      },
      callapi: (n, url, msg) => {
        n.exchange(n);
        n.$nextTick(() => {
          n.$http
            .post(url, msg)
            .then(
              resp => {
                console.log("resp data:", resp.data);
                n.reqResult = resp.data;
              },
              err => {
                n.reqResult = err.data;
              }
            )
            .finally(() => {
              n.exchange(n);
            });
        });
        return;
      },
      exchange: n => {
        n.showreqresult = !n.showreqresult;
        n.waiting = !n.waiting;
        return;
      }
    }
  });

  if (typeof module !== "undefined" && module.exports) {
  } else {
    this.crypto_vue = crypto_vue;
  }
}.call(this));
