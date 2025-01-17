import axios from 'axios';

const url = "https://vercel.com/shriyatiwaris-projects/trip-tales/EB2PG4iNjW3jPe3615VMQ8mJAhR4/posts/";

export const getPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);