import favicon from '../assets/images/favicon.ico';
import { useDispatch } from 'react-redux';
import { deletePost } from '../features.js/postSlice';
import { editPost } from '../features.js/postSlice';

const Post = ({ post, _id: id }) => {
  const dispatch = useDispatch();

  return (
    <article className='single-post-container'>
      <header className='post-header'>
        <img src={favicon} alt='placeholder' />
        <span>username</span>
        <span>12.04.2000</span>
      </header>
      <div className='post-text'>{post}</div>
      <footer className='post-footer'>
        <button type='button'>like</button>
        <button type='button'>comment</button>
        <button type='button' onClick={() => dispatch(deletePost(id))}>
          delete
        </button>
        <button type='button' onClick={() => dispatch(editPost(id))}>
          edit
        </button>
      </footer>
    </article>
  );
};
export default Post;
