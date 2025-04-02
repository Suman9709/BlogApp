import axios from 'axios'

const API_URL = "https://blogapp-aipn.onrender.com/api/blogs"
// const API_URL = "http://localhost:5000/api/blogs"

export const signUpUser = async (name, username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name, username, password
        });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("SignUp error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'SignUp Failed');
    }
}

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });

        console.log("Login Response:", response.data);

        if (response.data && response.data.token && response.data.token.accessToken && response.data.user) {
            localStorage.setItem("token", JSON.stringify(response.data.token.accessToken));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("isAuthenticated", "true");

            // console.log("access token", response.data.token.accessToken);
            console.log("Token and user stored successfully.");
        } else {
            console.error("Missing token or user in response:", response.data);
        }

        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
    }
};


export const logoutUser = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200 || response.status === 204 && response.data.success) {
            return { success: true, message: "Logout successful" };
        } else {
            throw new Error("Unexpected logout response");
        }
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, message: "Logout failed" };
    }
};


export const createBlog = async (formData, token) => {
    try {
        const response = await axios.post(`${API_URL}/createblog`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        console.log("Blog upload success:", response.data);
        return response.data
    } catch (error) {
        console.error("Error in uploading blog", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to upload blog");
    }
};

export const allBlog = async () => {
    try {
        const response = await axios.get(`${API_URL}/allblogs`);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("error in fetching blogs", error.response?.data)
    }
};

export const personalBlog = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/myblog`, {
            headers: {
                Authorization: `Bearer ${token}`
            },


        })
        // console.log("personal blog", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error)
    }
}

export const getBlogById = async (blogId) => {
    try {
        const response = await axios.get(`${API_URL}/getBlogById/${blogId}`);
        // console.log("Full Response:", response);  
        // console.log("Fetched Blog:", response.data);  

        if (response.data && response.data.blog) {
            return response.data.blog;
        } else {
            console.error("Blog not found in response:", response.data);
            return { success: false, message: "Blog not found" };
        }
    } catch (error) {
        console.error("Error fetching blog:", error.response ? error.response.data : error.message);
        return { success: false, message: "Error fetching blog" };
    }
};


export const deleteBlog = async (blogId, token) => {

    try {
        const response = await axios.delete(`${API_URL}/deleteBlog/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to delete blog", error)
    }
}


export const editblog = async (formData, blogId, token) => {
    try {
        const response = await axios.put(`${API_URL}/updateBlog/${blogId}`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error in editing the blog", error.response?.data || error.message)
    }
}

export const handleLikes = async (blogId, token) => {
    try {
        const response = await axios.post(`${API_URL}/likes`, { blogId }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        console.log(response.data);
        return response.data


    } catch (error) {
        console.error("Error in liking the blog", error)
        return { success: false };
    }

}