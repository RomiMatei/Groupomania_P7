import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { postCreate } from '../../features/posts/posts.actions';

import {
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Input,
  CardActions,
  Box
} from '@mui/material';
import { InsertPhoto, Send } from '@mui/icons-material';

export { CreatePost };

function CreatePost() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  // const { posts } = useSelector((x) => x.posts);
  const user = JSON.parse(localStorage.getItem('user'));
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(undefined);
  const [postImagePreview, setPostImagePreview] = useState(undefined);
  const [postAuthor, setPostAuthor] = useState(user.id);

  // const validationSchema = Yup.object().shape({
  //   content: Yup.string().required('Contenu requis'),
  //   author: Yup.string().required('Auteur')
  // });
  // const formOptions = { resolver: yupResolver(validationSchema) };
  // const { register, handleSubmit, formState } = useForm(formOptions);
  // const { errors, isSubmitting } = formState;

  // function onSubmit({ content, author }) {
  //   console.log(content);
  //   return dispatch(postsActions.createPosts({ content, author }));
  // }
  // Add form onSubmit handler:
  function handleReset() {
    setPostContent('');
    setPostImage('');
    setPostImagePreview('');
    setPostAuthor('');
  }

  const selectFile = (event) => {
    setPostImage(event.target.files[0]);
    setPostImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const onChangeContent = (event) => {
    setPostContent(event.target.value);
  };

  const onFormSubmit = () => {
    const formData = new FormData();
    formData.append('author', postAuthor);
    formData.append('content', postContent);
    formData.append('image', postImage);

    dispatch(postCreate(formData));
    handleReset();
  };

  return (
    <Card sx={{ marginBottom: 3 }}>
      <div className="img-preview">
        {postImagePreview && (
          <CardMedia
            component="img"
            height="240"
            image={postImagePreview}
            alt="green iguana"
          />
        )}
      </div>
      <Box
        component={'form'}
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ mt: 2, mb: 3, width: '95%' }}
      >
        <CardContent>
          <TextField
            onChange={onChangeContent}
            onBlur={onChangeContent}
            name="content"
            label="Message"
            value={postContent}
            fullWidth
            // id="content"
            multiline
            rows={3}
            variant="standard"
            // {...register('content')}
            // error={errors.content ? true : false}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            component="label"
            color="primary"
            startIcon={<InsertPhoto />}
          >
            Insérer une image
            <Input
              // id="image"
              name="image"
              hidden
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={selectFile}
              // {...register('image')}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            // disabled={!this.state.valid_form === true}
            startIcon={<Send />}
          >
            Poster
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
