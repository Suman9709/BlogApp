import React, { useState, useEffect } from "react";

import BlogContext from "./Blogcontext";
import { allBlog, createBlog, deleteBlog, editblog, loginUser, logoutUser, personalBlog, signUpUser, } from "../Services/Api";

const BlogContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const signUp = async (name, username, password) => {

        try {
            const response = await signUpUser(name, username, password);
            console.log("signup response: ", response);

            if (response) {

                alert("SignUp successfully! Please login")
                return response
            }

        } catch (error) {
            console.error("SignUp failed:", error);
            throw new Error("SignUp failed");
        }
    }

    const login = async (username, password) => {
        try {
            const response = await loginUser(username, password);
            console.log("Login response:", response);

            if (response.token && response.token.accessToken && response.user) {
                setToken(response.token.accessToken);
                setUser(response.user);
                setIsAuthenticated(true);
            } else {
                console.error("Invalid response structure:", response);
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    };

   
    const logout = async () => {
        const token = localStorage.getItem("token");
        console.log("Token before logout:", token);
    
        if (!token) {
            console.warn("No valid token found, clearing storage anyway.");
            
            // Clear storage even if no token exists
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
    
            return { success: true, message: "No active session" };
        }
    
        try {
            const response = await logoutUser(token);
    
            // Clear the client-side state and localStorage
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
    
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
    
            if (response.success) {
                console.log("Logout successful!");
                navigate("/login"); 
                return { success: true, message: "Logout successful" };
            } else {
                console.error("Logout failed:", response.message);
                return { success: false, message: response.message };
            }
        } catch (error) {
            console.error("Logout error:", error);
            return { success: false, message: error.message || "Logout failed" };
        }
    };
    
    const blogcreate = async (formData) => {
        const token = JSON.parse(localStorage.getItem("token"))
        if (!token) {
            console.log("no token found")
            return
        }

        try {
            const response = await createBlog(formData, token)

            if (response.success) {
                alert("Blog uploaded successfully from context")
            }
        } catch (error) {
            console.error("Fail to uplaod blog", error)
            alert("Failed to oplaod blog", error)
        }
    }

    const getallBlogs = async () => {

        try {
            const response = await allBlog()

            if (response) {
                setBlogs(response)
            }
            else {
                console.error("Error in displaing blogs")
            }
        } catch (error) {

        }
    }

    const ownBlogs = async () => {

        const token = JSON.parse(localStorage.getItem("token"))
        if (!token) {
            console.log("No token found")
            return
        }
        try {
            const response = await personalBlog(token);
            if (response && response.blogs) {
                setBlogs(response.blogs);
            } else {
                console.error("No blogs data found in response", response);
                setBlogs([]); // or handle accordingly
            }
        } catch (error) {
            console.error("failed to fetch blogs", error)
        }
    }

    const removeBlog = async (blogId) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            console.log('No token found');
            return;
        }

        try {
            const response = await deleteBlog(blogId, token);

            if (response && response.success) {
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
            }
        } catch (error) {

            console.error('Error while deleting blog', error);
        }
    };

    const editBlog = async (blogId, updatedData) => {
        const token = JSON.parse(localStorage.getItem("token")); // Get token from local storage
        if (!token) {
            console.log("No token found");
            return;
        }

        try {
            const response = await editblog(updatedData, blogId, token);
            if (response && response.success) {
                alert("Blog updated successfully!");

                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog._id === blogId ? { ...blog, ...updatedData } : blog
                    )
                );
            } else {
                console.error("Failed to update blog:", response?.message);
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            alert("Failed to update blog");
        }
    };

    const value = {
        user,
        token,
        isAuthenticated,
        blogs,
        login,
        signUp,
        logout,
        blogcreate,
        getallBlogs,
        ownBlogs,
        removeBlog,
        editBlog,
    };
    return (
        <BlogContext.Provider value={value} >
            {children}
        </BlogContext.Provider>
    )
}


export default BlogContextProvider