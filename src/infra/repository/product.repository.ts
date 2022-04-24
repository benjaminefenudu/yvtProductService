import ProductModel, {
  ProductDocument,
} from '../database/models/mongoose/product.model';

class ProductRepository {
  productModel: typeof ProductModel;

  constructor({ productModel }: { productModel: typeof ProductModel }) {
    this.productModel = productModel;
  }

  async create(payload: ProductDocument) {
    try {
      const product = await this.productModel.create({
        ...payload,
      });
      const savedProduct = await product.save();

      return savedProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(productId: string) {
    try {
      const product = await this.productModel.findById(productId);

      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await this.productModel.find();

      return products;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductRepository;
