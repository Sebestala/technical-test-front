/**
 * Hook for managing local storage operations with error handling and SSR support
 * @returns {Object} Storage operations
 * @returns {Function} Object.getItem - Function to retrieve data from storage
 * @returns {Function} Object.setItem - Function to save data to storage
 * @returns {Function} Object.removeItem - Function to remove data from storage
 */
export const useStorage = () => {
  /**
   * Retrieves an item from local storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Parsed value from storage or default value
   */
  const getItem = (key, defaultValue = null) => {
    if (typeof window === 'undefined') return defaultValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Erreur lors de la récupération de ${key}:`, error)
      return defaultValue
    }
  }

  /**
   * Saves an item to local storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   */
  const setItem = (key, value) => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Erreur lors de l'enregistrement de ${key}:`, error)
    }
  }

  /**
   * Removes an item from local storage
   * @param {string} key - Storage key to remove
   */
  const removeItem = (key) => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Erreur lors de la suppression de ${key}:`, error)
    }
  }

  return {
    getItem,
    setItem,
    removeItem
  }
}
