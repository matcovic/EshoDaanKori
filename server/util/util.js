import crypto from "crypto";
import { transporter } from "../config/config.js";

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

async function sendVerificationEmail(to, subject, text) {
  var mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    log("Email sent: " + info.response);
    return {
      status: 1,
      message: "A verification email has been sent. Please check your email.",
    };
  } catch (error) {
    log(error.message);
    return { status: -1, message: error.message };
  }
}

function generateHashPassword(password) {
  const saltHash = genPassword(password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  return { salt, hash };
}

function clearCookies(res) {
  res.clearCookie("cookiename");
  res.clearCookie("userEmail");
  res.clearCookie("connect.sid");
  res.clearCookie("userId");
  res.clearCookie("registrationStatus");
  log("cookies cleared");
}

function respond(status, message) {
  return { status, message };
}

function log(msg) {
  console.log(msg);
}

export {
  genPassword,
  validPassword,
  sendVerificationEmail,
  respond,
  clearCookies,
  generateHashPassword,
};
