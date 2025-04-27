import api from "../api/axiosInstance";

export const signUpApi = async (email, phone, fullName) => {
    const userCredential = await api.post("/api/auth/register", {
        email,
        phone,
        fullName,
    });
    return userCredential;
}