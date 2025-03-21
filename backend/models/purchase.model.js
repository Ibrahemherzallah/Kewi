import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "cityModel",
    required: true
  },
  cityModel: {
    type: String,
    required: true,
    enum: ["City", "Product"]
  },
  deliveryType: {
    type: String,
    enum: ['مستعجل','عادي']
  },
  streetAddress: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  }
},{timestamps: true})

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
