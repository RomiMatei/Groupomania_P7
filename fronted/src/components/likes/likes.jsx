import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchWrapper } from 'helpers';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { postLikeGet, postLikePost } from '../../features/posts/posts.actions';

export { LikeUnlike };
/**
 * Component for like and unlike a post
 *
 * @param {*} postId
 * @return {*}
 */
function LikeUnlike(props) {
  const dispatch = useDispatch();
  const [counterLike, setCounterLike] = useState(props.countLikes);
  const [likeUnlike, setLikeUnlike] = useState(props.isLiked);
  const postUrl = `${process.env.REACT_APP_API_URL}/api/posts-likes`;

  // console.log(props.postId);

  // Post like or unlike to backend with fetchWrapper
  const likeUnlikePost = async () => {
    dispatch(postLikePost(props.postId));
  };

  // Onclik like button change like counter and send to backend
  function handleSubmit(e) {
    e.preventDefault();
    if (likeUnlike === true) {
      setLikeUnlike(false);
      if ((counterLike) => 1) {
        let oneLikeCount = counterLike - 1;
        setCounterLike(oneLikeCount);
      }
    }

    if (likeUnlike === false) {
      setLikeUnlike(true);
      let oneLikeCount = counterLike + 1;
      setCounterLike(oneLikeCount);
    }
    return likeUnlikePost();
  }

  return (
    <div className="text-start user-dashboard-info-box mb-0 bg-white p-1">
      {likeUnlike === true ? (
        <Fragment>
          <IconButton aria-label="add to favorites" onClick={handleSubmit}>
            <FavoriteIcon sx={{ color: red[500] }} />
          </IconButton>
          <Typography variant="overline">{counterLike}</Typography>
        </Fragment>
      ) : (
        <Fragment>
          <IconButton aria-label="remove to favorites" onClick={handleSubmit}>
            <FavoriteIcon />
          </IconButton>
          <Typography variant="overline">{counterLike}</Typography>
        </Fragment>
      )}
    </div>
  );
}
