export const findVariantIdByOptions = (product, options) => {
    const { size, color } = options;
    const matchingVariant = product.find(variant => {
    
      const selectedSize = variant.node.selectedOptions.find(option => option.name === 'Size');
      const selectedColor = variant.node.selectedOptions.find(option => option.name === 'Color');
      const colorMatches = color ? selectedColor?.value === color : true;
      return selectedSize.value === size && colorMatches;
    });
    if (matchingVariant) {
      return matchingVariant.node.id;
    }
  
    return null;
  }