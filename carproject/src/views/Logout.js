import React,{useEffect} from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

export default function Logout() {

    const history = useHistory();

    //Sending logout request to backend by axioInstance
    useEffect(()=>{
    const response = axiosInstance.post('user/logout/',{
        refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    history.push('/home');
});

    
    return (
        <div>
            <button className="btn btn-outline-primary" >Logout</button>
        </div>
    )
}
