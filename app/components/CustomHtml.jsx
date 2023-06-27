import { View, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import DeliveryMap from '../screens/Delivery/DeliveryMap';

const CustomHTML = ({ htmlContent, limit, blog_id, dataPages }) => {
  const windowWidth = useWindowDimensions().width;
  if (htmlContent && typeof htmlContent === 'string') {
    const customRenderersProps = {
      p: {
        style: styles.paragraph,
      },
      h2: {
        style: styles.heading2,
      },
    };
    // const previewText = htmlContent.replace(/<[^>]+>/g, '').slice(0, limit);
    const paragraphEndIndex = htmlContent.indexOf('</p>') + 4;
    const previewText = htmlContent.slice(0, paragraphEndIndex);
    return (
      <View style={styles.container}>
        {dataPages?.title === 'Contact Us' && <DeliveryMap />}
        <RenderHTML
          source={{ html: blog_id ? previewText : htmlContent }}
          contentWidth={windowWidth}
          renderersProps={customRenderersProps}
          ignoredDomTags={['iframe']}
        />
      </View>
    );
  }
};

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
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CustomHTML;
