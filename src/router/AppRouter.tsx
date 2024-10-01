import { BrowserRouter, Routes,Route } from "react-router-dom"
import  Home from "../pages/Home"
import NotFoundPage from "../pages/NotFound"
import AddProduct from "../pages/AddProduct"
import CategoryProducts from "../pages/CategoryProducts"
import Login from "../pages/Login"
import { Layout } from "antd"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Register from "../pages/Register"
import Orders from "../pages/Orders"
import Basket from "../pages/Basket"
import ProfilePage from "../pages/Profile"
import ProductDetail from "../pages/ProductDetail"
import UpdateProduct from "../pages/UpdateProduct"
import AddCampaign from "../pages/AddCampaign"
import Authorization from "../pages/Authorization"


export const AppRouter :React.FC = () => {
    return (
    <BrowserRouter>
       <Routes>
       <Route element={<PublicRoute />}>
       <Route path= "/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       </Route>
        <Route path="/" element={<PrivateRoute  />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/add" element={<AddProduct/>}/>
        <Route path= "/products/:categoryid" element={<CategoryProducts/>}/>
        <Route path= "/product/:productid" element={<ProductDetail/>}/>
        <Route path= "/product/update/:productid" element={<UpdateProduct/>}/>
        <Route path= "/campaigns" element={<AddCampaign/>}/>
        <Route path= "/orders" element={<Orders/>}/>
        <Route path="/basket" element= {<Basket/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        </Route>
        <Route element={<Layout style={{background:"#76b5c5"}}/>} >
          
        </Route>
           <Route path="*" element={<NotFoundPage/>}/>
           <Route path="/authorization" element={<Authorization/>}/>
         </Routes>
    </BrowserRouter>
    )
}

