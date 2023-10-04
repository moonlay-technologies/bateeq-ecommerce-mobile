import React from 'react';
import { View, Text } from 'react-native';

export function formatWithCommas(n) { 
    return n.toString().replace(/\B(?=(\d{3})+\b)/g, ","); 
  }

  
export const renderHTMLContent = (html) => {
  const paragraphs = html.split('</p>');

  return paragraphs.map((paragraph, index) => {

    const text = paragraph.replace(/<[^>]+>/g, '');
    
    return (
      <Text key={index}>{text}</Text>
    );
  });
};
