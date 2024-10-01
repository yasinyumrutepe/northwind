import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Switch,
  Card,
  Typography,
  notification,
} from "antd";
import { addCampaign } from "../services/CampaignService";
import { Campaign } from "../types/Campaign";
import { useMutation } from "@tanstack/react-query";

const { Title } = Typography;

const AddCampaign: React.FC = () => {
  const [form] = Form.useForm();
  const [isPercentage, setIsPercentage] = useState<boolean>(true); // Yüzde mi olduğunu tutar

  const addCampaignMutation = useMutation({
    mutationFn: (campaign: Campaign) => addCampaign(campaign),
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: "Campaign added successfully",
      });
      form.resetFields();
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "An error occurred while adding campaign",
      });
    },
  });

  const onFinish = (values: any) => {
    var campaing:Campaign = {
      campaignName: values.campaignName,
      discountAmount: values.discountAmount,
      isPercent: isPercentage,
    };
    addCampaignMutation.mutate(campaing);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Add Campaign</Title>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Campaign Name"
            name="campaignName"
            rules={[{ required: true, message: "Please enter campaign name" }]}
          >
            <Input placeholder="Enter campaign name" />
          </Form.Item>

          <Form.Item
            label="Discount Rate"
            name="discountAmount"
            rules={[{ required: true, message: "Please enter discount rate" }]}
          >
            <InputNumber
              min={0}
              step={1}
              style={{ width: "100%" }}
              placeholder="Enter discount rate"
            />
          </Form.Item>

          <Form.Item label="Is it a percentage?" name="isPercent">
            <Switch checked={isPercentage} onChange={setIsPercentage} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add Campaign
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddCampaign;
