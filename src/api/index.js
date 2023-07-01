import axios from "axios";
import { showErrorMessage } from '../utils/toast';
export const url = 'http://3.129.62.246'
export const axiosInstance = axios.create({
    baseURL: url // http://3.129.62.246/ url is required
});

export const api = {
    get: function (
        ...params
    ) {
        return axiosInstance.get(...params);
    },
    getBlobType: function (
        ...params
    ) {
        return axiosInstance.get(...params, {
            responseType: 'blob'
        });
    },
    post: function (
        ...params
    ) {
        return axiosInstance.post(...params);
    },
    put: function (
        ...params
    ) {
        return axiosInstance.put(...params);
    },
    patch: function (
        ...params
    ) {
        return axiosInstance.patch(...params);
    },
    delete: function (
        ...params
    ) {
        return axiosInstance.delete(...params);
    },
};

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status == 200 || response.status == 201) {
            return response;
        } else if (
            (response.status >= 400 && response.status <= 410) ||
            (response.status <= 500 && response.status <= 510) ||
            (response.status == 'ERROR')
        ) {
            const errorMessage = response?.data?.message || 'Something went wrong'; // change to code 200 - 299 success and 400- 410 | 500 - 510 error
            throw new Error(errorMessage);
        } else {
            return response;
        }
    },
    (error) => {
        console.log("error", error)
        // eslint-disable-next-line no-console
        if (error?.message === "Network Error") {
            throw new Error("Please check your internet");
        }
        const errorMessage =
            error?.response?.data?.message || "Something went wrong";
        showErrorMessage(errorMessage);
        throw new Error(errorMessage);
    },
);
