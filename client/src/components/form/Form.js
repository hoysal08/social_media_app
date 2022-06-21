import React,{useState,useEffect} from 'react'
import useStyles from './styles.js';
import {TextField,Button,Typography,Paper} from  "@material-ui/core"
import FileBase from 'react-file-base64'
import {useDispatch,useSelector} from 'react-redux'
import { createPost } from '../../actions/posts.js';
import {updatePost}from'../../actions/posts.js'
import {useHistory} from "react-router-dom"
 
function Form({currentId,setCurrentId}) {
  const [postData,setPostData]=useState({
   title:'',message:'',tags:[],selectedFile:''
  })

  const post=useSelector((state)=>(currentId? state.posts.posts.find((p)=>p._id===currentId ):null))
    const classes=useStyles();
    const dispatch=useDispatch()
    const user=JSON.parse(localStorage.getItem('profile'))
   const history=useHistory()

  useEffect(()=>{
    if(post) setPostData(post)
  },[post])


    const handleSubmit=async (e)=>{
         e.preventDefault();

          if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name},history))
          }
  else{ 

    dispatch(createPost({...postData,name:user?.result?.name},history))
  } 
  clear()
  
    }

    const clear=()=>{
      setCurrentId(null)   
            setPostData({title:'',message:'',tags:'',selectedFile:''})
    }

    if(!user?.result?.name)
    {
      return(
        <Paper className={classes.paper}>
          <Typography variant='h6' align="center">
            Please Sign In to create your own memories and like other's memories.
          </Typography>
        </Paper>
      )
    }
  return (
     <Paper className={classes.paper} elevation={6} >
          <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e)=>handleSubmit(e)} >
            <Typography variant='h6'>{ currentId? 'Editing ': 'Creating ' }a Memory</Typography>
            <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e)=>{setPostData({...postData,title:e.target.value})}} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>{setPostData({...postData,message:e.target.value})}} />
            <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})} />

            <div className={classes.fileInput} >
               <FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >clear</Button>
          </form>
     </Paper>
  )
}

export default Form  