import api from '../api/api';


export const findCampaign = async (campaignName:string) => {
    const response = await api.get(`/Campaign/${campaignName}`);
    return response.data;
}

export const addCampaign = async (campaign:any) => {
    const response = await api.post('/Campaign', campaign);
    return response.data;
}