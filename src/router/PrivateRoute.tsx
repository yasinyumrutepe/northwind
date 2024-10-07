import { Outlet } from "react-router-dom";
import NavbarComp from "../components/Navigation";
import { Layout } from "antd";
import FooterComp from "../components/Footer";



const PrivateRoute=()=>{

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '/login';
    }
    


    return (
      <Layout style={{ minHeight: '100vh' }}>
       <NavbarComp/>
       <Outlet/>
         <FooterComp  />
      </Layout>
      
      
       

    )
}

export default PrivateRoute;
