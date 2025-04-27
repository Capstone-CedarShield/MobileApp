import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyBzftxgpXTUkm0zVdg_ehNVkUYp6_eXzvU",
  authDomain: "mobileapp-authentication.firebaseapp.com",
  projectId: "mobileapp-authentication",
  storageBucket: "mobileapp-authentication.firebasestorage.app",
  messagingSenderId: "764623030223",
  appId: "1:764623030223:web:8955121da8215dbbe4b4ba",
  measurementId: "G-74Z3L4MDPV"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
export default app;