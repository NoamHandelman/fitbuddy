import logo from '../assets/images/logo.png';

const Logo = ({ logoStyle }) => {
  return (
    <div className='logo-container'>
      <img src={logo} alt='fitBuddy' className={logoStyle} />
    </div>
  );
};
export default Logo;
