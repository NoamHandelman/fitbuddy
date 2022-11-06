import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features.js/userSlice';
import { useState } from 'react';
import FormRow from './FormRow';

const initialState = {
  username: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggleMember = (e) => {
    e.preventDefault();
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, isMember } = values;
    if (!email || !password || (!isMember && !username)) {
      console.log('fill all fields please');
      return;
      //will be here alert
    }
    if (isMember) {
      dispatch(setUser({ user: { email, password }, endPoint: 'login' }));
      return;
    } else {
      dispatch(
        setUser({ user: { username, email, password }, endPoint: 'register' })
      );
    }
  };

  return (
    <section className='form-container'>
      <form className='register-form'>
        <h1>{values.isMember ? 'Login' : 'Register'}</h1>
        {!values.isMember && (
          <FormRow
            name='username'
            type='text'
            value={values.username}
            handleChange={handleChange}
          />
        )}
        <FormRow
          name='email'
          type='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          name='password'
          type='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='submit-btn' onClick={handleSubmit}>
          Let's Go!
        </button>
        <p>
          {values.isMember ? 'Not a buddy yet?' : 'Already a buddy?'}
          <button className='not-buddy-btn' onClick={toggleMember}>
            Click here
          </button>
        </p>
      </form>
    </section>
  );
};
export default Register;
