// RootPage.js
import { Link, } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={'navigation'}>
      <ul>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      
    </footer>
  )
};

export default Footer;