import mongoose from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true
  },
  gender: {
    type: String,
    required: false,
    enum: ['نسائي','رجالي']
  },
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
    enum: ['صغير','وسط','كبير']
  },
  customerPrice: {
    type: Double,
    required: true,
  },
  wholesalerPrice: {
    type: Double,
    required: true,
  },
  salePrice: {
    type: Double,
    required: true,
  },
  isSoldOut: {
    type: Boolean,
    required: true
  },
  isOnSale: {
    type: Boolean,
    required: true
  }

},{timestamps: true})

const Product = mongoose.model("Product", productSchema);

export default Product;