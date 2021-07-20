import React,{useState,useEffect} from 'react'
import axiosInstance from '../../axios'
import DisplayCars from './display/DisplayCars'


export default function AddCars() {
    // Initializing formdata,responseData,carPlans
    const [formdata, setformdata] = useState({})
    const [responseData, setresponseData] = useState({})
    const [carplans, setcarplans] = useState({})
    
    //Arrow function which defines requesting to and getting all carDetails from database
    const getcars=()=>{
        axiosInstance.get('/cars/car').then((res)=>{
            setresponseData(res.data)
           
        })
        return responseData
    }
   
    //Arrow function which defines requesting to and getting all carPlans from database
     const getCarplans =()=>{
        axiosInstance.get('/cars/carplan').then((res)=>{
            setcarplans(res.data)
            }) 
    }

    const onchangeHandler = (e)=>{
            setformdata({
            ...formdata,
                [e.target.name]:e.target.value.trim(),
            })
    }
    const onsubmit = (e)=>{
        e.preventDefault()
        const data = {
            car_model : formdata.car_model,
            car_brand : formdata.car_brand,
            production_year : formdata.year_of_production,
            car_body: formdata.car_body,
            engine_type: formdata.engine_type,
            car_plan: formdata.car_plan
        }
        //sending post request to insert cars data
        axiosInstance.post('/cars/car/',data).then((res)=>{
            alert("Car Details are Added ")
            getcars()
        })
    }

    return (
        // Adding and Displaying Cars Data 
        <div className="row">
            <div className="col">
                <button onClick={getcars} className="btn btn-success">Get Cars</button>


                {/* Car Details Display component */}
                <DisplayCars getcars={getcars} responseData={responseData}/>
            </div>
            {/* Form for Adding car Details */}
            <div className="col">
            <div className="card w-75 h-100 shadow-lg bg-white rounded border">
                <p className="h2 card-title bg-primary ">Car Details</p>
                <form onSubmit={onsubmit} method="post" className="card-body p-4">
                <div className="row mt-2">
                    <div className="col">
                        
                        <div className="form-outline">
                            <input type="text" required id="carBrand" name="car_brand" onFocus={getCarplans} onChange={onchangeHandler} className="form-control"/>
                            <label htmlFor="carBrand" className="form-label">Car Brand</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" required  id="carModel" name="car_model" onChange={onchangeHandler} className="form-control"/>
                            <label htmlFor="carModel" className="form-label">Car Model</label>
                        </div>
                    </div>
                </div>
                 <div className="row mt-2">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" required  id="year_of_production" name="year_of_production" onChange={onchangeHandler} className="form-control"/>
                            <label htmlFor="year_of_production" className="form-label">Year of Production</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="engineType" name="engine_type" onChange={onchangeHandler} className="form-control"/>
                            <label htmlFor="engineType" className="form-label">Engine Type</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <div className="form-outline">
                            <input type="text" id="carBody" name="car_body" onChange={onchangeHandler} className="form-control"/>
                            <label htmlFor="carBody" className="form-label">Car Body</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                        <div className="md-form">
                            <label htmlFor="carPlan" className="form-label">Car Plan</label>
                            <select name="car_plan" id="carPlan" onChange={onchangeHandler}className="form-control">
                                <option value="">select</option>
                                {
                                    Object.keys(carplans).map((key,i)=>{
                                        return (
                                            <option value={carplans[key].id} key={i}>{carplans[key].plan_name}</option>
                                        )
                                    })
                                }
                                
                            </select>
                        </div>
                    </div>
                <div className="row mt-4">
                    <div className="col">
                        <button className="btn btn-primary">ADD Cars</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}
