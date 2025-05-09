import { axiosInstance } from "./axiosInstance"

export const fetchLogin = async (loginId: string, password: string) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/signin', {
            loginId: loginId,
            password: password
        });
        return response.data;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
};
