import { useMutation } from "react-query";
import { useCookie } from "react-use";
//import { useNavigate } from 'react-router-dom';

import { signIn } from "apis";

export const useAuth = () => {
    //const navigate = useNavigate();
    const [, updateCookie] = useCookie(process.env.REACT_APP_TOKEN);

    return useMutation(signIn, {
        onSuccess: (data) => {
            updateCookie(data.token);
            window.location.reload();
        },
    });
};
