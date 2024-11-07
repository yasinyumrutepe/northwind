import { Outlet } from "react-router-dom";
import { Layout } from "antd";



const AuthRoute=()=>{



    return (
      <Layout style={{ minHeight: '100vh' }}>
       <Outlet/>
      </Layout>
      
      
       

    )
}

export default AuthRoute;
