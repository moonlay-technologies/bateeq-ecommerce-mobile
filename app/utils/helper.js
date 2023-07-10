/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Text } from 'react-native';

export function formatWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
}

export const renderHTMLContent = html => {
  const paragraphs = html.split('</p>');

  return paragraphs.map(paragraph => {
    const text = paragraph.replace(/<[^>]+>/g, '');

    // eslint-disable-next-line react/jsx-filename-extension
    return <Text key={paragraph}>{text}</Text>;
  });
};

export function priceToPercent(price, compare){
  let newPrice = Number(price ?? 0)
  let newCompare = Number(compare ?? 0)
  return ((newCompare - price ) / newCompare) * 100
}

/**
 * @param {object} data
 * @param {string|Array} key
 * @returns {null}
 */
export const findKey = (data, key) => {
  if (data && typeof data !== 'object') return null;
  if (typeof data === 'object') {
    if (Array.isArray(key) && key.length > 0) {
      let value = data;
      if (data) {
        for (const k of key) {
          value = value[k];
        }
      }

      return value;
    }
    if (typeof key === 'string') {
      if (typeof data[key] !== 'undefined') return data[key];
      return null;
    }
  }
  return null;
};

export const findVariantIdByOptions = (product, options) => {
  const { size, color } = options;

  const matchingVariant = product.find(variant => {
    let selectedSize;
    let selectedColor;
    if (size) {
      selectedSize = variant.node.selectedOptions.find(option => option.name.toLowerCase() === 'size');
    }
    if (color) {
      selectedColor = variant.node.selectedOptions.find(option => option.name.toLowerCase() === 'color');
    }
    const colorMatches = color ? selectedColor?.value === color : true;

    return selectedSize?.value === size && colorMatches;
  });
  if (matchingVariant) {
    return matchingVariant.node.id;
  }
  return null;
};

export function getSrcInTag(html) {
  return html;
}

export function getIframeHtml(html) {
  try {
    return html;
  } catch (err) {
    return null;
  }
}

export function clearTagHtml(html) {
  // let patternIframe = /<iframe.*?<\/iframe>/
  try {
    const tagHtml = [];

    // let clearHtml = html.replace(/\n/g,' ')
    // let pattern = /<.*?[^>]+>[^<]*<\/[^>]+>/
    // tagHtml = clearHtml.match(pattern)
    //
    // tagHtml = tagHtml.map((item)=> {
    //   if(Array.isArray(getIframeHtml(item)) && getIframeHtml(item).length > 0){
    //     return getIframeHtml(item)[0]
    //   }
    //   return item
    // }).join(' ')

    return {
      __tag: tagHtml ?? [],
      __html: html,
      // patternIframe
    };
  } catch (err) {
    return {
      __tag: [],
      __html: html,
      // patternIframe
    };
  }
}
