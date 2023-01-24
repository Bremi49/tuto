import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Erreur from "./components/Error";
import Nav from "./components/Nav";


const App = () => {
    return(
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Erreur />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;