import React from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../api/users";

export const CustomerRoutes = () => {
    const { isAuth, user } = checkAuth();
    return isAuth && !user.data.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export const GuestRoutes = () => {
    const { isAuth } = checkAuth();
    return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

export const AdminRoutes = () => {
    const { isAuth, user } = checkAuth();
    return isAuth && user.data.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export const ChooseRoutes = () => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            <small className="absolute bottom-2 right-2 flex flex-col justify-center items-end">
                <h1 className="text-4xl font-bold my-1">easySave</h1>
                powered by Vercel
            </small>
            <div className="flex w-screen h-screen justify-evenly items-between sm:flex-row sm:justify-evenly sm:items-center">
                <div className="flex flex-col items-center justify-center gap-6">
                    <button
                        className="w-full px-10 py-5 text-3xl font-semibold text-center normal-case border-2 hover:animate-pulse rounded-3xl btn-ghost border-slate-400"
                        onClick={() => navigate("/homepage")}
                    >
                        New User
                    </button>
                    <button
                        className="w-full px-10 py-5 text-3xl font-semibold normal-case border-2 hover:animate-pulse rounded-3xl btn-ghost border-slate-400"
                        onClick={() => navigate("/login")}
                    >
                        Existing User
                    </button>
                </div>
            </div>
        </div>
    );
};
