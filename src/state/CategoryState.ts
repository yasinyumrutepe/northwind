import {atom, selector} from 'recoil';
import  {Category}  from '../types/Category';
export const categoryState = atom<Category[]>({
    key: 'categoryState',
    default: [],
    });


export const categorySelector =selector({
    key: 'allCategory',
    get: ({get})=>{
        get(categoryState)
    }
   
});

