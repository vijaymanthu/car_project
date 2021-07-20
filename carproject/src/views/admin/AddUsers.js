import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import AddedUsers from './display/AddedUsers';

// Addusers
export default function AddUsers(){
    // initailise
    const [responseData, setresponseData] = useState({})

    // getuser definition function
    const getusers=()=>{
        axiosInstance.get('cars/adduser/').then((res)=>{
        setresponseData(res.data)
            }) 
        return responseData
    }    
      
    // useHistory hook for navigation
    const history = useHistory();

    // initializing form data
    const initalFormData = Object.freeze({
        email:'',
        user_name:'',
        password:'',
    })
    const [form_data, setformdata] = useState(initalFormData)

    // onsumit event Handler
    const onsubmit = (e)=>{
        e.preventDefault()
        let user_name = document.getElementById('user_name');
        let email = document.getElementById('email');
        let password = document.getElementById('password')
        setformdata({
            email : email,
            user_name : user_name,
            password:password
        })
            // sending post reqeust for inserting Users Data
            axiosInstance.post('cars/adduser/',form_data).then((res)=>{
                alert("User Added Successfully")
                getusers()
            }).catch((err)=>{
           console.log(err)
       })
       //error block   
    }
    // onchangeHandler for  inputs
    const onchangeHandler =(e)=>{
        setformdata({
            ...form_data,
            [e.target.name]:e.target.value.trim(),
        })
    }
    
    return(
        <div className="row">
            <div className="w-50 col " id="display_data">
                <button onClick={getusers} className="btn btn-success">GetUsers</button>

                {/* Display Component for Added Users */}
                <AddedUsers getusers={getusers} responseData={responseData}/>

            </div>
            {/* Form for Adding users */}
            <div className="w-75 h-100 col">
                <div className="card float-right shadow-lg bg-white rounded">
                    <div className="card-title bg-info">
                        <p className="h3">Add User</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onsubmit}>
                        <div className="row mt-4">
                            <div className="col">
                                <div className="form-outline">
                                    <input type="Email" onChange={onchangeHandler} className="form-control" name="email" id="email"/>
                                    <label for="email" className="form-label">Email</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <div className="form-outline">
                                    <input type="text" onChange={onchangeHandler} className="form-control" name="user_name" id="user_name"/>
                                    <label for="fname" className="form-label">UserName</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <div className="form-outline">
                                    <input type="password" onChange={onchangeHandler} className="form-control" name="password" id="password"/>
                                    <label for="password" className="form-label">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <button type="submit" className="btn btn-success">Add User</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}