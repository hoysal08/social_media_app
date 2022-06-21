import React,{useState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from "./styles"
import Input from'./input'
import {GoogleLogin} from 'react-google-login'
import Icon from "./icon"
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {signin,signup} from '../../actions/auth'

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const classes=useStyles();
    const history=useHistory();
    const [showPassword,setShowpassword]=useState(false)

    const [isSignup,setisSignup]=useState(false);
    const [formdata,setformdata]=useState(initialState)
  const handleShowPassword=()=>{
     setShowpassword(!showPassword)

 }
 const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault()
       
        if(isSignup)
        {
           dispatch(signup(formdata,history))
        }
        else
        {
            dispatch(signin(formdata,history))

        }

    
    }
    const handleChange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }
    const switchMode=()=>{
        setisSignup((previssignup)=> !previssignup)
        setShowpassword(false)

    }
   const  googleSuccess= async (res)=>{
    const result=res?.profileObj;
    const token=res?.tokenId;

    try{
              
        dispatch({type:'AUTH',data:{result,token}})

        history.push('/')
    }
    catch(error)
    {
        console.log(error)
    }
         
   }
   const  googleError=(err)=>{
        console.log(err)
        console.log("Google Sign In was unsuccessful.Try again Later");
             }

  return (
     <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation={3}>
             <Avatar className={classes.avatar}>
                 <LockOutlinedIcon/>
             </Avatar>
             <Typography variant="h5">{isSignup?"Sign Up":"Sign In"} </Typography>
             <form className={classes.form} onSubmit={handleSubmit}>
                 <Grid container spacing={2}>
                     {
                         isSignup && (
                             <> 
                             
                             <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                             <Input name="lastName" label="Last Name" handleChange={handleChange}  half/>

                             </>
                         )
                     }
                     <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                     <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" :"password"} handleShowPassword={handleShowPassword} />
                     {
                         isSignup &&     <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                     }
                 </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                     {
                         isSignup ? "Sign Up" : "Sign In"
                     }
                 </Button>
                 <GoogleLogin 
                    clientId="242528005074-mjtfjqhebfu92kl1qakqlar4lmolc4l8.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" >
                            Google Sign-In
                        </Button> 
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                 />

                
                 <Grid container justifyContent="flex-end">
                 <Button onClick={switchMode}>
                     {
                         isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up"
                     }
                 </Button>

                 </Grid>
             </form>
         </Paper>
     </Container>
  )
}

export default Auth