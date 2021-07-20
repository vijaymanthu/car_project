import React from 'react'
import axiosInstance from '../../../axios'

export default function DisplayAssCar(props) {
    const data= props.responseData
    console.log(data)
     const deleteCarAssigned=(e)=>{
      const id = e.target.value
      axiosInstance.delete(`/cars/assign_car/${id}`).then((res)=>{
          if(res.status === 200){
              alert("DELETED")
              props.getassignedDetails()
          }
      })
  }
    return (
        <div>
             <table className="table table-responsive">
                <thead>
                    <tr>
                    <th>Car id</th>
                    <th>User id</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        Object.keys(data).map((key,i)=>{
                            console.log(data[key])
                            return (
                                
                                <tr key={i}> 
                                    <td  key={i+1}>{data[key].car}</td>
                                    <td  key={i+2}>{data[key].user_id}</td>
                                   <td key={i+3}><button value={data[key].id} onClick={deleteCarAssigned} style={{borderRadius:'10px'}}className="btn btn-danger btn-circle">x</button></td>
                         
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
