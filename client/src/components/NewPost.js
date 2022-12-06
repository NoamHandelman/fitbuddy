import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../features.js/postSlice';
const NewPost = () => {
  const [newPost, setNewPost] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost) {
      //will be alert
      return console.log('Please add some test to your post');
    }
    dispatch(addPost({ post: newPost }));
    setNewPost('');
  };

  return (
    <section className='new-post-container'>
      <form className='post-form'>
        <textarea
          className='post-text'
          name='newPost'
          value={newPost}
          placeholder='Hey User, what do you want to share with us today?'
          onChange={handleChange}
        ></textarea>
        <button className='add-post-btn' type='submit' onClick={handleSubmit}>
          Add Post
        </button>
      </form>
    </section>
  );
};
export default NewPost;
