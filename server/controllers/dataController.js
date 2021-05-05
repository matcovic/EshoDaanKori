import { respond } from "../util/util.js";

const userInfoController = (req, res) => {
  log("preparing to fetch user info");
  if (req.isAuthenticated()) {
    log("user authenticated. Returning data");
    res.json(req.user);
  } else {
    res.json(
      respond(-1, "Couldn't fetch user data. Request not authenticated")
    );
  }
};

function log(msg) {
  console.log(msg);
}
export { userInfoController };
