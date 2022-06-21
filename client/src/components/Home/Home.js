import React,{useState,useEffect} from 'react'
import {Container,Grow,Grid, Paper,AppBar,TextField,Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import useStyles from './styles'
import { useHistory,useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import {getPostsBySearch} from '../../actions/posts'

import Posts from '../Posts/Posts'
import Form from '../form/Form'
import Paginate from '../Pagination/Pagination'

function useQuery()
{
  return new URLSearchParams(useLocation().search)
}

const Home = () => {

        const[currentId,setCurrentId]=useState(0)
        const classes=useStyles();
        const dispatch=useDispatch();
        const query = useQuery()
        const history=useHistory()
        const page=query.get('page')||1;
        const searchQuery=query.get('searchQuery')
        const[search,setsearch]=useState('');
        const[tags,settags]=useState([]);



       

        const searchPost=(e)=>{
        e. preventDefault();
           if(search.trim()||tags){
           dispatch(getPostsBySearch({search,tags:tags.join(',')}))
             history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`)
           }
           else
           {
            history.push('/');
           }
        }

        const handleKeyPress=(e)=>{
          if(e.keycode===13)
          {
            searchPost()
          }
        }
        const handleadd=(tag)=>{
               settags([...tags,tag]);
        }
        const handledelete=(tagtodelte)=>{
          settags(tags.filter((tag)=>tag!==tagtodelte))
        }
        
  return (
    <Grow in>
         <Container maxWidth='xl'>
          {/* className={classes.mainContainer } */}
           <Grid  className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
             <Grid item xs={12} sm={6} md={9}>
               <Posts setCurrentId={setCurrentId} />
             </Grid>

           <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
              name="search"
               variant='outlined'
               fullWidth
               value={search}
               onChange={(e)=>{setsearch(e.target.value)}}
               label="Search Memories"
               onKeyPress={handleKeyPress} />
               <ChipInput 
               style={{margin:'10px 0'}}
               value={tags}
               onAdd={handleadd}
               onDelete={handledelete}
               label="Search Tags"
               variant="outlined"
               />
          <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained'>Search</Button>
            </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {( !searchQuery && !tags.length) &&( 
                <Paper elevation={6} className={classes.pagination} >
              <Paginate page={page}/>
             </Paper>
              )}
            
           </Grid>
           </Grid>
         </Container>
       </Grow>
  )
}

export default Home