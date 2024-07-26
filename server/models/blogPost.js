import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    location : String,
    tripType: {
        type: String,
        default: 'Holiday',
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    content: String,
    tags: [String],
    featuredImage: String,   //convert an image into a string using base64
    likeCount: {
        type: Number,
        default: 0,
    }    
})

// model on which we can later perform update, delete, create functions
const BlogPost = mongoose.model("BlogPost", postSchema);

export default BlogPost;   //exporting a mongoose model 