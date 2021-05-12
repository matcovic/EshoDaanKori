import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getBase64(file) {
  if (!file) return undefined;
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
}

async function convertMultipleImagesToB64(images) {
  const list = [];
  if (images === undefined) {
    return undefined;
  }
  let res_promises = images.map(
    (file) =>
      new Promise(async (resolve, reject) => {
        getBase64(file)
          .then((result) => {
            resolve(result);
            list.push(result);
          })
          .catch((err) => reject(err));
      })
  );
  try {
    // Promise.all will fire when all promises are resolved
    await Promise.all(res_promises);
    if (list.length === 0) {
      return undefined;
    }
    return list;
  } catch (error) {
    return undefined;
  }
}

function calculateFundraisingProgress(current, goal) {
  try {
    return `${(parseInt(current) / parseInt(goal)) * 100}%`;
  } catch (error) {
    return "0%";
  }
}

function getCategoryList() {
  const list = [
    "All",
    "Accidents & Emergencies",
    "Medical",
    "Creative",
    "Education",
    "Volunteer & Service",
    "Animals & Pets",
    "Others",
  ];
  return list;
}

/**
 *
 * @param {*} message the message to show on the toas
 * @param {*} type possible types: "error", "success"
 * @param {*} redirectUrl the url to redirect to after the toast is closed
 * @param {*} position posible positions: "top-center", "top-left", "top-right", "bottom-right", "bottom-left", "bottom-center", default is "top-center"
 */
function notify(message, type, redirectUrl, position) {
  const options = {
    onClose: (props) =>
      redirectUrl ? window.location.replace(redirectUrl) : "",
    position: position ? position : "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  } else if (type === "info") {
    toast.info(message, options);
  }
}

export {
  getBase64,
  convertMultipleImagesToB64,
  calculateFundraisingProgress,
  getCategoryList,
  notify,
};
