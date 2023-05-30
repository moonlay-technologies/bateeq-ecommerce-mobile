export const findVariantIdByOptions = (product, options) => {
    const { size, color } = options;
  
    const matchingVariant = product.variant.find(variant => {
      const selectedSize = variant.node.selectedOptions.find(option => option.name === 'Size');
      const selectedColor = variant.node.selectedOptions.find(option => option.name === 'Color');
      
      return selectedSize.value === size && selectedColor.value === color;
    });
  
    if (matchingVariant) {
      return matchingVariant.node.id;
    }
  
    return null;
  }