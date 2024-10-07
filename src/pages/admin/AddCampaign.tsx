import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Switch,
  Card,
} from "antd";
import { addCampaign } from "../../services/CampaignService";
import { CampaignRequest } from "../../types/Campaign";
import { useMutation } from "@tanstack/react-query";
import { errorNotification, successNotification } from "../../config/notification";


const AddCampaign: React.FC = () => {
  const [form] = Form.useForm();
  const [isPercentage, setIsPercentage] = useState<boolean>(true); // Yüzde mi olduğunu tutar

  const addCampaignMutation = useMutation({
    mutationFn: (campaign: CampaignRequest) => addCampaign(campaign),
    onSuccess: () => {
      successNotification(
        "Campaign Added",
        "Campaign has been added successfully"
      );
      form.resetFields();
    },
    onError: () => {
      errorNotification(
        "An error occurred",
        "An error occurred while adding the campaign"
      );
    },
  });
  const onFinish = (values: any) => {
    var campaing: CampaignRequest = {
      campaignName: values.campaignName,
      discountAmount: values.discountAmount,
      isPercent: isPercentage,
    };
    addCampaignMutation.mutate(campaing);
  };

  return (
    <Card style={{ padding: "20px" }}
     title="Add Campaign"
    >
      <Button type="primary" style={{ marginBottom: "10px" }} href="/admin/campaigns">
        Back to Campaigns
      </Button>
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
    </Card>
  );
};

export default AddCampaign;
