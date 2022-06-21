import React, { useEffect } from 'react'
import {Grid,CircularProgress} from "@material-ui/core"
import useStyles from './styles.js';
import {useSelector} from 'react-redux'
import Post from "./Post/Post"
  

function Posts({currentId,setCurrentId}) { 
     
   
 let {posts,isLoading}=useSelector((state)=>state.posts)
 const classes=useStyles();

 if(!posts.length && !isLoading) return 'No posts';
  return (

     <>
     {
   isLoading?<CircularProgress/>:(
      <Grid className={classes.container} container alignItems='stretch' spacing={4} >
         {
            posts.map((post)=>(
               <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                     <Post post={post} setCurrentId={setCurrentId}/>
                  </Grid>
            ))
         }

      </Grid>
   )}
     </>
  )
}

export default Posts