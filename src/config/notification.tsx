import { notification } from "antd";


export const successNotification = (message: string, description: string) => {
    notification.success({
        message: message,
        description: description,
        placement: "bottomLeft",
        duration: 1, 

    });
    };

export const errorNotification = (message: string, description: string) => {
    notification.error({
        message: message,
        description: description,
        placement: "bottomLeft",
        duration: 1,
    });
};

export const warningNotification = (message: string, description: string) => {
    notification.warning({
        message: message,
        description: description,
        placement: "bottomLeft",
        duration: 1,
    });
};

export const infoNotification = (message: string, description: string) => {
    notification.info({
        message: message,
        description: description,
        placement: "bottomLeft",
        duration: 1,
    });
};

