import Layout from "antd/es/layout/layout";
import { Outlet } from "react-router-dom"


const PublicRoute = ()=>{
    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Outlet/>
    </Layout>

    )}

export default PublicRoute;