import { Row, Col, Image } from "antd";
import { useEffect, useState } from "react";
import { OrderDetailProps } from "../types/Order";
import OrderTimeline from "./OrderTimeline";

const OrderLabel: React.FC<OrderDetailProps> = ({ order }) => {
    const [orderProductsImage, setOrderProductsImage] = useState<string[]>([]);
   
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

    return (
        <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ padding: "16px", marginBottom: "16px", rowGap: "16px" }}>
            <Col xs={24} sm={6} md={6}>
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

            <Col xs={24} sm={8} md={6}>
                <span style={{ fontSize: "14px", fontWeight: 400, color: "#7d7d7d" }}>
                    Order Number: <strong style={{ fontSize: "16px", fontWeight: 500, color: "#333" }}>{order.orderNumber}</strong>
                </span>
            </Col>

            <Col xs={24} sm={6} md={6}>
                <OrderTimeline orderStatuses={order.orderStatuses} /> 
            </Col>

            <Col xs={24} sm={4} md={6} style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "#7d7d7d" }}>{orderDate ? orderDate.toLocaleDateString() : 'Tarih yok'}</p>
                <p style={{ margin: 0, fontSize: "16px", fontWeight: 500, color: "#27ae60" }}>{order.totalPrice} TL</p>
            </Col>
        </Row>
    );
};

export default OrderLabel;
