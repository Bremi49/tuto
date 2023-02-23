import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Erreur from "./components/Error";
import Contact from "./components/Contact";
//Users
import CreateUser from "./components/users/createUser";
import Login from "./components/users/Login";
//Articles
import CreateArticle from "./components/article/createArticles"
import SelectArticle from "./components/article/selectArticle"

//Reservation
import CreateReservation from "./components/reservation/createReservation"

import Nav from "./components/Nav";
import Admin from "./components/Admin";


const App = () => {
    return(
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Erreur />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/CreateUser" element={<CreateUser />} />
                <Route path="/Login" element ={<Login />} />
                <Route path="/Admin" element ={<Admin />} />
                <Route path="/CreateArticle" element ={<CreateArticle />} />
                <Route path="/selectArticle" element ={<SelectArticle />} />
                <Route path="/CreateReservation" element ={<CreateReservation />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;