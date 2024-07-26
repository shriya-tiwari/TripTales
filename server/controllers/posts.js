import BlogPost from '../models/blogPost.js';
import mongoose from 'mongoose';

// Route handlers logic implemented here, for '/posts/' route
export const getPosts = async (req, res) => {
    try{
        const blogPosts = await BlogPost.find();
        console.log(blogPosts);
        res.status(200).json(blogPosts);
    } catch (error) {

        //  the server cannot find the resource requested by the client.
        res.status(404).json({ messsage : error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;   //request body which will contain the post content
    const newBlog = new BlogPost(post);   //creating a new post
    
    try{
        await newBlog.save();

        // Indicates successful creation of a resource.
        res.status(201).json(newBlog)
    } catch (error) {
        // Indicates a conflict with the current state of the server that prevents the request from being fulfilled
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post =  req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id exists");

    const updatedPost = await BlogPost.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id exists");

    await BlogPost.findByIdAndDelete(id);

    console.log('DELETE');

    res.json({ message: "Post deleted successfully" });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id exists");

    const post = await BlogPost.findById(id);
    const updatedPost = await BlogPost.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}