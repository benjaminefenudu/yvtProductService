import ProductModel from '../infra/database/models/mongoose/product.model';
import ProductRepository from '../infra/repository/product.repository';

class GetProduct {
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

  async execute(productId: string) {
    try {
      const product = await this.productRepository.getProduct(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default GetProduct;
