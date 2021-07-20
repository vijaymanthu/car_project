import React from 'react'
import axiosInstance from '../../../axios'

export default function DisplayCars(props) {
    const data= props.responseData
     const deleteCar=(e)=>{
      const id = e.target.value
      axiosInstance.delete(`/cars/car/${id}`).then((res)=>{
          if(res.status === 200){
              alert("Car DELETED")
              props.getcars()
          }
      })
  }
    
    return (
        <div>
       <table className="table table-responsive">
                <thead>
                    <tr>
                    <th>Car Brand</th>
                    <th>Car Model</th>
                    <th>Production Year</th>
                    <th>Car Body</th>
                    <th>Engine Type</th>
                    <th colSpan="3">Car Plan</th>
                    <th>Action</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Plan Name</th>
                        
                        
                        
                    </tr>
                </thead>
            
            <tbody>
                {
                     Object.keys(data).map((record,j)=>{
                        return(
                            <tr key={j}>
                                <td key={j+1}>{data[record].car_brand}</td>
                                <td key={j+2}>{data[record].car_model}</td>
                                <td key={j+3}>{data[record].production_year}</td>
                                
                                <td key={j+4}>{data[record].car_body}</td>
                                <td key={j+5}>{data[record].engine_type}</td>
                                <td colspan="3" key={j+6}>
                                    <td>{data[record].car_plan['plan_name']}</td>
                                    

                                    </td>
                                <td key={j+7}><button value={data[record].id} onClick={deleteCar} style={{borderRadius:'10px'}}className="btn btn-danger btn-circle">x</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
