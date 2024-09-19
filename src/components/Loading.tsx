import { Spin } from "antd"

const Loading:React.FC = ()=>{
    return (
        <div>
                 <Spin spinning={true}  fullscreen />

        </div>
    )
}

export default Loading