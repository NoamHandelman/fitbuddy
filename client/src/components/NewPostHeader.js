import { useSelector, useDispatch } from 'react-redux';
import { openNewPost } from '../features.js/postSlice';

import favicon from '../assets/images/favicon.ico';

const NewPostHeader = () => {
  const dispatch = useDispatch();
  return (
    <section
      className='new-post-header'
      onClick={() => dispatch(openNewPost())}
    >
      <img className='post-img' src={favicon} alt='placeholder' />
      <p>Hey user, you can add post here</p>
    </section>
  );
};

export default NewPostHeader;
