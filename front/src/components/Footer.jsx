import { FaFacebookSquare, FaInstagram} from 'react-icons/fa';

const Footer = () => {

  return (
    <footer>
      <div className="reseau">
        <div className="suivez">Suivez-nous sur les réseaux sociaux :</div>
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
      <div className="horaire">
        <h3 className="titre">Horaires d'ouverture</h3>
        <div>Lundi: Fermé</div>
        <div>Mardi: 12h-13h45/ 19h-21h</div>
        <div>Mercredi: 12h-13h45/ 19h-21h</div>
        <div>Jeudi: 12h-13h45/ 19h-21h</div>
        <div>Vendredi: 12h-13h45/ 19h-21h</div>
        <div>Samedi: 12h-13h45/ 19h-21h</div>
        <div>Dimanche: 12h-13h45/ 19h-21h</div>
      </div>
      <div className="adresse">
        <div>Adresse :</div>
        <a href="https://www.google.com/maps/search/?api=1&query=42 Rue du Maréchal Leclerc, 49400 Saumur" target="_blank" rel="noopener noreferrer">42 Rue du Maréchal Leclerc, 49400 Saumur</a>
      </div>
         <div className="mention-legal">
            <a href="/MentionLegal">Mentions légales ©</a>
        </div>
    </footer>
  );
}
export default Footer