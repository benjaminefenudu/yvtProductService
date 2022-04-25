import ProductRepository from '../infra/repository/product.repository';

class GetProductsAvailable {
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
      let productAvailable = false;
      const productId = payload.order.productId;
      const orderQuantity = payload.order.quantity;

      const product = await this.productModel.findById(productId);
      if (!product) return console.log(`product not found`);

      if (orderQuantity > product.quantity || orderQuantity <= 0) {
        console.log(`${product.name} is out of stock`);
        productAvailable = false;
      } else {
        console.log(`${orderQuantity} ${product.name} reserved`);
        productAvailable = true;
        const newQuantity = product.quantity - orderQuantity;
        product.quantity = newQuantity;
        product.sold = orderQuantity;

        product.save();
      }

      return productAvailable;
    } catch (error) {
      throw error;
    }
  }
}

export default GetProductsAvailable;
