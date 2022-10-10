import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { postsActions } from 'features';
import { postAll } from '../../features/posts/posts.actions';

import { LikeUnlike } from 'components/likes/likes';
import { CreatePost } from 'components/posts/post-create';
import { PostContent } from 'components/posts/post-content';
// import './usersList.css';
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Typography,
  Skeleton,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export { PostsList };

function PostsList() {
  const dispatch = useDispatch();
  // const { posts } = useSelector((x) => x.posts);
  const posts = useSelector((state) => state.posts);
  // const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  let sortedPosts = [];
  if (posts.posts.length) {
    sortedPosts = [...posts.posts].sort((a, b) => b.id - a.id);
  }

  return (
    <div className="posts">
      <CreatePost />
      {sortedPosts.length && (
        <div className="post-section">
          {sortedPosts.map((post) => (
            <PostContent key={post.id} post={post} />
          ))}
        </div>
      )}
      {posts.loading && (
        <Card sx={{ m: 2 }}>
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
