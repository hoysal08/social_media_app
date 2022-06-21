import * as api from '../api'
import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST } from '../constants/actionTypes.js';
//action Creators

export  const getPost=(id)=>async(dispatch)=>{
    try{ 
         dispatch({type:START_LOADING})
        const{data}=await api.fetchPost(id);
        console.log(data)
        
        dispatch({type:FETCH_POST,payload:data});
        dispatch({type:END_LOADING})

    }
    catch(err)
    {
console.log(err)
    }


}
    export  const getPosts=(page)=>async(dispatch)=>{

              try{ 
                   dispatch({type:START_LOADING})
                  const{data}=await api.fetchPosts(page);
                  console.log(data)
                  
                  dispatch({type:FETCH_ALL,payload:data});
                  dispatch({type:END_LOADING})

              }
              catch(err)
              {
 console.log(err)
              }

        
      }

      export const getPostsBySearch = (searchQuery) => async (dispatch) => {
        console.log(searchQuery)
        try {
            dispatch({type:START_LOADING})

          const { data:{data} } = await api.fetchPostsBySearch(searchQuery);
          
          dispatch({type:FETCH_BY_SEARCH,payload:data});
          dispatch({type:END_LOADING})


        } catch (error) {
          console.log(error);
        }
      }

      
export const createPost=(post,history)=>async(dispatch)=>{
    console.log("create called actions")
    try{   
        dispatch({type:START_LOADING})

             const {data}=await api.createPost(post);
             history.push(`/posts/${data._id}`)
             dispatch({type: CREATE,payload:data})
             dispatch({type:END_LOADING})

    }
    catch(err)
    {
           console.log(err)  
    }
}

export const updatePost=(id,post,history)=>async(dispatch)=>{
    try{
               const {data}=await api.updatePost(id,post)
               history.push(`/posts/${data._id}`)
               dispatch({type:UPDATE,payload:data});
    }
    catch(err)
    {
        console.log(err)  
    }
}

export const deletePost=(id)=>async(dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id})
    }
    catch(err)
    {
        console.log(err)
    }
}


export const likePost=(id)=>async(dispatch)=>{
    try{
               const {data}=await api.likePost(id)

               dispatch({type:LIKE,payload:data});
    }
    catch(err)
    {
        console.log(err)  
    }
}