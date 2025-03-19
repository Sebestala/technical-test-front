import { useState } from 'react'

/**
 * Hook for managing products filtering by category
 * @param {string} initialCategory - Initial category to filter by, defaults to 'all'
 * @param {Array} initialProducts - Initial array of products to filter
 * @returns {Object} Object containing filtered products and category setter
 * @returns {Array} Object.products - Filtered products based on selected category
 * @returns {Function} Object.setCategory - Function to update the current category
 */
export function useProducts(initialCategory = 'all', initialProducts = []) {
  const [products] = useState(initialProducts)
  const [category, setCategory] = useState(initialCategory)

  const filteredProducts =
    category === 'all' ? products : products.filter((product) => product.category === category)

  return {
    products: filteredProducts,
    setCategory
  }
}
