import { respond } from "../util/util.js";
import { getUserById } from "../util/dao.js";

const userInfoController = (req, res) => {
  log("preparing to fetch user info");
  if (req.cookies.session == "active") {
    log("user authenticated. Returning data");
    const user = getUserById(req.cookies.sessionID);
    console.log(user.fullName);
    res.json(user);
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
