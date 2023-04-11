import { Image } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import { read } from '../../api/products'
import { CategoryType } from '../../types/category'
import { IProduct } from '../../types/product'
type ProductEditProps = {
    onUpdate: (product: IProduct) => void
    categories: CategoryType[]
}
type FormInput = {
    name : string,
    price: number,
    image: string,
    category: string
}
const ProductEdit = (props: ProductEditProps) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormInput>();
    const navigate = useNavigate();
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/duyvqph18088/image/upload";
    const CLOUDINARY_PRESET = "y12jh0jj";
    const {id} = useParams();
    const [image, setImage] = useState<String>('');
    useEffect(() => {
        const getProduct = async() =>{
            const {data} = await read(id as string);
            setImage(data.image);
            reset(data)
        }
      getProduct()
    },[])
    const imgPost = document.querySelector("#image");
    imgPost?.addEventListener('change', (e) => {
      setImage(URL.createObjectURL(e.target?.files[0]))
    })
    
    const onSubmit: SubmitHandler<FormInput> = async (data) => {
      const file = data.image[0];
      if (data.image == image) {
        props.onUpdate(data)
      }
      if(data.image != image){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_PRESET);
  
        // call api cloudinary
        const res = await axios.post(CLOUDINARY_API, formData, {
            headers: {
                "Content-Type": "application/form-data",
            },
        });
        props.onUpdate({...data, image: res.data.url})
      }
      navigate('/admin/products')
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <div className="mb-3">
            <label className="form-label">Tên sản phẩm</label>
            <input type="text" {...register('name')} className="form-control"/>
            {errors.name && <span style={{color: 'red'}}>This field is required</span>}
        </div>
        <div className="mb-3">
            <label className="form-label">Giá sản phẩm</label>
            <input type="number" {...register('price')} className="form-control"/>
            {errors.price && <span style={{color: 'red'}}>This field is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Ảnh sản phẩm</label> <br />
          <input type="file" {...register('image')} id="image" className="form-control"/>
          {errors.image && <span style={{color: 'red'}}>This field is required</span>}
          <br />
          <Image src={image as string} width={200}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select className="form-select" {...register('category', {required: true})}>
              {/* <option selected disabled>Chọn danh mục</option> */}
            {props.categories.map((item,index) => {
              return <option key={index+1} value={item._id}>{item.name}</option>
            })}
          </select>
          {errors.category && <span style={{color: 'red'}}>This field is required</span>}
        </div>
        <button className="btn btn-primary">Update Product</button>
        </div>
    </form>
  )
}

export default ProductEdit