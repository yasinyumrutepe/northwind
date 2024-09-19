import {atom, selector} from 'recoil';
import  {CreateProduct}  from '../types/Product';
export const productState = atom<CreateProduct[]>({
    key: 'productState',
    default: [],
    });

export const productSelector = selector({
    key: 'productSelector',
    get: ({get}) => {
        const products = get(productState);
        return products;
    }
});

