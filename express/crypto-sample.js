var crypto = require("crypto");
var ed25519 = require("ed25519");

var passwd = "It is the passwd for key!";
var hash = crypto
  .createHash("sha256")
  .update(passwd)
  .digest();
var keypair = ed25519.MakeKeypair(hash);

var message = "Here gooogo yes go !";
var msgCiphered = cipher("aes192", keypair.publicKey, message);
var signature = ed25519.Sign(
  new Buffer(msgCiphered, "utf8"),
  keypair.privateKey
);

if (
  ed25519.Verify(new Buffer(msgCiphered, "utf8"), signature, keypair.publicKey)
) {
  console.log("cipher msg:", msgCiphered);
  var msg = decipher("aes192", keypair.publicKey, msgCiphered);
  console.log("decipher msg:", msg);
} else {
  console.log("signature invalid");
}

function cipher(algorithm, key, buf) {
  var encrypted = "";
  var cip = crypto.createCipher(algorithm, key);
  encrypted += cip.update(buf, "utf8", "hex");
  encrypted += cip.final("hex");
  return encrypted;
}

function decipher(algorithm, key, encrypted) {
  var decrypted = "";
  var decipher = crypto.createDecipher(algorithm, key);
  decrypted += decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
