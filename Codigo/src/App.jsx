import "./App.css";
import Footer from "/templates/footer.jsx";
import AppRoutes from "./Routes.jsx";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <Footer />
        </BrowserRouter>
    );
}