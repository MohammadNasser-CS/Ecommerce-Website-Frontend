import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [userData, setUserData] = useState(null);
    const getUserData = () => {
        if (userToken != null) {
            const decode = jwtDecode(userToken);
            setUserData(decode);
        }
    };
    useEffect(() => {
        getUserData();
    }, [userToken])

    return <UserContext.Provider value={{ setUserToken, userData, setUserData }}>{children}</UserContext.Provider>;
};
export default UserContextProvider;