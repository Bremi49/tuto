import {NavLink} from "react-router-dom"

const Nav = () =>{
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/">home</NavLink>
                </li>
                <li>
                    <NavLink to="/erreur">erreur</NavLink>
                </li>
            </ul>
        </nav>
        )
}
export default Nav