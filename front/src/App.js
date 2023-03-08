import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logo from "./components/logo/logo"
//CSS
import "./App.css"

import Home from "./components/Home";
import Erreur from "./components/Error";

//Contact
import Contact from "./components/contact/Contact";
import SelectContact from "./components/contact/selectContact"

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

//Custom
import CustomArticle from "./components/custom/article"
import CustomFood from "./components/custom/food"

//import Nav from "./components/Nav";
import Admin from "./components/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Deconnexion from "./components/Deconnexion";
import Header from "./components/Header";
import Footer from "./components/Footer"

import "./style.css"



const App = () => {
    return(
        <BrowserRouter>
            <Logo />
            <Header />
            <Admin />
            <Routes>
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="*" element={<PrivateRoute><Erreur /></PrivateRoute>} />
                
                {/*Contact*/ }
                <Route path="/Contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                <Route path="/SelectContact" element={<PrivateRoute auth="admin"><SelectContact/></PrivateRoute>} />
                
                {/* CreateAdmin*/}
                <Route path="/CreateUser" element={<PrivateRoute auth="admin"><CreateUser /></PrivateRoute>} />
                
                {/* Login Admin*/}
                <Route path="/Login" element ={<PrivateRoute><Login /></PrivateRoute>} />
                
                {/*redirection page Admin*/}
                {/*<Route path="/Admin" element ={<PrivateRoute auth="admin"></PrivateRoute>} /> */}
                
                {/* Articles CRUD Admin*/}
                <Route path="/CreateArticle" element={<PrivateRoute auth="admin"><CreateArticle /></PrivateRoute>} />
                <Route path="/selectArticle" element ={<PrivateRoute auth="admin"><SelectArticle /></PrivateRoute>} />
                
                {/* Creation de reservation*/}
                <Route path="/CreateReservation" element ={<CreateReservation />} />
                {/* Select Update Delete Reservation*/}
                <Route path="/SelectReservation" element ={<PrivateRoute auth="admin"><SelectReservation /></PrivateRoute>} /> 
                
                {/*CRUD Plat*/}
                <Route path="/CreateNourriture" element ={<PrivateRoute auth="admin"><CreateNourriture /></PrivateRoute>} /> 
                <Route path="/SelectNourriture" element ={<PrivateRoute auth="admin"><SelectNourriture /></PrivateRoute>} />
                
                {/* Create categorie*/}
                <Route path="/CreateCategorie" element ={<PrivateRoute auth="admin"><CreateCategorie /></PrivateRoute>} /> 
                
                <Route path="/Deconnexion" element ={<PrivateRoute auth="admin"><Deconnexion /></PrivateRoute>} />
                {/* Custom*/}
                <Route path="/CustomArticle" element={<PrivateRoute><CustomArticle/></PrivateRoute>}/>
                <Route path="/CustomFood" element={<PrivateRoute><CustomFood/></PrivateRoute>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;