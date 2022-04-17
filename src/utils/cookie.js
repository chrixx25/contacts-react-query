import { useCookie } from "react-use";
import jwtDecode from "jwt-decode";

const cookieName = process.env.REACT_APP_TOKEN

export const GetToken = () => {
    const [value, ,] = useCookie(cookieName);
    return value;
}

export const GetUser = () => {
    try {
        const token = GetToken();
        const decoded = jwtDecode(token);
        const currentTime = new Date().getTime() / 1000;

        if (currentTime > decoded.exp)
            return null;
        return decoded;
    } catch (error) {
        return null;
    }
};