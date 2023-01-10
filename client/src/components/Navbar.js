import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { RiArrowDownSFill } from 'react-icons/ri';
import favicon from '../assets/images/favicon.ico';
import Logo from './Logo';
import { useState } from 'react';

const Navbar = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  return (
    <main>
      <header className='nav'>
        <Logo logoStyle={'nav-logo'} />
        <div className='nav-links'>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link active-link' : 'link'
            }
            to='/home'
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link active-link' : 'link'
            }
            to='/profiles'
          >
            Profiles
          </NavLink>
        </div>
        <div className='nav-user'>
          <img src={favicon} alt='placeholder' />
          <h3>username</h3>
          <div className='nav-user-options'>
            <RiArrowDownSFill
              className='nav-arrow'
              onClick={() => setShowUserOptions(!showUserOptions)}
            />
            {showUserOptions && (
              <section className='nav-buttons'>
                <button>My profile</button>
                <button>logout</button>
              </section>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </main>
  );
};

export default Navbar;
