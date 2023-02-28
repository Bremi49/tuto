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
import SelectReservation from "./components/reservation/selectReservation"

//Nourriture
import CreateNourriture from "./components/nourriture/createNourriture"
import SelectNourriture from "./components/nourriture/selectNourriture"

//Categorie
import CreateCategorie from "./components/categorie/createCategorie"

import Nav from "./components/Nav";
import Admin from "./components/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Deconnexion from "./components/Deconnexion"


const App = () => {
    return(
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Erreur />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/CreateUser" element={<PrivateRoute auth="admin"><CreateUser /></PrivateRoute>} /> {/* ADMIN */}
                <Route path="/Login" element ={<Login />} />
                <Route path="/Admin" element ={<PrivateRoute auth="admin"><Admin /></PrivateRoute>} /> {/* ADMIN */}
                <Route path="/CreateArticle" element={<PrivateRoute auth="admin"><CreateArticle /></PrivateRoute>} />
                <Route path="/selectArticle" element ={<SelectArticle />} />
                <Route path="/CreateReservation" element ={<CreateReservation />} />
                <Route path="/SelectReservation" element ={<PrivateRoute auth="admin"><SelectReservation /></PrivateRoute>} /> {/* ADMIN */}
                <Route path="/CreateNourriture" element ={<PrivateRoute auth="admin"><CreateNourriture /></PrivateRoute>} /> {/* ADMIN */}
                <Route path="/SelectNourriture" element ={<SelectNourriture />} />
                <Route path="/CreateCategorie" element ={<PrivateRoute auth="admin"><CreateCategorie /></PrivateRoute>} /> {/* ADMIN */}
                <Route path="/Deconnexion" element ={<Deconnexion />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;