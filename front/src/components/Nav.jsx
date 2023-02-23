import { NavLink } from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'
const Nav = (props) => {
  
  // useEffect(() => {
  //   if(!axios.defaults.headers.common['Authorization']){
  //     const token = localStorage.getItem("jwtToken")
  //     if(token){
  //       axios.defaults.headers.common['Authorization'] = 'Bearer '+token
  //     }
  //   }
  // },[])
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/Contact">
            contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/createArticle">
          creation d'article
          </NavLink>
        </li>
        <li>
        <NavLink to ="/selectArticle">
        Article
        </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;