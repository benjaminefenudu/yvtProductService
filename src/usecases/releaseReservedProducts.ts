import ProductRepository from '../infra/repository/product.repository';

class ReleaseReservedProducts {
  productRepository: ProductRepository;
  productModel: any;
  constructor({
    productRepository,
    productModel,
  }: {
    productRepository: ProductRepository;
    productModel: any;
  }) {
    this.productRepository = productRepository;
    this.productModel = productModel;
  }

  async execute(payload: any) {
    try {
      let productReleased = false;
      const productId = payload.order.productId;
      const orderQuantity = payload.order.quantity;

      const product = await this.productModel.findById(productId);
      if (!product) {
        console.log(`product not found`);
        return productReleased;
      }

      const newQuantity = product.quantity + orderQuantity;
      product.quantity = newQuantity;
      product.save();
      console.log(`${orderQuantity} ${product.name} released back to stock`);
      productReleased = true;

      return productReleased;
    } catch (error) {
      throw error;
    }
  }
}

export default ReleaseReservedProducts;
