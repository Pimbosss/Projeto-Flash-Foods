import  "./App.css"
// import Header from "/templates/header.jsx"
import Footer from "/templates/footer.jsx"
import Main from "/templates/Main.jsx"
import Login from "./login/login.jsx";
import AppRoutes from './Routes.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";



export default function App(){
  return(
     <BrowserRouter>
      <AppRoutes/>
      <Footer/>
    </BrowserRouter>
)    
}

