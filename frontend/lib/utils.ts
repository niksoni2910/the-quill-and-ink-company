/**
 * Utility functions for the frontend application.
 */

/**
 * Calculates a stable, deterministic discount for a product based on its ID.
 * Returns the discounted rate (5, 10, 15, or 20) and the original calculated price.
 * The current price in the database is treated as the generic 'sale price'.
 * 
 * @param productId The unique ID of the product
 * @param currentSalePrice The current price from the database
 * @returns Object containing originalPrice and discountPercentage
 */
export function getProductPricing(productId: string | number, currentSalePrice: number | string) {
  const salePrice = Number(currentSalePrice) || 0;
  
  if (!productId || salePrice <= 0) {
    return {
      originalPrice: salePrice,
      discountPercentage: 0,
      salePrice
    };
  }

  // Convert ID to string to reliably sum character codes
  const idStr = String(productId);
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash += idStr.charCodeAt(i);
  }

  // Available discount tiers: 5%, 10%, 15%, 20%
  const tiers = [5, 10, 15, 20];
  const discountPercentage = tiers[hash % tiers.length];

  // Calculate original price: SalePrice = OriginalPrice * (1 - Discount/100)
  // Therefore: OriginalPrice = SalePrice / (1 - Discount/100)
  const originalPrice = Math.round(salePrice / (1 - discountPercentage / 100));

  return {
    originalPrice,
    discountPercentage,
    salePrice
  };
}
