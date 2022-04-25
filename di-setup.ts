import {
  asValue,
  Lifetime,
  asClass,
  asFunction,
  InjectionMode,
  createContainer,
} from 'awilix';
import database from './src/infra/database/mongoose';
import Messenger from './src/utils/messenger.utils';
import ProductModel from './src/infra/database/models/mongoose/product.model';
import ProductRepository from './src/infra/repository/product.repository';
import ProductController from './src/interface/http/controllers/product.controller';
import CreateProduct from './src/usecases/createProduct';
import GetProduct from './src/usecases/getProduct';
import GetAllProducts from './src/usecases/getAllProducts';
import GetProductsAvailable from './src/usecases/getProductsAvailable';

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  database: asValue(database),
  messenger: asClass(Messenger, { lifetime: Lifetime.SINGLETON }),
  productModel: asValue(ProductModel),
  productRepository: asClass(ProductRepository),
  productController: asClass(ProductController),
  createProduct: asClass(CreateProduct),
  getProduct: asClass(GetProduct),
  getAllProducts: asClass(GetAllProducts),
  getProductsAvailable: asClass(GetProductsAvailable),
});

export default container;
