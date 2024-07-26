import React from 'react';
import Post from './Post/Post.js';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material/';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  return (
    !posts.length ? <CircularProgress /> : (
      <GridContainer container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
             <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </GridContainer>
    )
  )
}

const GridContainer = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ActionDiv = styled.div`
  text-align: center;
`;

export default Posts;