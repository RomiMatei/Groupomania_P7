import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchWrapper } from 'helpers';

// import { useSelector, useDispatch } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';

// import { postsActions } from 'store';
import { LikeUnlike } from 'components/likes/likes';
import {
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  CardActions
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { red } from '@mui/material/colors';

import { postDelete, postGet } from '../../features/posts/posts.actions';

export { PostContent };

function PostContent(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  // const [post, setPost] = useState();
  const [currentUser, setCurrentUser] = useState(user.user_id);
  const [currentUserRole, setCurrentUserRole] = useState(user.roles);
  const [canEdit, setCanEdit] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const post = props.post;
  const postImage = post.image;

  useEffect(() => {
    getAuthor();
    checkUserRole();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthor = async () => {
    const getUrl = `${process.env.REACT_APP_API_URL}/api/user/${post.author}`;
    let res = await fetchWrapper.get(getUrl);
    const author_name = res.email;
    setAuthor(author_name);
  };

  const checkUserRole = () => {
    if (currentUser === post.author) {
      setCanEdit(true);
    }
    if (currentUserRole === 2) {
      setCanEdit(true);
    }
  };

  let dateCreate = (
    <div>
      <ReactTimeAgo
        date={new Date(post.post_created)}
        locale="fr-FR"
        verbose="date"
      />
    </div>
  );

  const handleDelete = () => {
    dispatch(postDelete({ id: post.id }));
  };

  return (
    <Fragment>
      <Card sx={{ marginBottom: 3 }} key={post.id}>
        {currentUserRole === 2 ? (
          <CardHeader
            avatar={<Avatar src={user.image} alt={`avatar-user`} />}
            title={author}
            subheader={dateCreate}
          />
        ) : (
          <CardHeader
            avatar={<Avatar src={user.image} alt={`avatar-user`} />}
            // action={deleteButton}
            title={author}
            subheader={dateCreate}
            // className={classes.notFollowedAuthor}
          />
        )}
        {post.image && (
          <CardMedia
            component="img"
            height="320"
            image={post.image}
            alt="image-post2"
          />
        )}

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikeUnlike
            postId={post.id}
            isLiked={post.isLiked}
            countLikes={post.countLikes}
          />
          {canEdit && (
            <IconButton aria-label="Remove post" onClick={handleDelete}>
              <Clear sx={{ color: red[500] }} />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Fragment>
  );
}
