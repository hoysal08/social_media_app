import axios from 'axios';
const API=axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})
export const fetchPost=(id)=>API.get(`/posts/${id}`);
export const fetchPosts=(page)=>API.get(`/posts?page=${page}`);
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none' }&tags=${searchQuery.tags}`);
export const createPost=(newPost)=>API.post('/posts',newPost)
export const updatePost=(id,updatePost)=>API.patch(`/posts/${id}`,updatePost)
export const deletePost=(id)=>API.delete(`/posts/${id}`)
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`,likePost)


export const signin=(formdata)=>API.post('/user/signin',formdata)
export const signup=(formdata)=>API.post('/user/signup',formdata)