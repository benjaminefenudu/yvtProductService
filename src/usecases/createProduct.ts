import ProductModel from '../infra/database/models/mongoose/product.model';
import { ProductDocument } from '../infra/database/models/mongoose/product.model';
import ProductRepository from '../infra/repository/product.repository';

class CreateProduct {
  productModel: typeof ProductModel;
  productRepository: ProductRepository;

  constructor({
    productModel,
    productRepository,
  }: {
    productModel: typeof ProductModel;
    productRepository: ProductRepository;
  }) {
    this.productModel = productModel;
    this.productRepository = productRepository;
  }

  async execute(payload: ProductDocument) {
    try {
      const product = await this.productRepository.create(payload);
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default CreateProduct;
