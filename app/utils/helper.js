/* eslint-disable no-restricted-syntax */
import React from 'react';
import { View, Text } from 'react-native';

export function formatWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
}

export const renderHTMLContent = html => {
  const paragraphs = html.split('</p>');

  return paragraphs.map((paragraph, index) => {
    const text = paragraph.replace(/<[^>]+>/g, '');

    // eslint-disable-next-line react/jsx-filename-extension
    return <Text key={index}>{text}</Text>;
  });
};

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
      for (const k of key) {
        value = value[k];
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
