import { isUserAvailable, createNewUser, updateUserInfo } from "../util/dao.js";

async function registerController(req, res, next) {
  log("req received: ");
  log(req.body);
  const a = await isUserAvailable(req.body.username);
  if (!a) {
    log("creating new user");
    const user = await createNewUser(req.body);
    res.cookie("userId", user._id.toString());
    res.json({ status: 1 });
  } else {
    log("not creating new user");
    res.json({ status: -1 });
  }
}

function authenticationController(req, res) {
  res.header("Access-Control-Allow-Credentials", "true");
  log(req.user);

  if (req.isAuthenticated()) {
    res.json({ status: 1 });
  } else {
    res.json({ status: -1 });
  }
}

async function registerInfoController(req, res) {
  const userId = req.cookies.userId;
  const status = await updateUserInfo(req.body, userId);
  res.json(status);
}

function log(msg) {
  console.log(msg);
}

export { registerController, authenticationController, registerInfoController };
