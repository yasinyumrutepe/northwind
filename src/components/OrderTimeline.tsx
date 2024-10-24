import React from 'react';
import { Row, Col } from 'antd';
import { ClockCircleOutlined, CarOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { OrderStatus } from '../types/Order';




interface OrderTimelineProps {
  orderStatuses: OrderStatus[];
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ orderStatuses }) => {
  const getStatusIcon = (statusId: number, currentStatusId: number) => {
    const isGreen = statusId <= currentStatusId && currentStatusId !== 8; 
    const isRed = currentStatusId === 8;

    const iconStyle = {
      fontSize: '24px',
      color: isGreen ? 'green' : isRed ? 'red' : 'gray', 
    };

    switch (statusId) {
      case 1:
        return <ClockCircleOutlined style={iconStyle} />; 
      case 2:
        return <CheckCircleOutlined style={iconStyle} />; 
      case 3:
        return <CarOutlined style={iconStyle} />; 
      case 8:
        return <CloseCircleOutlined style={iconStyle} />; 
      default:
        return <ClockCircleOutlined style={iconStyle} />; 
    }
  };

  return (
    <Row justify="space-between" align="middle" gutter={32}> 
      {orderStatuses.map((status, index) => (
        <Col key={status.statusID}>
          <Row justify="center" align="middle" style={{ flexDirection: 'column' }}>
            <span>{status.status.statusName}</span>
            {getStatusIcon(status.statusID, orderStatuses[orderStatuses.length - 1].statusID)}
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default OrderTimeline;
