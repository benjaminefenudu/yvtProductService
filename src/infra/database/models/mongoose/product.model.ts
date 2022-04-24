import mongoose from 'mongoose';

export interface ProductDetails {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface ProductDocument extends ProductDetails, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
