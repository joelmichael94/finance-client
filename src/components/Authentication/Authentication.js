import { useState } from "react";
import { login, register } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

export const Login = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const mutation = useMutation(async (user) => await login(user), {
        onSuccess: () => {
            navigate("/daily");
        },
    });

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = () => {
        mutation.mutate(user);
    };

    return (
        <div className="h-[70vh] flex flex-col justify-center items-center gap-6 text-lg">
            <div className="flex flex-col justify-center w-1/4">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    onChange={onChangeHandler}
                    className="px-2 py-1 text-white bg-transparent border-b-2 border-slate-500 focus:border-b-2 focus:outline-none focus:ring-0 hover:border-white "
                />
            </div>

            <div className="flex flex-col justify-center w-1/4">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={onChangeHandler}
                    className="px-2 py-1 text-white bg-transparent border-b-2 border-slate-500 focus:border-b-2 focus:outline-none focus:ring-0 hover:border-white"
                />
            </div>

            <button
                onClick={onSubmitHandler}
                className="px-6 py-1 font-semibold text-white border-2 rounded-lg 0 border-slate-500"
            >
                Login
            </button>
        </div>
    );
};

export const Register = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const mutation = useMutation((user) => register(user), {
        onSuccess: () => {
            navigate("/login");
        },
    });

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = () => {
        mutation.mutate(user);
    };

    return (
        <div className="h-[70vh] flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col justify-center w-1/4">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    onChange={onChangeHandler}
                    className="px-2 py-1 text-white bg-transparent border-b-2 border-slate-500 focus:border-b-2 focus:outline-none focus:ring-0 hover:border-white"
                />
            </div>
            <div className="flex flex-col justify-center w-1/4">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={onChangeHandler}
                    className="px-2 py-1 text-white bg-transparent border-b-2 border-slate-500 focus:border-b-2 focus:outline-none focus:ring-0 hover:border-white"
                />
            </div>
            <div className="flex flex-col justify-center w-1/4">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={onChangeHandler}
                    className="px-2 py-1 text-white bg-transparent border-b-2 border-slate-500 focus:border-b-2 focus:outline-none focus:ring-0 hover:border-white"
                />
            </div>
            <button
                onClick={onSubmitHandler}
                className="px-6 py-1 font-semibold text-white border-2 rounded-lg 0 border-slate-500"
            >
                Register
            </button>
        </div>
    );
};
