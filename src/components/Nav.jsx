import { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';

const Nav = ({ setSearchTerm }) => {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
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
                    <Search className="nav__icon" size={20} />
                    <span className="nav__kids">Kids</span>
                    <Bell className="nav__icon" size={20} />
                    <div className="nav__avatar">
                        <User size={20} />
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
