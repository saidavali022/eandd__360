const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3001";

import { ToastContainer, toast } from "react-toastify";

const ToastContainer_box = (
  <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default axios;
export { ToastContainer, toast, ToastContainer_box };
