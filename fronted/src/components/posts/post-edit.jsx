import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { postEdit } from '../../features/posts/posts.actions';

import {
  Button,
  IconButton,
  CardMedia,
  TextField,
  Input,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { InsertPhoto, Send, Edit } from '@mui/icons-material';

export { EditPost };

function EditPost(props) {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const [postContent, setPostContent] = useState(props.postId.content);
  const [postImage, setPostImage] = useState(undefined);
  const [postImagePreview, setPostImagePreview] = useState(props.postId.image);
  const [editOpen, setEditOpen] = useState(false);

  // Open Modal edit post
  const handleClickEditOpen = () => {
    setEditOpen(true);
  };

  const selectEditFile = (event) => {
    console.log('test')
    setPostImage(event.target.files[0]);
    setPostImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const onChangeEditContent = (event) => {
    setPostContent(event.target.value);
  };

  // Close modal edit
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const onFormEditSubmit = () => {
    const formData = new FormData();
    formData.append('id', props.postId.id);
    formData.append('content', postContent);
    formData.append('image', postImage);

    dispatch(postEdit(formData));
    handleEditClose();
  };

  return (
    <Fragment>
      <IconButton aria-label="Edit post" onClick={handleClickEditOpen}>
        <Edit />
      </IconButton>
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Editer le Post</DialogTitle>
        <Box component={'form'} onSubmit={handleSubmit(onFormEditSubmit)}>
          <DialogContent>
            <Box sx={{ mb: 5 }}>
              {postImagePreview && (
                <CardMedia
                  component="img"
                  height="240"
                  image={postImagePreview}
                  alt="green iguana"
                />
              )}
              <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ mt: 2 }}
                startIcon={<InsertPhoto />}
              >
                Nouvel image
                <Input
                  // id="image"
                  name="image"
                  hidden
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  onChange={selectEditFile}
                  // {...register('image')}
                />
              </Button>
            </Box>
            <TextField
              onChange={onChangeEditContent}
              onBlur={onChangeEditContent}
              name="content"
              label="Message"
              value={postContent}
              fullWidth
              required
              multiline
              rows={3}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<Send />}
            >
              Modifier
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Fragment>
  );
}
