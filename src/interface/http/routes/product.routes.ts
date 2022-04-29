import { Request, Response, Router } from 'express';

import container from '../../../../di-setup';
const { productController } = container.cradle;

const ProductRouter = Router();

ProductRouter.post('/', (req: Request, res: Response) =>
  productController.create(req, res)
);
ProductRouter.get('/', (req: Request, res: Response) =>
  productController.getProducts(req, res)
);
ProductRouter.get('/:id', (req: Request, res: Response) =>
  productController.getProductById(req, res)
);
ProductRouter.post('/available', (req: Request, res: Response) =>
  productController.checkProductsAvailable(req, res)
);
ProductRouter.post('/release', (req: Request, res: Response) =>
  productController.releaseProducts(req, res)
);

export default ProductRouter;
