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

import { postDelete } from '../../features/posts/posts.actions';


export { PostContent };

function PostContent(props) {
  const dispatch = useDispatch();
  // const { posts } = useSelector((x) => x.posts);
  const [postImage, setPostImage] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(user.user_id);
  const [currentUserRole, setCurrentUserRole] = useState(user.roles);
  const [author, setAuthor] = useState(undefined);
  const post = props.post;

  useEffect(() => {
    // dispatch(postsActions.allPosts());
    getAuthor();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthor = async () => {
    const getUrl = `${process.env.REACT_APP_API_URL}/api/user/${post.author}`;
    let res = await fetchWrapper.get(getUrl);
    const author_name = res.email;
    setAuthor(author_name);
  };

  if (post.image) {
    setPostImage(post.image);
  }

  // console.log(postImage);

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
    dispatch(postDelete({id: post.id}));
  }

  return (
    <Fragment>
      <Card sx={{ marginBottom: 3 }} key={post.id}>
        {currentUserRole === 1 ? (
          <CardHeader
            avatar={<Avatar src={user.image} alt={`avatar-user`} />}
            // action={deleteButton}
            title={author}
            subheader={dateCreate}
            // className={classes.followedAuthor}
          />
        ) : (
          <CardHeader
            avatar={<Avatar src={postImage} alt={`avatar-user`} />}
            // action={deleteButton}
            title={author}
            subheader={dateCreate}
            // className={classes.notFollowedAuthor}
          />
        )}
        {postImage && (
          <CardMedia
            component="img"
            height="140"
            image={postImage}
            alt="image-post"
          />
        )}

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <LikeUnlike postId={post.id} /> */}
          <IconButton aria-label="add to favorites" onClick={handleDelete}>
            <Clear sx={{ color: red[500] }}/>
          </IconButton>
        </CardActions>
      </Card>
    </Fragment>
  );
}
