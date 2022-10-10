import { useEffect, useState, Fragment } from 'react';
import { fetchWrapper } from 'helpers';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';

export { LikeUnlike };
/**
 * Component for like and unlike a post
 *
 * @param {*} postId
 * @return {*}
 */
function LikeUnlike(postId) {
  const [counterLike, setCounterLike] = useState(null);
  const [likeUnlike, setLikeUnlike] = useState(0);
  const getUrl = `${process.env.REACT_APP_API_URL}/api/posts-likes/${postId}`;
  const postUrl = `${process.env.REACT_APP_API_URL}/api/posts-likes`;

  // Get all likes for this post
  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    let res = await fetchWrapper.get(getUrl);

    setCounterLike(res.countVals);
    setLikeUnlike(res.userLiked);
  };

  // Post like or unlike to backend with fetchWrapper
  const likeUnlikePost = async () => {
    const post = postId;
    return await fetchWrapper.post(postUrl, { post, likeUnlike });
  };

  // Onclik like button change like counter and send to backend
  function handleSubmit(e) {
    e.preventDefault();
    if (likeUnlike === 1) {
      setLikeUnlike(0);
      if ((counterLike) => 1) {
        let oneLikeCount = counterLike - 1;
        setCounterLike(oneLikeCount);
      }
    }

    if (likeUnlike === 0) {
      setLikeUnlike(1);
      let oneLikeCount = counterLike + 1;
      setCounterLike(oneLikeCount);
    }
    return likeUnlikePost();
  }

  return (
    <div className="text-start user-dashboard-info-box mb-0 bg-white p-1">
      {likeUnlike === 1 ? (
        <Fragment>
          <IconButton aria-label="add to favorites" onClick={handleSubmit}>
            <FavoriteIcon sx={{ color: red[500] }}/>
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
