import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material/';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import styled from '@emotion/styled';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({  title: '', author: '', location: '', tripType: '', content: '', tags: '', featuredImage: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null);
    const theme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({  title: '', author: '', location: '', tripType: '', content: '', tags: '', featuredImage: ''});
    }

    return (
        <RootContainer theme={theme}>
        <PaperContainer theme={theme}>
            <FormContainer autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant='h6'>{ currentId ? 'Editing' : 'Creating' } a Memory</Typography>
                <TextField name="title" variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/> 
                <TextField name="author" variant='outlined' label="Author" fullWidth value={postData.author} onChange={(e) => setPostData({ ...postData, author: e.target.value })}/> 
                <TextField name="location" variant='outlined' label="Location" fullWidth value={postData.location} onChange={(e) => setPostData({ ...postData, location: e.target.value })}/> 
                <TextField name="tripType" variant='outlined' label="Trip Type" fullWidth value={postData.tripType} onChange={(e) => setPostData({ ...postData, tripType: e.target.value })}/> 
                <TextField name="content" variant='outlined' label="Content" fullWidth value={postData.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })}/> 
                <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/> 
                <FileInput> 
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, featuredImage: base64 })}/>
                </FileInput>
                <SubmitButton theme={theme} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</SubmitButton>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </FormContainer>
        </PaperContainer>
        </RootContainer>
    )
};
  
const RootContainer = styled.div`
    & .MuiTextField-root: {
      margin: ${props => props.theme.spacing(1)}px;
    }
`

const PaperContainer = styled(Paper)`
    padding: ${props  => props.theme.spacing(2)}px;
`
  
const FormContainer = styled.form`
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`
  
const FileInput = styled.div`
    width: 97%;
    margin: 10px 0;
`
  
const SubmitButton = styled(Button)`
    marginBottom: 10;
`

export default Form;