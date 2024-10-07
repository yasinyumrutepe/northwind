import { Row, Col,Image, Select } from "antd";
import { useEffect, useState } from "react";
import { ChangeOrderStatusRequest, OrderDetailProps } from "../../types/Order";
import { useMutation } from "@tanstack/react-query";
import { changeOrderStatus } from "../../services/OrderService";
import { errorNotification, successNotification } from "../../config/notification";


const AdminOrderLabel: React.FC<OrderDetailProps> = ({ order }) => {
    const [orderProductsImage, setOrderProductsImage] = useState<string[]>([]);
    const updateStatusMutation = useMutation({
        mutationFn: (status: ChangeOrderStatusRequest) => changeOrderStatus(status),
        onSuccess: () => {
           successNotification("Order Status Changed", "Order status has been changed successfully");
        },
        onError: () => {
           errorNotification("An error occurred", "An error occurred while changing the order status");
        }
    });
    
    useEffect(() => {
        const uniqueImages: string[] = [];
        order.orderDetails?.forEach(element => {
            if (element.product.productImages !== undefined) {
                const imagePath = element.product.productImages?.[0]?.imagePath;
                if (imagePath && !uniqueImages.includes(imagePath)) {
                    uniqueImages.push(imagePath);
                }
            }
        });
        setOrderProductsImage(uniqueImages);
    }, [order]);
    const orderDate = order.orderDate ? new Date(order.orderDate) : null;

    const changeStatus = (status: any) => {
        updateStatusMutation.mutate({ orderID: order.orderID, orderStatusID: status });

    }

    return (
        <Row justify="space-between" align="middle" style={{ padding: "16px",  marginBottom: "16px", rowGap: "16px" }}>
            <Col>
                <Row gutter={8}>
                    {orderProductsImage.slice(0, 2).map((image, idx) => (
                        <Col key={idx}>
                            <Image
                                src={image}
                                alt={`Product Image ${idx}`}
                                preview={false}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "contain",
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "4px",
                                }}
                            />
                        </Col>
                    ))}
                    {orderProductsImage.length > 2 && (
                        <Col>
                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "4px",
                                    fontSize: "14px",
                                    backgroundColor: "#f0f0f0",
                                }}
                            >
                                {`${orderProductsImage.length - 2}+`}
                            </div>
                        </Col>
                    )}
                </Row>
            </Col>

            <Col>
                <span style={{ fontSize: "14px", fontWeight: 400, color: "#7d7d7d" }}>
                    Order Number: <strong style={{ fontSize: "16px", fontWeight: 500, color: "#333" }}>{order.orderNumber}</strong>
                </span>
            </Col>

            <Col>
            <Select defaultValue={order.orderStatus.statusName} onChange={(value) => changeStatus(value)} style={{ width: 120 }} >
                <Select.Option value="1">Preparing</Select.Option>
                <Select.Option value="2">Shipped</Select.Option>
                <Select.Option value="3">Completed</Select.Option>
                <Select.Option value="4">Cancelled</Select.Option>
            </Select>
              
            </Col>

            <Col style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "#7d7d7d" }}> {orderDate ? orderDate.toLocaleDateString() : 'Tarih yok'}</p>
                <p style={{ margin: 0, fontSize: "16px", fontWeight: 500, color: "#27ae60" }}>{order.totalPrice} TL</p>
            </Col>
        </Row>
    );
};

export default AdminOrderLabel;
