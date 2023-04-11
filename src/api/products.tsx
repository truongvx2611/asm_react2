import Product from "../pages/Product";
import { IProduct } from "../types/product";
import { isAuthenticate } from "../utils/localStorage";
import instance from "./instance";
// const { user, token } = JSON.parse(localStorage.getItem('user') as string); // lấy từ localstorage ra
const userInfo = isAuthenticate();


export const list = () => {
    const url = `/api/products`;
    return instance.get(url);
}
export const read = (id: string) => {
    const url = `/api/products/${id}`;
    return instance.get(url);
}
export const remove = (_id: string) => {
    const url = `api/products/${_id}/${userInfo.user._id}`;
    return instance.delete(url, {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    });
}
export const add = (product: IProduct) => {
    const url = `/api/products/${userInfo.user._id}`;
    return instance.post(url,product, {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    });
}
export const update = (product: IProduct) => {
    const url = `/api/products/${product._id}/${userInfo.user._id}`;
    return instance.put(url,product, {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    });
}

export const search = (input: string) =>{
    const url = `/api/products/search?key=${input}`
    return instance.get(url);
}