import React from 'react'


//Display Assigned Cars 

export default function DisplayCarInfo(props) {
    const data = props.responseData
        return (
        <div className="container mt-5">
            <h2>Assigned Cars</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                    <th>Car Brand</th>
                    <th>Car Model</th>
                    <th>Production Year</th>
                    <th>Car Body</th>
                    <th>Engine Type</th>
                    <th colSpan="3">Car Plan</th>
                    
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
                                <td colSpan="3" key={j+6}>
                                    <td key={j+7}>{data[record].car_plan['plan_name']}</td>
                                    </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

