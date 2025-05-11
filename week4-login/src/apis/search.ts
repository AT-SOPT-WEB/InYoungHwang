import { axiosInstance } from "./axiosInstance";

export const fetchUsers = async (keyword: string) => {
    try {
        const response = await axiosInstance.get(`/api/v1/users?keyword=${keyword}`);
        return response.data;
    }catch (e: any) {
        // 서버 에러 메시지를 추출해서 다시 던짐
        const message = e.response?.data?.message || '알 수 없는 오류입니다.';
        throw new Error(message);
    }
}