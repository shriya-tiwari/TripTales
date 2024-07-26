import React, { useEffect, useState } from 'react';
import { Typography, Grid, AppBar, Grow, Container, SearchIcon, IconButton, Button, Toolbar } from '@mui/material/';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';

import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import triptales from './images/triptales.jpg';

const App = () => {
  const [ currentId, setCurrentId ] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg" padding={5}>
      <CustomAppBar position="static" color="inherit">

          <img src={triptales} width="60" height="60" alt={triptales} style={{ marginLeft: '15px'}}></img>

        <Heading component="h2" variant="h3" color="inherit" noWrap>
          TripTales
        </Heading>
      </CustomAppBar>
      <Grow in>
         <Container>
           <Grid container direction={ isSmallScreen ? 'column-reverse' : 'row' } justify="space-between" alignItems="stretch" spacing={4} marginTop={1}>
             <Grid item xs={10} sm={7}>
               <Posts setCurrentId={setCurrentId}/>
             </Grid>
             <Grid item xs={10} sm={5}>
               <Form currentId={currentId} setCurrentId={setCurrentId}/>
             </Grid>
           </Grid>
         </Container>
       </Grow>
    </Container>
  )
}

const CustomAppBar = styled(AppBar)`
  border-radius: 15px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`
const Heading = styled(Typography)`
  color:  rgba(0, 183, 255, 1); 
  flex: 1; 
  text-align: center;
`

export default App;