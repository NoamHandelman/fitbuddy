import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, editPost, closeNewPost } from '../features.js/postSlice';
import { SlClose } from 'react-icons/sl';
import { useEffect } from 'react';
const NewPost = () => {
  const [newPost, setNewPost] = useState('');

  const { newPostOpen, editedPost } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editedPost) {
      setNewPost(editedPost.post);
    } else {
      setNewPost('');
    }
  }, [editedPost]);

  const handleChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost) {
      //will be alert
      return console.log('Please add some test to your post');
    }
    if (editedPost) {
      dispatch(editPost({ post: newPost, id: editedPost._id }));
      console.log(newPost + 'from newPost comp');
      setNewPost('');
    } else {
      dispatch(addPost({ post: newPost }));
      setNewPost('');
    }
  };

  if (newPostOpen) {
    return (
      <section className='new-post-container'>
        <h1>{editedPost ? 'Edit Post' : 'New Post'}</h1>
        <SlClose
          className='close-icon'
          onClick={() => dispatch(closeNewPost())}
        />
        <form className='post-form'>
          <textarea
            className='new-post-text'
            name='newPost'
            value={newPost}
            placeholder='User, what do you want to share with us today?'
            onChange={handleChange}
          ></textarea>
          <button className='add-post-btn' type='submit' onClick={handleSubmit}>
            {editedPost ? 'Save Changes' : 'Add Post'}
          </button>
        </form>
      </section>
    );
  }
};
export default NewPost;
