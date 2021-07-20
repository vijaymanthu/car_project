import React,{useState} from 'react'
import axiosInstance from '../../axios'
import DisplayAssCar from './display/DisplayAssCar'


// Assining Cars to Users
export default function AssignCars() {
    // Initialzing
    const [formdata, setformdata] = useState({})
    const [users, setuser] = useState({})//for usersData
    const [cars, setcars] = useState({})//for cars data
    const [responseData, setresponseData] = useState({}) //for responseData

    // fetching both car and users Data and assigning into cars and users variables respectivly
      const getcars=()=>{
        axiosInstance.get('/cars/car').then((res)=>{
            setcars(res.data)
        })
        getusers()
        return cars
    }
    const getusers=()=>{
        axiosInstance.get('cars/adduser/').then((res)=>{
        setuser(res.data)
            }) 
        return users
    } 
   
    // After Assinged get assigned details/data
    const getassignedDetails = ()=>{
        axiosInstance.get('/cars/assign_car').then((res)=>{
            setresponseData(res.data)
        })
        return responseData
    }

    //for Inputs
    const onchangeHandler = (e)=>{
        setformdata({
           ...formdata,
            [e.target.name]:e.target.value.trim(),
        })
    }
   
    //onsumit event handler
    const onsubmit=(e)=>{
        e.preventDefault()
       
        axiosInstance.post('/cars/assign_car/',formdata).then((res)=>{
            if(res.status === 201)
                alert("Car Assigned Successfully")
        })
    }
    return (
        // Adding and display assignment of cars
        <div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-success" onClick={getassignedDetails}>Get Details</button>

                    {/* Display Component for displaying carAssigned details */}
                    <DisplayAssCar getassignedDetails={getassignedDetails} responseData={responseData}/>
                
                </div>
                {/* Form for Assigning Car to Users */}
                <div className="col">
                    <form onFocus={getcars} method="post">
                    <div className="card w-75 hadow-lg bg-white rounded border h-100">
                        <p className="card-title bg-primary">Assign Car To User</p>
                        <div className="card-body">
                            <div className="row">
                                <div className="md-form">
                                    <label htmlFor="car_id" className="form-label">Car Id</label>
                                    <select name="car" id="car_id" onChange={onchangeHandler}>
                                        <option value="">SELECT Car ID</option>
                                        {
                                            // wraping cars details in options of select element
                                            Object.keys(cars).map((car,i)=>{
                                                return(
                                                <option value={cars[car].id} key={i+1}>{cars[car].car_brand}-{cars[car].car_model}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="md-form">
                                    <label htmlFor="user" className="form-label">Car Id</label>
                                    <select name="user_id" id="user" onChange={onchangeHandler}>
                                        <option value="">SELECT User</option>
                                        {
                                            // wraping User details in options of select element
                                            Object.keys(users).map((user,i)=>{
                                                return(
                                                <option key={i+1} value={users[user].id}>{users[user].user_name}</option>
                                            )
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <button onClick={onsubmit}className="btn btn-info">Assign Car</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
