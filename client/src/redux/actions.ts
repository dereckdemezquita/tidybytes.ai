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
