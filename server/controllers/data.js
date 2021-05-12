import { respond } from "../util/util.js";
import { getUserById } from "../util/dao.js";

const userInfoController = (req, res) => {
  log("preparing to fetch user info");
  if (req.cookies.session) {
    log("user authenticated. Returning data");
    res.json(getUserById(req.cookies.sessionID));
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
