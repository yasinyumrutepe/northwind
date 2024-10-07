import api from '../api/api';
import {CampaignRequest, CampaignUpdateStatusRequest } from '../types/Campaign';





export const fetchCampaigns = async () => {
    const response = await api.get('/Campaign');
    return response.data;
}
export const findCampaign = async (campaignName:string) => {
    const response = await api.get(`/Campaign/${campaignName}`);
    return response.data;
}

export const addCampaign = async (campaign:CampaignRequest) => {
    const response = await api.post('/Campaign', campaign);
    return response.data;
}

export const changeStatusCampaign = async (campaign:CampaignUpdateStatusRequest ) => {
    const response = await api.put(`/Campaign`, campaign);
    return response.data;
}