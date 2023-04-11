import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm, SubmitHandler} from 'react-hook-form'
import { login } from '../api/user'
import { authenticate } from '../utils/localStorage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
type LoginProps = {
}

type TypeInputs = {
    name: string,
    email: string,
    password: string,
    role?: number
}

const Login = (props: LoginProps) => {
    const notify = () => toast("wating!");
    const {register, handleSubmit, formState: {errors}} = useForm<TypeInputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<TypeInputs> = async (data) =>{
        const {data: user} = await login(data);
        // localStorage.setItem('user', JSON.stringify(user))
        authenticate(user, () => navigate('/'))        
    }
  return (
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <div className="mb-3" >
            <label className="form-label">Tài khoản</label>
            <input type="email" className="form-control" {...register('email', {required: true, minLength: 5})}/>
            {errors.email && <span style={{color: 'red'}}><ToastContainer /></span>}           
        </div>
        <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input type="password" className="form-control" {...register('password', {required: true})}/>
            {errors.password && <span style={{color: 'red'}}>This field is required</span>}           

        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button onClick={notify} type="submit" className="btn btn-primary">Đăng nhập</button>
        
      </form>
  )
}

export default Login