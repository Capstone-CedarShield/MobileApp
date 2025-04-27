import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";


import app from "../../firebase"; 


const auth = getAuth(app);



export const signUp = async (email, password,phone,fullName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user); 
  return userCredential;
 };

export const signIn = async (email, password) => {
  console.log("signing in");
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  if (!userCredential.user.emailVerified) {
    throw new Error("Email not verified. Please check your inbox.");
  }
  console.log("signed in");
  return userCredential;
};

export const logout = () => {

  return signOut(auth);
};



export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getFirebaseToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(); 
  }
  return null;
};

export const onAuthStateChangedListener = (callback) => {
  return auth.onAuthStateChanged(callback);
};
