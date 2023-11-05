import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name'],
        trim: true,
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'A product must have a description']
    }
})

productSchema.index({ slug: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
