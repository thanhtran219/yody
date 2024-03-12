import productService from "../services/product.service.mjs";

const getAllCategory = async (req, res, next) => {
  try {
    const results = await productService.getAllCategory(req);
    res.send({ results });
  } catch (error) {
    console.error("Error executing query:", error.message);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(req);
    res.send({ products });
  } catch (error) {
    console.error("Error executing query:", error.message);
    next(error);
  }
};

const getByProductId = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(req, productId);
    if (product) {
      res.send({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error executing query:", error.message);
    next(error);
  }
};

// const getAoThunNu = async (req, res, next) => {
//   try {
//     const products = await productService.getProductByCategoryId(req, 29);
//     res.send({ products });
//   } catch (error) {
//     console.error("Error executing query:", error.message);
//     next(error);
//   }
// };

// const getPoloNam = async (req, res, next) => {
//   try {
//     const products = await productService.getProductByCategoryId(req, 34);
//     res.send({ products });
//   } catch (error) {
//     console.error("Error executing query:", error.message);
//     next(error);
//   }
// };

const getProductsByCategoryId = (categoryId) => {
  return async (req, res, next) => {
    try {
      const products = await productService.getProductByCategoryId(req, categoryId);
      res.send({ products });
    } catch (error) {
      console.error("Error executing query:", error.message);
      next(error);
    }
  };
};

const getProductsByParentCategoryId = (parenCategoryId) => {
  return async (req, res, next) => {
    try {
      const products = await productService.getProductsByParentCategoryId(req, parenCategoryId);
      res.send({ products });
    } catch (error) {
      console.error("Error executing query:", error.message);
      next(error);
    }
  };
};

const productController = {
  getAllCategory,
  getAll,
  getByProductId,
  getProductsByCategoryId,
  getProductsByParentCategoryId
};

export default productController;
