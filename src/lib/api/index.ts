/// <reference types="../../vite-env.d.ts" />
import { INewPost, INewUser, IUpdatePost, IUser } from "@/types";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/register`,
      JSON.stringify(user),
      {
        headers: {
          apiKey: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/login`,
      JSON.stringify(user),
      {
        headers: {
          apiKey: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const session = response.data;

    localStorage.setItem("token", session.token);

    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER

export async function getCurrentUser(): Promise<IUser | null | undefined> {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw Error;
    const currentAccount = await axios.get(`${BASE_URL}/api/v1/user`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!currentAccount) throw Error;

    return currentAccount.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    localStorage.removeItem("token");
    const session = await axios.post(`${BASE_URL}/api/v1/logout`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
export async function getRecentPosts() {
  try {
    const posts = await axios.get(`${BASE_URL}/api/v1/explore-post?size=10&page=1`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!posts) throw Error;

    return posts.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {


  try {
    const posts = await axios.get(`${BASE_URL}/api/v1/explore-post?size=6`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        page: pageParam,
      },
    });

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId?: string) {
  if (!postId) throw Error("required postId");

  try {
    const post = await axios.get(`${BASE_URL}/api/v1/post/${postId}`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}


export async function getUserPosts(userId?: string) {
  if (!userId) return;

  try {
    const post = await axios.get(`${BASE_URL}/api/v1/users-post/${userId}?size=10&page=1`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });


    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}


// ============================== CREATE POST
export async function createPost(post: INewPost) {
  try {

    const uploadedFile = await uploadFile(post.file[0]);
    if(!uploadFile) throw Error("upload file failed");
    
    const newDataPost = {
      caption: post.caption,
      imageUrl : uploadedFile?.data.url
    }
    const newPost = await axios.post(`${BASE_URL}/api/v1/create-post`, newDataPost , {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!newPost) throw Error;

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const uploadedFile = await axios.post(`${BASE_URL}/api/v1/upload-image`, formData, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (!uploadedFile) throw Error;

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    

    const uploadedFile = hasFileToUpdate ? await uploadFile(post.file[0]) : null;
    const newDataPost = {
      caption: post.caption,
      imageUrl: uploadedFile?.data.url || post.imageUrl,
    };
    const updatedPost = await axios.post(`${BASE_URL}/api/v1/update-post/${post.postId}`, newDataPost, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return updatedPost ;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await axios.get(`${BASE_URL}/api/v1/user/${userId}`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}


export async function getPostsByUserId(userId: string) {
  try {
    const posts = await axios.get(`${BASE_URL}/api/v1/users-post/${userId}?size=10&page=1`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });


    if (!posts) throw Error;

    return posts.data;
  } catch (error) {
    console.log(error);
  }
}


export async function updateUser(user: any) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    const userData = {
      name: user.name,
      username: user.username,
      email: user.email,
      profilePictureUrl: hasFileToUpdate ? (await uploadFile(user.file[0]))?.data.url : user.profilePictureUrl,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      website: ""
    };
    const updatedUser = await axios.post(`${BASE_URL}/api/v1/update-profile`, userData, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function likePost(postId: string) {
  try {
    const updatedPost = await axios.post(`${BASE_URL}/api/v1/like`, { postId }, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function unlikePost(postId: string) {
  try {
    const updatedPost = await axios.post(`${BASE_URL}/api/v1/unlike`, { postId }, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getMyFollowing() {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/my-following?size=10&page=1`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });


    if (!response.data) throw Error;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export async function followUser(userId: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/follow`,
      { userIdFollow: userId },
      {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.data) throw Error;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function unfollowUser(userId: string) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/unfollow/${userId}`,
      {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.data) throw Error;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createComment(postId: string, comment: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/create-comment`,
      { postId, comment },
      {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.data) throw Error;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/delete-comment/${commentId}`,
      {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.data) throw Error;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
