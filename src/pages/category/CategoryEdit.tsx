import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import { readCate } from '../../api/category'
import { CategoryType } from '../../types/category'
type CategoryEditProps = {
    onUpdate: (category: CategoryType) => void
}
type FormInput = {
    name : string
}
const CategoryEdit = (props: CategoryEditProps) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormInput>();
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        const getCategories = async() =>{
            const { data } = await readCate(id as string);
            reset(data.category)
        }
        getCategories()
    },[])

    const onSubmit: SubmitHandler<FormInput> = data => {
        props.onUpdate(data)
        navigate('/admin/categories')
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <div className="mb-3">
            <label className="form-label">Tên danh mục</label>
            <input type="text" {...register('name', {required: true})} className="form-control"/>
            {errors.name && <span style={{color: 'red'}}>This field is required</span>}
        </div>
        <button className="btn btn-primary">Cập nhật</button>
        </div>
    </form>
  )
}

export default CategoryEdit