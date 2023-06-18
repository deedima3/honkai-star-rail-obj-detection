export const download = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(request.response);
      } else {
        reject({
          status: this.status,
          statusText: request.statusText,
        });
      }
      resolve(request.response);
    };
    request.onerror = function () {
      reject({
        status: this.status,
        statusText: request.statusText,
      });
    };
    request.send();
  });
};