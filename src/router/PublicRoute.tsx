import Layout from "antd/es/layout/layout";
import { Outlet } from "react-router-dom"
import NavbarComp from "../components/Navigation";
import FooterComp from "../components/Footer";


const PublicRoute = ()=>{
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <NavbarComp/>
        <Outlet/>
          <FooterComp  />
       </Layout>

    )}

export default PublicRoute;