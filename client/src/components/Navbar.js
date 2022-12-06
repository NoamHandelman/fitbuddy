import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    <main>
      <header className='nav'>
        <Logo logoStyle={'nav-logo'} />
        <div className='nav-links'>
          <Link to='/home'>Home</Link>
          <Link to='/Profile:id'>Profile</Link>
        </div>
      </header>
      <Outlet />
    </main>
  );
};

export default Navbar;
