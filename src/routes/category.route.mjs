import express from "express";
import productController from "../app/controllers/product.controller.mjs";

const router = express.Router();

router.get('/', productController.getAllCategory);
router.get('/ao-nu', productController.getProductsByParentCategoryId(5));
router.get('/ao-thun-nu', productController.getProductsByCategoryId(29));
router.get('/polo-nu', productController.getProductsByCategoryId(33));
router.get('/ao-thun-nam', productController.getProductsByCategoryId(30));
router.get('/polo-nam', productController.getProductsByCategoryId(34));


export default router;