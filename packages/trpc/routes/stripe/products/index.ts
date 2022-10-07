import getAllProductsController from "../../../controllers/stripe/products/getAllProducts";
import getProductFromTeamIdController from "../../../controllers/stripe/products/getProductFromTeamId";
import { trpc } from "../../../initTRPC";

export const stripeProductsRouter = trpc.router({
    getAllProducts: getAllProductsController,

    getProductFromTeamId: getProductFromTeamIdController,
});

export default stripeProductsRouter;
