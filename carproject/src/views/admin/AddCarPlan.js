import React,{useState,useEffect} from 'react'
import axiosInstance from '../../axios'
import DisplayCarPlan from './display/DisplayCarPlan'


export default function AddCarPlan() {
    //Initializing form data with empty object
    const [formdata, setformdata] = useState({})

    //Initializing responseData with empty object
    const [responseData, setresponseData] = useState({})

    // function which fetches carPlans
    const getCarplans =()=>{
        axiosInstance.get('/cars/carplan').then((res)=>{
            setresponseData(res.data)
            }) 
        return responseData
    }
    
    //onchangeHandler for inputs
    const onchangeHandler=(e)=>{
       setformdata({
           ...formdata,
            [e.target.name]:e.target.value.trim(),
        })
    }
    //onSubmit Event Handler
    const onsubmit=(e)=>{
        e.preventDefault()
        const data = {
            plan_name: formdata.plan_name,
            year_of_warranty: formdata.warranty,
            finance_plan: formdata.finance_plan
        }
        axiosInstance.post('/cars/carplan/',data).then((res)=>{
            alert('CarPlan Inserted')
            getCarplans()
        })
    }


    return (
        // Display and Add Carplans 
    <div className="row">
        <div className="w-50 col" id="display_data">
            <button onClick={getCarplans} className="btn btn-success">GetCarPlans</button>

            {/* Component which Displays all carPlans */}
            <DisplayCarPlan getCarplans={getCarplans}responseData={responseData}/>

        </div>
        {/* Form for adding CarPlans */}
        <div className="col h-100 w-75">
        <div className="card shadow-lg bg-white rounded" >
            <p className="card-title bg-primary h2">Add Car Plan</p>
            <div className="card-body">
              <form onSubmit={onsubmit} method="post">
            <div className="row">
                <div className="form-outline">
                    <input type="text"  required  name="plan_name" onChange={onchangeHandler} id="plan_name" className="form-control form-control-lg"/>
                    <label htmlFor="plan_name" className="form-label">Plan Name</label>
                </div>
            </div>
            <div className="row">
                <div className="form-outline">
                    <input type="text" required pattern="[0-9]" name="warranty" id="warranty" onChange={onchangeHandler} className="form-control form-control-lg"/>
                    <label htmlFor="warranty" className="form-label">Year of Warranty</label>
                </div>
            </div>
            <div className="row">
                <div className="form-outline">
                    <input type="text" required  name="finance_plan" id="finance_plan" onChange={onchangeHandler} className="form-control-lg form-control"/>
                    <label htmlFor="finance_plan" className="form-label">Finance Plan</label>
                </div>
            </div>
           
            <div className="row mt-5">
                <button type="submit" className="btn col-3 btn-secondary">ADD</button>
            </div>
            </form>
        </div>        
    </div>
    </div>
    </div>
    )
}
