import ProductModel from '../infra/database/models/mongoose/product.model';
import ProductRepository from '../infra/repository/product.repository';

class GetAllProducts {
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

  async execute() {
    try {
      const products = await this.productRepository.getAllProducts();
      return products;
    } catch (error) {
      throw error;
    }
  }
}

export default GetAllProducts;
