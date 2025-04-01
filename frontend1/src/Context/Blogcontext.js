import React, { createContext } from "react";


const BlogContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    blogs:[],
    login: () => { },
    logout: () => { },
    signUp: () => { },
    blogcreate:()=>{},
    getallBlogs:()=>{},
    ownBlogs:()=>{},
});

export default BlogContext