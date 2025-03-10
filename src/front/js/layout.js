import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { LoginView } from "./pages/loginView";
import { ProfileView } from "./pages/profileView";
import { DashboardView } from "./pages/dashboardView";


import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { PublicRoutes } from "./routes/publicRoutes";
import { PrivateRoutes } from "./routes/privateRoutes";


//create your first component
const Layout = () => {
    const { store } = useContext(Context)

    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        {/* <Route element={<PublicRoutes user={store.user} />}> */}

                            <Route element={<Home />} path="/" />
                            <Route element={<LoginView />} path="/loginView" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />
                            
                        {/* </Route> */}

                        <Route element={<PrivateRoutes user={store.user} />}>
                            <Route element={<ProfileView />} path="/profileView" />
                            <Route element={<DashboardView />} path="/dashboardView" />
                        </Route>

                    </Routes>

                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);