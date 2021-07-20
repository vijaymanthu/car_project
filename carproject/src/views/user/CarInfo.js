import React,{useState} from 'react'
import axiosInstance from '../../axios'
import DisplayCarInfo from './Display/DisplayCarInfo'
import { useEffect} from 'react'
import { Link } from 'react-router-dom'

// Component which displays all Cars Assigned to logged User
export default function CarInfo() {
    // responseData
    const [responseData, setresponseData] = useState({})

    // load data from backend after Login
    useEffect( () => {
     axiosInstance.get('/cars/user/carinfo').then((res)=>{
            setresponseData(res.data)
        });
  });
  
    return (
        <div>
           <div className="container">
                    <Link className="float-end mt-1 mb-2 btn btn-outline-danger col-2" to="/logout">Logout</Link>
                 <div className="row mt-3">
                </div>
            </div>

            {/* Dispaly All All Assigned car to particular user */}
            
            <DisplayCarInfo responseData={responseData}/>

        </div>
    )
}
