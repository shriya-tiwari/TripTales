import React from 'react';
import styled from 'styled-components';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material/';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {

  const dispatch = useDispatch();

  return (
    <CardContainer>
      <CardMediaContainer image={post.featuredImage} title={post.title}></CardMediaContainer>
      <Overlay>
        <Typography variant="h6">{ post.author }</Typography>
        <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
      </Overlay>
      <Overlay2>
        <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default"></MoreHorizIcon>
        </Button>
      </Overlay2>
      <Details>
        <Typography variant="body2" color="textSecondary">{ post.tags.map((tag) => `#${tag} `) }</Typography>
      </Details>   
      <Typography variant="h5" padding={2}>{ post.title }</Typography>   
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{ post.content }</Typography>
      </CardContent>
      <CardActionsContainer>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>
          &nbsp; Like &nbsp;
          { post.likeCount }
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" ></DeleteIcon>
          &nbsp; Delete
        </Button>
      </CardActionsContainer>
    </CardContainer>
  )
};

const CardMediaContainer = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`

const Border = styled.div`
  border: solid;
`

const FullHeightCard = styled.div`
  height: 100%;
`

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  height: 100%;
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`

const Overlay2 = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
`

const Grid = styled.div`
  display: flex;
`

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 14px;
`

const CardActionsContainer = styled(CardActions)`
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: space-between;
`

export default Post;