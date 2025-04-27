import axios from "axios";

/**
 * If you are using the Android emulator, replace 'localhost' with '10.0.2.2'.
 * If you are using a real device on your Wi-Fi, use your machine's IP address (e.g., '192.168.x.x').
 * If you are using the iOS simulator, 'localhost' should work.
 */
const axiosInstance = axios.create({
  baseURL: "http://192.168.1.9:3000/api", // or http://10.0.2.2:3000/api for Android emulator
  // You can set common headers here (e.g., Authorization) if needed:
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosInstance;
