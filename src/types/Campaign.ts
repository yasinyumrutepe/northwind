

export type Campaign = {
    campaignID: number;
    campaignName: string;
    discountAmount: number;
    isPercent: boolean;
    isActive: boolean;
}

export type CampaignRequest = {
    campaignName: string;
    discountAmount: number;
    isPercent: boolean;
}

export type CampaignUpdateStatusRequest = {
    campaignID: number;
    isActive: boolean;
}