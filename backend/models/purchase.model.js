import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
  },
  color: {
    type: String,
    required: true,
  },
  city: {
    type: String, // Changed from ObjectId to String to match your frontend
    required: true,
  },
  streetAddress: {
    type: String,
    required: false,
  },
  deliveryType: {
    type: String,
    enum: ['مستعجل', 'عادي'],
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  numOfItems: {
    type: Number,
    required: true,
  },
  productId: {
    type: String, // Product ID you are sending
    required: true,
  }
}, { timestamps: true });

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;