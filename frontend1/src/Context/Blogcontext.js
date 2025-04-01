import React, { createContext } from "react";


const BlogContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    signUp: () => { },
    blogcreate:()=>{},
});

export default BlogContext