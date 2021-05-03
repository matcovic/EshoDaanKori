import mailIcon from "./icons/ico-email.svg";
import keyIcon from "./icons/ico-key.svg";

const EmailIcon = (
    <i className="icon">
      <img
        alt="emailIcon"
        className="input-icon"
        width={38}
        height={38}
        src={mailIcon}
      />
    </i>
  );

  const KeyIcon = (
    <i className="icon">
      <img
        alt="keyIcon"
        className="input-icon"
        width={38}
        height={38}
        src={keyIcon}
      />
    </i>
  );

export {EmailIcon, KeyIcon}