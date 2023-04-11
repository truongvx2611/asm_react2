import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm, SubmitHandler} from 'react-hook-form'
import { login, createAccount } from '../api/user'

type RegisterProps = {
}

type TypeInputs = {
    name: string,
    email: string,
    password: string,
    confirmPassword :string
}

const Register = (props: RegisterProps) => {
    const {register, handleSubmit, formState:{errors}} = useForm<TypeInputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<TypeInputs> = data => {
        
        if(data.password != data.confirmPassword){

        }
        createAccount(data)
        navigate("/signin")
        

    }
  return (
      <form className='container' onSubmit = {handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label className="form-label">Nhập tên</label>
            <input type="text" className="form-control" {...register('name', {required: true})}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register('email', {required: true})}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input type="password" className="form-control" {...register('password', {required: true})}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Nhập lại mật khẩu</label>
            <input type="password" className="form-control" {...register('confirmPassword', {required: true})}/>
        </div>
        <button type="submit" className="btn btn-primary">Đăng kí</button>
      </form>
  )
}

export default Register