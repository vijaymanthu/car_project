import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './views/Register'
import Home from './views/Home'
import Admin from './views/admin/Admin'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Logout from './views/Logout'
import CarInfo from './views/user/CarInfo'
import Login from './views/user/Login'
import AdminLogin from './views/admin/AdminLogin'
function App(){
        return(

        <div>
            <Router>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                     <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    
                    {/* Admin Login */}
                    <Route path="/alogin">
                        <AdminLogin />
                    </Route>

                     <Route path="/carinfo">
                        <CarInfo />
                    </Route>
                </Switch>
            </Router>
        <Footer />
        </div>
        
            )
    }

export default App