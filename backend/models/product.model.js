import mongoose from 'mongoose';
// import {Double} from "mongodb";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  id: {
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
    required: false,
    default: null  // Allow null values for optional fields

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
  numOfClicks: {
    type: Number,
    default: 0
  },
  customerPrice: {
    type: Number,
    required: true,
  },
  wholesalerPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: false,
  },
  isSoldOut: {
    type: Boolean,
    required: false,
    default: false
  },
  isOnSale: {
    type: Boolean,
    required: false,
    default: false
  }

},{timestamps: true})

const Product = mongoose.model("Product", productSchema);

export default Product;