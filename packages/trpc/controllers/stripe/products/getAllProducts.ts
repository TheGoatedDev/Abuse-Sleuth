import { trpc } from "../../../initTRPC";
import getSortedProducts from "../../../services/stripe/getSortedProducts";

export const getAllProductsController = trpc.procedure.query(
    async ({ input, ctx }) => {
        return await getSortedProducts();
    }
);

export default getAllProductsController;
