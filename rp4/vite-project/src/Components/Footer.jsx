// Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-center text-slate-50 py-10 bg-slate-800">
      <p>Copyright &copy; 2023</p>
      <Link to="/about" className="text-slate-50/50">
        About
      </Link>
    </footer>
  );
};

export default Footer;
