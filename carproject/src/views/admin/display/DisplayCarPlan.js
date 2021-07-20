import React from 'react'
import axiosInstance from '../../../axios'


export default function DisplayCarPlan(props) {
    const data = props.responseData
    
//    Deleting Record by id 
    const deleteCarPlans=(e)=>{
      const id = e.target.value
      axiosInstance.delete(`/cars/carplan/${id}`).then((res)=>{
          if(res.status === 200){
              alert("User DELETED")
              props.getCarplans()
          }
      })
  }
    return (
        <div>
            <table className="table table-responsive">
                <thead>
                    <tr>
                    <th>Plan Name</th>
                    <th>Year of Warranty</th>
                    <th>Finance Plan</th>
                    <th>Action</th>
                    </tr>
                </thead>
            
            <tbody>
                {
                     Object.keys(data).map((record,j)=>{
                        return(
                            <tr key={j}>
                                <td key={j+1}>{data[record].plan_name}</td>
                                <td key={j+2}>{data[record].year_of_warranty}</td>
                                <td key={j+3}>{data[record].finance_plan}</td>
                                <td key={j+4}><button value={data[record].id} onClick={deleteCarPlans} style={{borderRadius:'10px'}}className="btn btn-danger btn-circle">x</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

