import {Layout } from 'antd';

const {  Footer } = Layout;


const FooterComp = () => {
  
    
    return (
        <Footer style={{ textAlign: 'center' }} className='flex-end'>
        ©{new Date().getFullYear()} Created by Yasin Yumrutepe
       </Footer>
    );
    };


export default FooterComp;