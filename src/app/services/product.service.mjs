import { sql } from "../config/database.mjs";
import { productQueries } from "../constants/product.queries.mjs";

const getAllCategory = async (req) => {
  const { recordset } = await req.db.request().query(productQueries.getCategoryList);

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
  try {
    const getAllProduct = `
      SELECT
        p.ProductID,
        ProductName,
        ProductCode,
        SellingPrice,
        DiscountRate,
        JSON_QUERY((
          SELECT
            pc.ProductColorID,
            c.ColorID,
            JSON_QUERY((
              SELECT
                pimg.ImageID,
                pimg.URL
              FROM
                PRODUCT_IMAGE pimg
              WHERE
                pimg.ProductColorID = pc.ProductColorID
              FOR JSON PATH
            )) AS Images
          FROM PRODUCT_COLOR pc
            JOIN COLOR c ON pc.ColorID = c.ColorID
          WHERE p.ProductID = pc.ProductID
          FOR JSON PATH
        )) AS Children
      FROM CATEGORY c
        LEFT JOIN PRODUCT p ON c.CategoryID = p.CategoryID
        LEFT JOIN PRODUCT_COLOR pc ON p.ProductID = pc.ProductID
        LEFT JOIN COLOR co ON pc.ColorID = co.ColorID
      LEFT JOIN DISCOUNT d ON p.DiscountID = d.DiscountID 
      WHERE p.ProductID IS NOT NULL AND pc.ProductColorID IS NOT NULL
      GROUP BY p.ProductID, ProductName, ProductCode, SellingPrice, DiscountRate`;

    const { recordset } = await req.db.request().query(getAllProduct);

    if (recordset && recordset.length > 0) {
      const parsedCategories = recordset.map((category) => {
        try {
          console.log("Original Category:", category);
          console.log("Children String:", category.Children);

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

      console.log("Parsed Categories:", parsedCategories);
      return parsedCategories;
    } else {
      console.log("No records found");
      return null;
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // You might want to handle or log this error appropriately in your application
  }
};


// const getAllProducts = async (req) => {
//   const { recordset } = await req.db.request().query(productQueries.getProductsList);

//   return recordset.length > 0 ? recordset : null;
// };

const getProductById = async (req, productId) => {
    const { recordset } = await req.db
      .request()
      .input("productId", sql.Int, productId)
      .query(productQueries.getProductById);

    return recordset.length > 0 ? recordset[0] : null;
};

const getProductByCategoryId = async (req, categoryId) => {
  const { recordset } = await req.db
    .request()
    .input("categoryId", sql.Int, categoryId)
    .query(productQueries.getProductByCategoryId);

  return recordset.length > 0 ? recordset : null;
};

const getProductsByParentCategoryId = async (req, parentCategoryId) => {
  const { recordset } = await req.db
    .request()
    .input("parentCategoryId", sql.Int, parentCategoryId)
    .query(productQueries.getProductByParentCategoryId);

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
