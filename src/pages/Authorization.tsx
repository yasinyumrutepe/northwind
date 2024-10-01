import { Button, Result } from 'antd';

const Authorization = () => {
   
    return (
        <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button href='/' type="primary">Go to Home</Button>}
  />
    );
    }
export default Authorization;
