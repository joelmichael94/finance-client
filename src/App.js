import React from "react";
import { Routes, Route } from "react-router-dom";
import Foot from "./components/partials/Footer";
import Navbar from "./components/partials/Navbar";
import Homepage from "./components/Guest/Homepage";
import {
    GuestRoutes,
    CustomerRoutes,
    ChooseRoutes,
    AdminRoutes,
} from "./components/Routes";
import { Login, Register } from "./components/Authentication";
import {
    Daily,
    Monthly,
    MultiSearch,
    SingleSearch,
    Weekly,
} from "./components/Customer";
import { checkAuth } from "./components/api/users";

function App() {
    const { isAuth, user } = checkAuth();

    return (
        <div>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        isAuth && user ? (
                            <>
                                <Navbar />
                                <Daily />
                                <Foot />
                            </>
                        ) : (
                            <ChooseRoutes />
                        )
                    }
                />

                <Route element={<GuestRoutes />}>
                    <Route
                        path="/login"
                        element={
                            <>
                                <Navbar />
                                <Login />
                                <Foot />
                            </>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <>
                                <Navbar />
                                <Register />
                                <Foot />
                            </>
                        }
                    />
                    <Route
                        path="/homepage"
                        element={
                            <>
                                <Navbar />
                                <Homepage />
                                <Foot />
                            </>
                        }
                    />
                </Route>

                <Route element={<CustomerRoutes />}>
                    <Route
                        path="/daily"
                        element={
                            <>
                                <Navbar />
                                <Daily />
                                <Foot />
                            </>
                        }
                    />
                    <Route
                        path="/weekly"
                        element={
                            <>
                                <Navbar />
                                <Weekly />
                                <Foot />
                            </>
                        }
                    />
                    <Route
                        path="/monthly"
                        element={
                            <>
                                <Navbar />
                                <Monthly />
                                <Foot />
                            </>
                        }
                    />
                    <Route
                        path="/single"
                        element={
                            <>
                                <Navbar />
                                <SingleSearch />
                                <Foot />
                            </>
                        }
                    />
                    <Route
                        path="/multi"
                        element={
                            <>
                                <Navbar />
                                <MultiSearch />
                                <Foot />
                            </>
                        }
                    />
                </Route>
                <Route element={<AdminRoutes />}></Route>
            </Routes>
        </div>
    );
}

export default App;
