import React from 'react'
import { Link } from 'react-router-dom'
import AddCarPlan from './AddCarPlan'
import AddCars from './AddCars'
import AddUsers from './AddUsers'
import AssignCars from './AssignCars'

// Admin Components
export default function Admin() {
  
    return (
      <div className="d-flex justify-content-center">
              <div className="container mt-5">
                {/* Login link */}
                  <Link className="float-end mt-3 btn btn-outline-danger" to="/logout">Logout</Link>
                  {/* Tabs for Different Activities of Admin */}
                    <ul className="nav nav-tabs nav-fill mb-3" id="ex1" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="ex2-tab-1"
                          data-mdb-toggle="tab"
                          href="#ex2-tabs-1"
                          role="tab"
                          aria-controls="ex2-tabs-1"
                          aria-selected="true"
                          >Add CarPlan</a
                        >
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="ex2-tab-2"
                          data-mdb-toggle="tab"
                          href="#ex2-tabs-2"
                          role="tab"
                          aria-controls="ex2-tabs-2"
                          aria-selected="false"
                          >Add Car</a
                        >
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="ex2-tab-3"
                          data-mdb-toggle="tab"
                          href="#ex2-tabs-3"
                          role="tab"
                          aria-controls="ex2-tabs-3"
                          aria-selected="false"
                          >Assign Cars</a
                        >
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="ex2-tab-4"
                          data-mdb-toggle="tab"
                          href="#ex2-tabs-4"
                          role="tab"
                          aria-controls="ex2-tabs-4"
                          aria-selected="false"
                          >ADD Users</a
                        >
                      </li>
                    </ul>
                    <div className="tab-content" id="ex2-content">
                      <div
                        className="tab-pane fade show active"
                        id="ex2-tabs-1"
                        role="tabpanel"
                        aria-labelledby="ex2-tab-1"
                      >
                      <AddCarPlan />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="ex2-tabs-2"
                        role="tabpanel"
                        aria-labelledby="ex2-tab-2"
                      >
                        <AddCars />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="ex2-tabs-3"
                        role="tabpanel"
                        aria-labelledby="ex2-tab-3"
                      >
                      <AssignCars />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="ex2-tabs-4"
                        role="tabpanel"
                        aria-labelledby="ex2-tab-4"
                      >
                        <AddUsers />
                      </div>
                  </div>
            </div>
        </div>
    )
}
