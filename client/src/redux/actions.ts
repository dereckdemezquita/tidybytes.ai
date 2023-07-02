export const SET_USER_DATA = 'SET_USER_DATA';

interface User {
    id: number;
    name: string;
    email: string;
    // add other user properties here
}

export const setUserData = (user: User) => ({
    type: SET_USER_DATA,
    payload: user
});

export const UNSET_USER_DATA = 'UNSET_USER_DATA';

export const unsetUserData = () => ({
    type: UNSET_USER_DATA,
});
