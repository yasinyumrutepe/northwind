import api from '../api/api';



export const uploadImageApi = async (images:any) => {
    const response = await api.post('/ProductImage', images, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteImage = async (imagePublicID:number) => {
    const response = await api.delete('/ProductImage/'+imagePublicID);
    return response.data;
}