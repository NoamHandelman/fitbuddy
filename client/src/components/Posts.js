import { useSelector } from 'react-redux';
import Post from './Post';

const Posts = () => {
  const { posts, isLoading } = useSelector((store) => store.post);

  return (
    <section className='posts-container'>
      {posts.map((postItem) => {
        const { _id, post } = postItem;
        return <Post key={_id} {...postItem} />;
      })}
    </section>
  );
};
export default Posts;
