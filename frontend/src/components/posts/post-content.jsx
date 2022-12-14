import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';

import { fetchWrapper } from 'helpers';

import { LikeUnlike } from 'components/likes/likes';
import { EditPost } from 'components/posts/post-edit';
import { postDelete } from '../../features/posts/posts.actions';

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

export { PostContent };

function PostContent(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const [canEdit, setCanEdit] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const [authorImage, setAuthorImage] = useState(undefined);
  const post = props.post;
  const myposts = useSelector((state) => state.posts.postsList);
  const mypost = myposts.find((item) => item.id === post.id);

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
    setAuthorImage(res.image);
    setAuthor(author_name);
  };

  // Check if user can edit post, this owner post or has admin role
  const checkUserRole = () => {
    if (user.id === mypost.author) {
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
        date={new Date(mypost.post_created)}
        locale="fr-FR"
        verbose="date"
      />
    </div>
  );

  // Delete post
  const handleDelete = () => {
    dispatch(postDelete(mypost.id));
  };

  return (
    <Fragment>
      <Card sx={{ marginBottom: 3 }} key={mypost.id}>
        <CardHeader
          avatar={<Avatar src={authorImage} alt={`avatar-user`} />}
          title={author}
          subheader={dateCreate}
        />
        {mypost.image && (
          <CardMedia
            component="img"
            height="320"
            image={mypost.image}
            alt="image-post2"
          />
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {mypost.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikeUnlike
            postId={mypost.id}
            isLiked={mypost.isLiked}
            countLikes={mypost.countLikes}
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
