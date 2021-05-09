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
  if (images.length === 0) {
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
    return list;
  } catch (error) {
    return undefined;
  }
}

function calculateFundraisingProgress(current, goal) {
  try {
    return `${(current / goal) * 100}%`;
  } catch (error) {
    return "0%";
  }
}

function getCard(id, fundCardItems) {
  for (var i = 0; i < fundCardItems.length; i++) {
    if (fundCardItems[i]._id === id) {
      console.log("found");
      return fundCardItems[i];
    }
  }
}

export {
  getBase64,
  convertMultipleImagesToB64,
  calculateFundraisingProgress,
  getCard,
};
