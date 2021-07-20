import React,{useState} from 'react'
import axiosInstance from '../../../axios'

export default function AddedUsers(props) {
  
  const data = props.responseData
 console.log(data)
 
//  Object.keys(data).map((record,j)=>{
//     Object.keys(data[record]).map((keyname,i)=>{
//         console.log(data[record][keyname])
//         })
//     }                    
// )
  const deleteUser=(e)=>{
      const user_id = e.target.value
      axiosInstance.delete(`/cars/adduser/${user_id}`).then((res)=>{
          if(res.status === 200){
              alert("User DELETED")
              props.getusers()
          }
      })
  }
    return (
        <div>
            <table className="table table-responsive">
                <thead>
                    <tr>
                    <th>Email</th>
                    <th>UserName</th>
                    <th colspan="2">Action</th>
                    </tr>
                    {/* <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr> */}
                    
                </thead>
            
            <tbody>
                {
                     Object.keys(data).map((record,j)=>{
                        return(
                            <tr key={j}>
                                <td key={j+1}>{data[record].email}</td>
                                <td key={j+2}>{data[record].user_name}</td>
                                <td key={j+3}><button value={data[record].id} onClick={deleteUser} style={{borderRadius:'10px'}}className="btn btn-danger btn-circle">x</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

