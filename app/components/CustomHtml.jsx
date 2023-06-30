import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import DeliveryMap from '../screens/Delivery/DeliveryMap';
import { COLORS } from '../constants/theme';

function CustomHTML({ htmlContent, limit, blog_id, dataPages }) {
  const windowWidth = useWindowDimensions().width;

  if (htmlContent && typeof htmlContent === 'string') {
    const customRenderersProps = {
      p: {
        ...styles.paragraph,
      },
      h2: {
        ...styles.heading2,
      },
    };

    const paragraphEndIndex = htmlContent.indexOf('</p>') + 4;
    const previewText = htmlContent.slice(0, paragraphEndIndex);

    return (
      <View style={styles.container}>
        {dataPages?.title === 'Contact Us' && <DeliveryMap />}
        <RenderHTML
          source={{ html: blog_id ? previewText : htmlContent }}
          contentWidth={windowWidth}
          tagsStyles={customRenderersProps}
          // renderersProps={customRenderersProps}
          ignoredDomTags={['iframe']}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: -10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: COLORS.title,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.title,
  },
});

export default CustomHTML;
