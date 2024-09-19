import {atom} from 'recoil';
import  {Order}  from '../types/Order';
export const orderState = atom<Order[]>({
    key: 'orderState',
    default: [],
    });
