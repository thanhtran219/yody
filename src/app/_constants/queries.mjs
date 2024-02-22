export const queries = {
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

};
