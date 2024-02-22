import express from "express";
import productController from "../app/controllers/product.controller.mjs";

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getByProductId);


export default router;