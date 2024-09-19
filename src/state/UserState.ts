import {atom, selector} from 'recoil';
import  {User}  from '../types/User';
export const userState = atom<User>({
    key: 'userState',
    default: {
        token: ''
        },
    });

export const userSelector = selector({
    key: 'userSelector',
    get: ({get}) => {
        const user = get(userState);
        return user;
    }
});

