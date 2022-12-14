import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { postAll } from '../../features/posts/posts.actions';

import { CreatePost } from 'components/posts/post-create';
import { PostContent } from 'components/posts/post-content';

import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export { PostsList };

function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // set order post
  let sortedPosts = [];
  if (posts.postsList.length) {
    sortedPosts = [...posts.postsList].sort((a, b) => b.id - a.id);
  }

  return (
    <div className="posts">
      <CreatePost />
      {sortedPosts.length !== 0 && (
        <div className="post-section">
          {sortedPosts.map((postItem) => (
            <PostContent key={postItem.id} post={postItem} />
          ))}
        </div>
      )}
      {posts.loading && (
        <Card sx={{ m: 0 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />

          <CardContent>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </CardContent>
        </Card>
      )}
      {posts.error && (
        <div className="text-danger">
          Erreur de chargement de liste des posts: {posts.error.message}
        </div>
      )}
    </div>
  );
}
