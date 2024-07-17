import { Router } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { logger } from "../config/logger.config";
import { productRouter } from "./modules/product/product.route";
import { orderRouter } from "./modules/order/order.route";

const router = Router();

router.use((req, res, next) => {
  logger.info(
    `${process.env.ENV} - ${new Date()} - ${req.method.toUpperCase()} ${req.originalUrl}`,
  );
  next();
});

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);

export const v1Routes = router;
