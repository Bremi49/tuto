import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Erreur from "./components/Error";
import Contact from "./components/Contact";
import CreateUser from "./components/createUser"
import Nav from "./components/Nav";


const App = () => {
    return(
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Erreur />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/CreateUser" element={<CreateUser />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;