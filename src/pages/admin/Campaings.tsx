import React, { useEffect, useState } from "react";
import {  Button, Card, List, Skeleton, Switch } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changeStatusCampaign, fetchCampaigns } from "../../services/CampaignService";
import { Campaign } from "../../types/Campaign";




const AdminCampaigns: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Campaign[]>([]);

  const campaingsQuery = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => fetchCampaigns(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const updateStatusCampaignMutation = useMutation({
    mutationFn: (status: { isActive: boolean; campaignID: number }) =>
      changeStatusCampaign(status),
    onSuccess: () => {
      campaingsQuery.refetch();
    },
    onError: () => {
      console.log("Error");
    },
  });

  useEffect(() => {
    console.log(campaingsQuery.status);
    if (campaingsQuery.status === "success") {
      setList(campaingsQuery.data);
      setInitLoading(false);
    }
  }, [campaingsQuery, campaingsQuery.status]);

  const changeStatus = (status: { isActive: boolean; campaignID: number }) => {
    updateStatusCampaignMutation.mutate({
      isActive: status.isActive,
      campaignID: status.campaignID,
    });
  };

  return (
    <Card title="Campaigns">
    <Button
      type="primary"
      style={{ marginBottom: 16 }}
      href="/admin/campaigns/add"
    >
      Add Campaign
    </Button>
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={initLoading} active>
            <List.Item.Meta
              title={<p>{item.campaignName}</p>}
              description={
                <div>
                  <p>
                    Discount Amount:{" "}
                    {item.isPercent
                      ? item.discountAmount + "%"
                      : item.discountAmount + " TL"}
                  </p>
                </div>
              }
            />
            <div>
              <p>Is Active: </p>
              <Switch
                onChange={(value) =>
                  changeStatus({
                    isActive: value,
                    campaignID: item.campaignID,
                  })
                }
                checked={item.isActive} 
              />
            </div>
          </Skeleton>
        </List.Item>
      )}
    />
  </Card>
  );
};

export default AdminCampaigns;
