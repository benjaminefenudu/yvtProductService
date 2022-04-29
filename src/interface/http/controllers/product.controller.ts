import { Request, Response } from 'express';
import CreateProduct from '../../../usecases/createProduct';
import GetAllProducts from '../../../usecases/getAllProducts';
import GetProduct from '../../../usecases/getProduct';
import GetProductsAvailable from '../../../usecases/getProductsAvailable';
import ReleaseReservedProducts from '../../../usecases/releaseReservedProducts';

class ProductController {
  createProduct: CreateProduct;
  getAllProducts: GetAllProducts;
  getProduct: GetProduct;
  getProductsAvailable: GetProductsAvailable;
  releaseReservedProducts: ReleaseReservedProducts;

  constructor({
    createProduct,
    getAllProducts,
    getProduct,
    getProductsAvailable,
    releaseReservedProducts,
  }: {
    createProduct: CreateProduct;
    getAllProducts: GetAllProducts;
    getProduct: GetProduct;
    getProductsAvailable: GetProductsAvailable;
    releaseReservedProducts: ReleaseReservedProducts;
  }) {
    this.createProduct = createProduct;
    this.getAllProducts = getAllProducts;
    this.getProduct = getProduct;
    this.getProductsAvailable = getProductsAvailable;
    this.releaseReservedProducts = releaseReservedProducts;
  }

  // CREATE
  async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const product = await this.createProduct.execute(payload);

      res.status(201).json({
        success: true,
        msg: `Product successfully created`,
        data: product,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }

  // GET ALL PRODUCTS
  async getProducts(req: Request, res: Response) {
    try {
      const products = await this.getAllProducts.execute();

      res.status(200).json({
        success: true,
        msg: `All products`,
        data: products,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }

  // GET PRODUCT BY ID
  async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const product = await this.getProduct.execute(productId);

      res.status(201).json({
        success: true,
        msg: `Product found`,
        product: product,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }

  // CHECK PRODUCTS' AVAILABILITY
  async checkProductsAvailable(req: Request, res: Response) {
    try {
      const payload = req.body;

      const productAvailable = await this.getProductsAvailable.execute(payload);
      if (productAvailable) {
        const { productId } = payload;
        const product = await this.getProduct.execute(productId);
        const price = product?.price;
        return res.status(200).json({
          productAvailable: productAvailable,
          price: price,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw error;
      }
      throw error;
    }
  }

  // RELEASE RESERVED PRODUCTS
  async releaseProducts(req: Request, res: Response) {
    try {
      const payload = req.body;

      const productReleased = await this.releaseReservedProducts.execute(
        payload
      );
      if (productReleased) {
        return res.status(200).json({
          productReleased,
        });
      } else {
        return res.status(400).json({
          productReleased,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, msg: `${error.message}` });
        throw error;
      }
      throw error;
    }
  }
}

export default ProductController;
