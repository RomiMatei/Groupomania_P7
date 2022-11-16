import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
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
  const { handleSubmit } = useForm();
  const user = JSON.parse(localStorage.getItem('user'));
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(undefined);
  const [postImagePreview, setPostImagePreview] = useState(undefined);
  const [postAuthor, setPostAuthor] = useState(user.id);


  // Add form onSubmit handler:
  function handleReset() {
    setPostContent('');
    setPostImage('');
    setPostImagePreview('');
    setPostAuthor('');
  }

  const selectFile = (event) => {
    console.log('test')
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
            multiline
            rows={3}
            variant="standard"
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            startIcon={<InsertPhoto />}
          >
            Image
            <Input
              name="image"
              hidden
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={selectFile}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            startIcon={<Send />}
          >
            Poster
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
