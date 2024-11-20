import { Outlet } from "react-router-dom";
import { Button, Layout } from "antd";
import AdminSidebar from "../components/AdminSidebar";
import { Content, Header } from "antd/es/layout/layout";



const AdminRoute=()=>{

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = '/login';
    }
    const goWebSite = () => {
        window.location.href = '/';
    }


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AdminSidebar/>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#fff', textAlign: 'right', paddingRight: '20px' }}>
           <Button type="primary" onClick={goWebSite}>Go to Web Site</Button>
            
        </Header>
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Outlet/>
          </div>
        </Content>
      </Layout>
      
      </Layout>
      
      
       

    )
}

export default AdminRoute;
