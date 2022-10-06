import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export const login = async (user) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_URI}/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            return data;
        }
        // invalid input
        if (!res.ok) throw new Error(data.message);
    } catch (e) {
        // server error (backend unable to fetch)
        throw new Error(e.message);
    }
};

export const register = async (user) => {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_URI}/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );
        const data = await res.json();
        if (res.ok) return data;
        if (!res.ok) throw new Error(data.message);
    } catch (e) {
        throw new Error(e.message);
    }
};

export const logout = () => {
    localStorage.getItem("token") && localStorage.removeItem("token");
};

export const checkAuth = () => {
    let isAuth = localStorage.getItem("token") ? true : false;
    let user = localStorage.getItem("token")
        ? jwt_decode(localStorage.getItem("token"))
        : null;

    return { isAuth, user };
};
