import React from 'react';
import {useNavigate} from 'react-router-dom'

type Props = {}

const Account = (props: Props) => {
    const navigate = useNavigate()
    if (!localStorage.getItem('user')) {
        navigate('/signin')
    }
    const { user } = JSON.parse(localStorage.getItem('user') as string); // lấy từ localstorage ra
    return (
        <div className="container sanphammoi">
            <div className="sanphammoi_tiltle">
                <h2>
                  <a href="#">Tài khoản</a>
                </h2>
            </div>
            <div className='d-flex align'><h6>Tên: </h6> {user.name} </div>
            <div className='d-flex align'><h6>Email: </h6> {user.email} </div>
            <button onClick={()=>{
                localStorage.removeItem("user");
                navigate('/')
            }}>Đăng xuất</button>
        </div>
    )
}

export default Account