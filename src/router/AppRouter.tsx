import { BrowserRouter, Routes,Route } from "react-router-dom"
import  Home from "../pages/Home"
import NotFoundPage from "../pages/NotFound"
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
import Authorization from "../pages/Authorization"
import Checkout from "../pages/Checkout"
import ConfirmPayment from "../pages/ConfirmPayment"
import AdminPage from "../pages/Admin"
import AdminRoute from "./AdminRoute"
import AddProduct from "../pages/admin/AddProduct"
import UpdateProduct from "../pages/admin/UpdateProduct"
import Dashboard from "../pages/admin/Dashboard"
import AdminProducts from "../pages/admin/Products"
import AdminOrders from "../pages/admin/AdminOrders"
import AddCampaign from "../pages/admin/AddCampaign"
import AdminCampaigns from "../pages/admin/Campaings"
import AdminCustomers from "../pages/admin/AdminCustomers"
import AdminCategories from "../pages/admin/AdminCategories"
import MyFavoriteProducts from "../pages/MyFavoriteProducts"


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
       
        <Route path= "/products/:categoryid" element={<CategoryProducts/>}/>
        <Route path= "/product/:productid" element={<ProductDetail/>}/>
        <Route path="/myfavoriteproducts" element={<MyFavoriteProducts/>}/>
        <Route path= "/orders" element={<Orders/>}/>
        <Route path="/basket" element= {<Basket/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/orders/checkout" element= {<Checkout/>}/>
        <Route path="/orders/checkout/success" element= {<ConfirmPayment/>}/>
        <Route path= "/admin" element={<AdminPage/>}/>
        </Route>
        <Route path="/admin" element={<AdminRoute/>}>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/admin/products" element={<AdminProducts/>}/>
        <Route path="/admin/orders" element={<AdminOrders/>}/>
        <Route path="/admin/product/add" element={<AddProduct/>}/>
        <Route path= "/admin/product/update/:productid" element={<UpdateProduct/>}/>
        <Route path= "/admin/campaigns" element={<AdminCampaigns/>}/>
        <Route path= "/admin/campaigns/add" element={<AddCampaign/>}/>
        <Route path="/admin/customers" element={<AdminCustomers/>}/>
        <Route path="/admin/categories" element={<AdminCategories/>} />

        </Route>

        <Route element={<Layout style={{background:"#76b5c5"}}/>} >
          
        </Route>
           <Route path="*" element={<NotFoundPage/>}/>
           <Route path="/authorization" element={<Authorization/>}/>
         </Routes>
    </BrowserRouter>
    )
}

