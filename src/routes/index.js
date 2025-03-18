import React from "react";

// routes
import {
    Routes,
    Route,

    useLocation,
    Navigate,

} from "react-router-dom";
import { useAuth } from '../context/Auth';


import MainLayout from '../components/layout/MainLayout';
import GruzStatistics from "../components/shared/gruz-statistics"
import Spravka31 from "../components/pages/spravka31"
import Naturki from "../components/pages/naturki"
import Spravka1 from "../components/pages/spravka1"
import Spravka2 from "../components/pages/spravka2"
import VagonPodhod from "../components/pages/vagonpodhod"
import Asus from "../components/pages/asus"
import { FindVagonsAll } from "../components/pages/findvagons"
import Clients from '../components/pages/clients'

import Login from "../components/pages/auth/login"
import Complete from "../components/pages/auth/complete"
// ==============================|| ROUTING RENDER ||============================== //

export default function MRoutes() {
    return (
        <Routes >
            <Route element={<MainLayout />}>
                <Route path="/" element={<RequireAuth><GruzStatistics /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/complete" element={<Complete />} />
                <Route path="/disl" element={<RequireAuth><Spravka1 /></RequireAuth>} />
                <Route path="/pogrvygr" element={<RequireAuth><Spravka2 /></RequireAuth>} />
                <Route path="/mesgruz" element={<RequireAuth><Spravka31 /></RequireAuth>} />
                <Route path="/naturki" element={<RequireAuth><Naturki /></RequireAuth>} />
                <Route path="/podhod" element={<RequireAuth><VagonPodhod /></RequireAuth>} />
                <Route path="/findvagons" element={<RequireAuth><FindVagonsAll /></RequireAuth>} />
                <Route path="/clients" element={<RequireAuth><Clients /></RequireAuth>} />
                <Route path="/nakoplenie13857" element={<RequireAuth><Asus /></RequireAuth>} />

            </Route>
        </Routes >
    )
}


function RequireAuth({ children }) {
    const { signedIn } = useAuth();
    let location = useLocation();

    if (!signedIn) {

        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}