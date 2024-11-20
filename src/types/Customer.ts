export type Customer = {
    customerID: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    user: {
        email: string;
    }
};


export type Personel={
    customerID:string;
    name:string;
    phone:string;
    email:string;
}
