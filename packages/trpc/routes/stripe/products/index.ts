import getAllProductsController from "../../../controllers/stripe/products/getAllProducts";
import { trpc } from "../../../initTRPC";

export const stripeProductsRouter = trpc.router({
    getAllProducts: getAllProductsController,
});

export default stripeProductsRouter;
