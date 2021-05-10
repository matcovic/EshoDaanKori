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
      console.log("Called", reader);
      baseURL = reader.result;
      console.log(baseURL);
      resolve(baseURL);
    };
    console.log(fileInfo);
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
    console.log("list length =" + list.length);
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

const notifyError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export {
  getBase64,
  convertMultipleImagesToB64,
  calculateFundraisingProgress,
  getCategoryList,
  notifyError,
};
