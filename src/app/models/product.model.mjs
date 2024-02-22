import { sql } from "../config/database.mjs";
import { queries } from "../_constants/queries.mjs";

const getAllCategory = async (req) => {
  const { recordset } = await req.db.request().query(queries.getCategoryList);

  if (recordset && recordset.length > 0) {
    // Check values in recordset is JSON or not
      const parsedCategories = recordset.map((category) => {
      try {
        // Parse JSON string in recordset
        return {
          ...category,
          Children: category.Children ? JSON.parse(category.Children) : null,
        };
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return category;
      }
    });

    return parsedCategories;
  } else {
    return null;
  }
};

const getAllProducts = async (req) => {
  const { recordset } = await req.db.request().query(queries.gettAllProduct);

  return recordset.length > 0 ? recordset : null;
};

const getProductById = async (req, productId) => {
    const { recordset } = await req.db
      .request()
      .input("productId", sql.Int, productId)
      .query(queries.getProductById);

    return recordset.length > 0 ? recordset[0] : null;
};

const getProductByCategoryId = async (req, categoryId) => {
  const { recordset } = await req.db
    .request()
    .input("categoryId", sql.Int, categoryId)
    .query(queries.getProductByCategoryId);

  return recordset.length > 0 ? recordset : null;
};

const getProductsByParentCategoryId = async (req, parentCategoryId) => {
  const { recordset } = await req.db
    .request()
    .input("parentCategoryId", sql.Int, parentCategoryId)
    .query(queries.getProductByParentCategoryId);

  return recordset.length > 0 ? recordset : null;
};

const productModel = {
  getAllCategory,
  getAllProducts,
  getProductById,
  getProductByCategoryId,
  getProductsByParentCategoryId

};

export default productModel;
