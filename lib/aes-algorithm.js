import crypto from "crypto";

const secretKey = process.env.AES_SECRET;

// Validate and convert key
const secret =
  secretKey.length === 32
    ? Buffer.from(secretKey) // plain text
    : Buffer.from(secretKey, "hex"); // hex format

const algorithm = "aes-256-cbc";

// Base64 URL encode (safe for URLs)
function base64UrlEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Base64 URL decode
function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) base64 += "=";
  return Buffer.from(base64, "base64");
}

// Encrypt
async function encrypt(userId) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secret, iv);
  let encrypted = cipher.update(userId);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const payload = iv.toString("hex") + ":" + encrypted.toString("hex");
  return base64UrlEncode(Buffer.from(payload));
}

// Decrypt
async function decrypt(encryptedData) {
  try {
    const payload = base64UrlDecode(encryptedData).toString();
    const [ivStr, encryptedStr] = payload.split(":");
    const iv = Buffer.from(ivStr, "hex");
    const encryptedText = Buffer.from(encryptedStr, "hex");
    const decipher = crypto.createDecipheriv(algorithm, secret, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
}

// Example usage:
// const token = encryptUsername("muzaheed");
// const username = decryptUsername(token);

export { encrypt, decrypt };
