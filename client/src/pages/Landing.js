import { Logo, Register } from '../components';

const Landing = () => {
  return (
    <main className='landing-container'>
      <Logo logoStyle={'landing-logo'} />
      <Register />
    </main>
  );
};

export default Landing;
