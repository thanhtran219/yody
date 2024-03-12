export const productQueries = {
  getCategoryList: `WITH CategoryCTE AS (
                        SELECT
                            CategoryID,
                            CategoryName,
                            ParentCategoryID
                        FROM
                            CATEGORY
                        WHERE
                            ParentCategoryID IS NULL AND CategoryName != 'Unisex'
                        UNION ALL
                        SELECT
                            t.CategoryID,
                            t.CategoryName,
                            t.ParentCategoryID
                        FROM
                            CATEGORY t
                        INNER JOIN
                            CategoryCTE r ON t.ParentCategoryID = r.CategoryID
                    )
                    SELECT
                        c1.CategoryID,
                        c1.CategoryName,
                        JSON_QUERY((
                            SELECT
                                c2.CategoryID,
                                c2.CategoryName,
                                JSON_QUERY((
                                    SELECT
                                        c3.CategoryID,
                                        c3.CategoryName
                                    FROM
                                        CategoryCTE c3
                                    WHERE
                                        c3.ParentCategoryID = c2.CategoryID
                                    FOR JSON PATH
                                )) AS Children
                            FROM
                                CategoryCTE c2
                            WHERE
                                c2.ParentCategoryID = c1.CategoryID
                            FOR JSON PATH
                        )) AS Children
                    FROM
                        CategoryCTE c1
                    WHERE
                        c1.ParentCategoryID IS NULL;`,
  gettAllProduct: `SELECT [ProductID]
                          ,[ProductName]
                          ,[ProductCode]
                          ,[Description]
                          ,[Sex]
                          ,[InputPrice]
                          ,[SellingPrice]
                          ,[DiscountID]
                          ,[Feature]
                          ,[ProductLine]
                    FROM [YODY_V2].[dbo].[PRODUCT]`,
  getProductById: `SELECT [ProductID]
                          ,[ProductName]
                          ,[ProductCode]
                          ,[Description]
                          ,[Sex]
                          ,[InputPrice]
                          ,[SellingPrice]
                          ,[DiscountID]
                          ,[Feature]
                          ,[ProductLine]
                    FROM [YODY_V2].[dbo].[PRODUCT]
                    WHERE ProductID = @productId`,
  getProductByCategoryId: `SELECT [ProductID]
                                  ,[ProductName]
                                  ,[ProductCode]
                                  ,[Description]
                                  ,[Sex]
                                  ,[InputPrice]
                                  ,[SellingPrice]
                                  ,[DiscountID]
                                  ,[Feature]
                                  ,[ProductLine]
                            FROM [YODY_V2].[dbo].[PRODUCT]
                            WHERE CategoryID = @categoryId`,
  getProductByParentCategoryId: `SELECT [ProductID]
                                  ,[ProductName]
                                  ,[ProductCode]
                                  ,[Description]
                                  ,[Sex]
                                  ,[InputPrice]
                                  ,[SellingPrice]
                                  ,[DiscountID]
                                  ,[Feature]
                                  ,[ProductLine]
                            FROM [YODY_V2].[dbo].[PRODUCT]
                            WHERE ParentCategoryID = @parentCategoryId`,
  getProductsList: `SELECT
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
                    GROUP BY p.ProductID, ProductName, ProductCode, SellingPrice, DiscountRate;`

};
