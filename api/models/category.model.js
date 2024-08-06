import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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
    },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;