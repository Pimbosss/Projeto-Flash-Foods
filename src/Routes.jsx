import { Routes, Route, Navigate } from "react-router-dom";


import Home from './Home/Home'
import Login from "./login/login";


export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to= '/' /> }/>
        </Routes>
    )
}