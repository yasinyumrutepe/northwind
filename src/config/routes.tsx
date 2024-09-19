type Route = {
    id : number;
    path: string;
    component: string;
};


export const routes: Route[] = [
    {   
        id : 1,
        path: "/",
        component: "Home"
    },
    {
        id:2,
        path:"/my-orders",
        component:"MyOrders"
    }
    

   
    
];