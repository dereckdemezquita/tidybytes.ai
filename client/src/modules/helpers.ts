import axios from 'axios';

export const isUserLoggedIn = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    try {
        const response = await axios.get('/api/validate_token', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            return true;
        }

        localStorage.removeItem('token');
        return false;

    } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        return false;
    }
};
