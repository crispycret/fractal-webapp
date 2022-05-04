

import { useState } from 'react';

interface TokenInterface {
    setToken: (userToken: string) => void;
    token: string;
    removeToken: () => void;
}

export const useToken = (): TokenInterface => {

    function getToken()  {
        const userToken = localStorage.getItem('token')
        return userToken && userToken
    }

    const [token, setToken] = useState(getToken());


    function saveToken(userToken: string) {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    }


    function removeToken() {
        localStorage.removeItem('token');
        setToken(null)
    }

    return {
        setToken: saveToken,
        token,
        removeToken
    } as TokenInterface;

}


export default useToken;