import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    category:{
      type:String,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    height: {
      type: String,
    },
    gender: {
      type: String,
    },
    ability: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    faname: {
      type: String,
    },
    hp: {
      type: String,
    },
    speed: {
      type: String,
    },
    attack: {
      type: String,
    },
    defense: {
      type: String,
    },

  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;