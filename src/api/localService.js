export let userLocalStorage = {
  get: () => {
    let dataJson = localStorage.getItem("UserLogin");
    return JSON.parse(dataJson);
  },
  set: (user) => {
    let dataJson = JSON.stringify(user);
    localStorage.setItem("UserLogin", dataJson);
  },
  remove: () => {
    localStorage.removeItem("UserLogin");
  },
};
