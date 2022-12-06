import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allPosts } from '../features.js/postSlice';
import { NewPost, Posts } from '../components';

const Home = () => {
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);

  return (
    <main className='home-page'>
      <NewPost />
      <Posts />
    </main>
  );
};
export default Home;
