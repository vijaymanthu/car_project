import React,{useState} from 'react'
import axiosInstance from '../../axios'
import './login.css'


//Login Component
export default function Login() {
    // Hook for error Message
    const [errormsg, seterrormsg] = useState('')


    //Initializing form Data
    const [formdata, setformdata] = useState({
        email : '',
        password: '',
    })

    //onchangehandler for all input fields
    const onchangeHandler = (e)=>{
        setformdata({
           ...formdata,
            [e.target.name]:e.target.value.trim(),
        })
    }

    //OnSubmit Event Handler
    const onsubmit = (e)=>{
        e.preventDefault()
        axiosInstance.post('token/',formdata).then((res)=>{
            if(res.status === 200){
            localStorage.setItem('access_token',res.data.access);
            localStorage.setItem('refresh_token',res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 'JWT' + localStorage.getItem('access_token');
            window.location.href="/admin"
            }
        })
        .catch((res)=>{
            seterrormsg('Please Check Email or Password')
        })
    }

    return (
        // user Login Form
        <div>
        <div className="card m-5 w-50 h-100" >
            <form onSubmit={onsubmit} method="post">
            <div className="card-title bg-primary">
               User Login              
            </div>
            <div className="card-body">
                <div className="form-outline m-2">
                    <input type="Email" required id="email" name="email" onChange={onchangeHandler} className="form-control" />
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                </div>
                
                <div className="form-outline m-2">
                    <input type="text" required id="password" name="password" onChange={onchangeHandler} className="form-control" />
                        <label for="password" className="form-label">
                            Password
                        </label>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
                 <p className="h6 text-danger">{errormsg}</p>
            </div>
           </form>
        </div>
        </div>
        
    )
}
