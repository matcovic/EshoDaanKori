import mailIcon from "./icons/ico-email.svg";
import keyIcon from "./icons/ico-key.svg";
import profileicon from "./icons/ico-profile.svg";
import phoneicon from "./icons/ico-phone.svg";
import calendaricon from "./icons/ico-calendar.svg";
import nidicon from "./icons/ico-nid.svg";
import takaIcon from "./icons/ico-taka.svg";

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

const TakaIcon = (
  <i className="icon">
    <img
      alt="takaIcon"
      className="input-icon"
      width={38}
      height={38}
      src={takaIcon}
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

const ProfileIcon = (
  <i className="icon">
    <img
      className="input-icon"
      width={37.39}
      height={38}
      src={profileicon}
      alt="profileIcon"
    />
  </i>
);

const PhoneIcon = (
  <i className="icon">
    <img
      className="input-icon"
      width={37.39}
      height={38}
      src={phoneicon}
      alt="phoneIcon"
    />
  </i>
);
const CalendarIcon = (
  <i className="icon">
    <img
      className="input-icon"
      width={37.39}
      height={38}
      src={calendaricon}
      alt="CalenderIcon"
    />
  </i>
);
const NidIcon = (
  <i className="icon">
    <img
      className="input-icon"
      width={37.39}
      height={38}
      src={nidicon}
      alt="NidIcon"
    />
  </i>
);
export {
  EmailIcon,
  KeyIcon,
  NidIcon,
  CalendarIcon,
  PhoneIcon,
  ProfileIcon,
  TakaIcon,
};
