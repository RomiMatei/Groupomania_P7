import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchWrapper } from 'helpers';

// import { useSelector, useDispatch } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';

// import { postsActions } from 'store';
import { LikeUnlike } from 'components/likes/likes';
import { EditPost } from 'components/posts/post-edit';
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
import { Clear, Edit } from '@mui/icons-material';
import { red } from '@mui/material/colors';

import { postDelete } from '../../features/posts/posts.actions';

export { PostContent };

function PostContent(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const [currentUserRole, setCurrentUserRole] = useState(user.roles);
  const [canEdit, setCanEdit] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const post = props.post;

  useEffect(() => {
    getAuthor();
    checkUserRole();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get author detail from backend
  const getAuthor = async () => {
    const getUrl = `${process.env.REACT_APP_API_URL}/api/user/${post.author}`;
    let res = await fetchWrapper.get(getUrl);
    const author_name = res.email;
    setAuthor(author_name);
  };

  // Check if user can edit post, this owner post or has admin role
  const checkUserRole = () => {
    if (user.id === post.author) {
      setCanEdit(true);
    }
    if (user.roles === 2) {
      setCanEdit(true);
    }
  };

  // create time ago date
  let dateCreate = (
    <div>
      <ReactTimeAgo
        date={new Date(post.post_created)}
        locale="fr-FR"
        verbose="date"
      />
    </div>
  );

  // Delete post
  const handleDelete = () => {
    dispatch(postDelete(post.id));
  };



  return (
    <Fragment>
      <Card sx={{ marginBottom: 3 }} key={post.id}>
        <CardHeader
          avatar={<Avatar src={user.image} alt={`avatar-user`} />}
          title={author}
          subheader={dateCreate}
        />
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
            <Fragment>
              <IconButton aria-label="Remove post" onClick={handleDelete}>
                <Clear sx={{ color: red[500] }} />
              </IconButton>

              <EditPost postId={post} />
            </Fragment>
          )}
        </CardActions>
      </Card>
    </Fragment>
  );
}
