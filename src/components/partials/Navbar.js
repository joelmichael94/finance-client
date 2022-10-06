import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../api/users";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/users";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuth, user } = checkAuth();

    return (
        <div className="navbar py-4 bg-neutral">
            <div className="flex-1 pl-10">
                <Link
                    to="/"
                    className="normal-case text-xl pt-1 pb-2 px-7 rounded font-extrabold"
                >
                    easySave
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end pr-16">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                src="https://placeimg.com/80/80/people"
                                alt="UserImage"
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 btn-ghost"
                    >
                        {isAuth && user ? (
                            <>
                                <li>
                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                            toast.success("Logged out", {
                                                position: "top-center",
                                                autoClose: 3500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                icon: "✔",
                                            });
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login / Register</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
