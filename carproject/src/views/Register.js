import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';

export default function Register(){
    const history = useHistory();
    const initalFormData = Object.freeze({
        email:'',
        user_name:'',
        password:'',
    })

    const [form_data, setformdata] = useState(initalFormData)
    
    const onsubmit = (e)=>{
        e.preventDefault()
        let user_name = document.getElementById('user_name');
        let email = document.getElementById('email');
        let password = document.getElementById('password')
        // console.log(username+"\n"+email)
        setformdata({
            email : email,
            user_name : user_name,
            password:password
        })
       console.log(form_data)

       axiosInstance.post('user/register/',form_data).then((res)=>{
           history.push('/login')
           console.log(res);
           console.log(res.data)    
       })


    }
    const onchangeHandler =(e)=>{
        setformdata({
            ...form_data,
            [e.target.name]:e.target.value.trim(),
        })
    }
    
    return(
        <div>
        <div className="" id="display_data">
        </div>
        <div className="register" id="register_form">
            <div className="card">
                <div className="card-title">
                    Register
                </div>
                <div className="card-body">
                    <form onSubmit={onsubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="form-outline">
                                <input type="Email" onChange={onchangeHandler} className="form-control" name="email" id="email"/>
                                <label for="email" className="form-label">Email</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-outline">
                                <input type="text" onChange={onchangeHandler} className="form-control" name="user_name" id="user_name"/>
                                <label for="fname" className="form-label">UserName</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-outline">
                                <input type="password" onChange={onchangeHandler} className="form-control" name="password" id="password"/>
                                <label for="password" className="form-label">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-outline">
                                <input type="text" className="form-control" id="cpass"/>
                                <label for="cpass" className="form-label">Confirm Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-success">Register</button>
                        </div>
                        <div className="col">
                            <a href="login" className="btn btn-primary">Login</a>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
        </div>
    )
}