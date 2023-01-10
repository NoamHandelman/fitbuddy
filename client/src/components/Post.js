import { useState } from 'react';
import favicon from '../assets/images/favicon.ico';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../features.js/postSlice';
import { setEditPost } from '../features.js/postSlice';
import { FcLike } from 'react-icons/fc';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BiCommentEdit } from 'react-icons/bi';
import dayjs from 'dayjs';

const Post = ({ post, createdAt, updatedAt, likes, _id: id, user }) => {
  const { newPostOpen } = useSelector((store) => store.post);
  const { _id: currentUser } = useSelector(
    (store) => store.user.user.user
  );
  const [showOperationsBox, setShowOperationsBox] = useState(false);

  const dispatch = useDispatch();

  let postDate = dayjs(createdAt).format('MMM D, YYYY h:mm A');
  if (createdAt !== updatedAt) {
    postDate = dayjs(updatedAt).format('MMM D, YYYY h:mm A');
  }

  return (
    <article
      className={`single-post-container ${newPostOpen && 'grey-filter'}`}
    >
      <header className='post-header'>
        <img src={favicon} alt='placeholder' className='post-img' />
        <div className='post-details'>
          <span>username</span>
          <span>
            {createdAt !== updatedAt ? 'Edited at' : 'Posted at'} {postDate}
          </span>
        </div>
        {currentUser === user && (
          <BiDotsVerticalRounded
            className='dots'
            onClick={() =>
              !newPostOpen && setShowOperationsBox(!showOperationsBox)
            }
          />
        )}
        {showOperationsBox && (
          <div className='operation-box'>
            <button
              type='button'
              className='delete-btn'
              onClick={() => dispatch(deletePost(id))}
            >
              Delete post
            </button>
            <button
              type='button'
              className='edit-btn'
              onClick={() => {
                dispatch(setEditPost(id));
                setShowOperationsBox(!showOperationsBox);
              }}
            >
              Edit post
            </button>
          </div>
        )}
      </header>
      <div className='post-text'>{post}</div>
      <footer className='post-footer'>
        <button type='button' className='like-btn'>
          <FcLike />
        </button>
        <button type='button' className='comment-btn'>
          <BiCommentEdit />
        </button>
      </footer>
    </article>
  );
};
export default Post;
