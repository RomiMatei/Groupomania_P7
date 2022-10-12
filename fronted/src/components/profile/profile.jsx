import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { postsActions } from 'features';
import { postAll } from '../../features/posts/posts.actions';

import { LikeUnlike } from 'components/likes/likes';
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

export { ProfileComponent };

function ProfileComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   dispatch(postAll());

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  return (
    <div className="posts">
    {user.id}

    </div>
  );
}
