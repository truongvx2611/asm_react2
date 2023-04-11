import { IProduct } from "../types/product";
import { UserType } from "../types/user";
import instance from "./instance";

export const createAccount = (user: UserType) => {
    const url = '/api/register';
    return instance.post(url,user);
}
export const login = (user: UserType) => {
    const url = '/api/login';
    return instance.post(url,user);
}
export const getAllUsers = (user: UserType) => {
    const url = '/api/users';
    return instance.post(url,user);
}
