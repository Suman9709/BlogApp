import React, { useState, useEffect } from "react";

import BlogContext from "./Blogcontext";
import { createBlog, loginUser, logoutUser, signUpUser, } from "../Services/Api";

const BlogContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)

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
        try {
          const response = await logoutUser(); // Call API logout
      
          if (response.success) {
            // Clear the client-side state and localStorage
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
      
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
      
            console.log("Logout successful!");
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


    const value = {
        user,
        token,
        isAuthenticated,
        login,
        signUp,
        logout,
        blogcreate
    };
    return (
        <BlogContext.Provider value={value} >
            {children}
        </BlogContext.Provider>
    )
}


export default BlogContextProvider