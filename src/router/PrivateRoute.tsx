import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigation";
import { Layout } from "antd";


const PrivateRoute=()=>{

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '/login';
    }
    


    return (
        <Layout >
       <Navbar/>
       <Outlet/>
        </Layout>
       

    )
}

export default PrivateRoute;