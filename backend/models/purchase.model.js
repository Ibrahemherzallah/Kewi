import mongoose from 'mongoose';

const purchaseSchema = new Schema({
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
    ref: "City",
    required: true
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
