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

export const fetchSignUp = async (loginId: string, password: string, nickname: string) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/signup', {
            loginId: loginId,
            password: password,
            nickname: nickname
        });
        return response.data;
    }catch (e: any) {
        // 서버 에러 메시지를 추출해서 다시 던짐
        const message = e.response?.data?.message || '알 수 없는 오류입니다.';
        throw new Error(message);
    }
}

export const fetchMypage = async () => {
    try {
        const userId = localStorage.getItem('id');
        const response = await axiosInstance.get('/api/v1/users/me', 
          {  
            headers: {
            userId: userId,
        }});
        return response.data;
    }catch (e: any) {
        // 서버 에러 메시지를 추출해서 다시 던짐
        const message = e.response?.data?.message || '알 수 없는 오류입니다.';
        throw new Error(message);
    }
}

export const patchNickname = async (newNickname: string) => {
    const userId = localStorage.getItem('id');
    try {
        const response = await axiosInstance.patch(
            '/api/v1/users',
            { nickname: newNickname },
            {
                headers: {
                    userId: userId,
                },
            }
        );
        return response.data;
    } catch (e: any) {
        const message = e.response?.data?.message || '알 수 없는 오류입니다.';
        throw new Error(message);
    }
};