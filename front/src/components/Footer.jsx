import { FaFacebookSquare, FaInstagram} from 'react-icons/fa';
const Footer =() =>{
    return(
        <footer>
      <div>
        Suivez-nous sur les réseaux sociaux :
        <ul>
          <li>
            <a href="https://www.facebook.com/BersanR" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/l.instinct.saumur/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <a href="https://www.google.com/maps/search/?api=1&query=42 Rue du Maréchal Leclerc, 49400 Saumur" target="_blank" rel="noopener noreferrer">42 Rue du Maréchal Leclerc, 49400 Saumur</a>
      </div>
    </footer>
        )
}
export default Footer