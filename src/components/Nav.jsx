import { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Nav = ({ setSearchTerm }) => {
  const [show, setShow] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <div className="nav__contents">
        <div className="nav__left">
          <h1 className="nav__logo">NETFLIX</h1>
          <ul className="nav__menu">
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
          </ul>
        </div>

        <div className="nav__right">
          <div className="nav__icons">
            <div className="nav__search">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Titles, people, genres"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Bell size={20} />
            <div className="nav__avatar-container">
              <img
                className="nav__avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="User"
              />
              <div className="nav__dropdown">
                <p>{user?.name}</p>
                <hr />
                <span onClick={handleLogout}>Sign out of Netflix</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .nav {
          position: fixed;
          top: 0;
          padding: 20px;
          width: 100%;
          height: 70px;
          z-index: 100;
          transition-timing-function: ease-in;
          transition: all 0.5s;
        }
        .nav__black {
          background-color: #111;
        }
        .nav__contents {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        .nav__left {
          display: flex;
          align-items: center;
          gap: 25px;
        }
        .nav__logo {
          color: #e50914;
          cursor: pointer;
          font-weight: 800;
          font-size: 1.8rem;
          letter-spacing: -1px;
        }
        .nav__menu {
          display: flex;
          list-style: none;
          gap: 20px;
          margin: 0;
          padding: 0;
        }
        .nav__menu li {
          color: #e5e5e5;
          font-size: 0.85rem;
          cursor: pointer;
          transition: color 0.3s;
        }
        .nav__menu li:hover {
          color: #b3b3b3;
        }
        .nav__right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav__icon {
          color: white;
          cursor: pointer;
        }
        .nav__avatar {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          cursor: pointer;
        }
        .nav__avatar-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .nav__avatar-container:hover .nav__dropdown {
          display: block;
        }
        .nav__dropdown {
          display: none;
          position: absolute;
          top: 45px;
          right: 0;
          background: rgba(0,0,0,0.9);
          min-width: 150px;
          padding: 15px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .nav__dropdown p { margin: 0 0 10px; font-size: 14px; color: white; }
        .nav__dropdown hr { border: 0.5px solid rgba(255,255,255,0.1); margin: 10px 0; }
        .nav__dropdown span { cursor: pointer; font-size: 13px; font-weight: 500; color: white; }
        .nav__dropdown span:hover { text-decoration: underline; }
        .nav__kids {
          color: white;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .nav__avatar {
          width: 32px;
          height: 32px;
          background: #333;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav__menu { display: none; }
        }
      `}} />
    </nav>
  );
};

export default Nav;
