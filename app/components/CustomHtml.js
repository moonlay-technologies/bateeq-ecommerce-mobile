import {View, StyleSheet, useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';

const CustomHTML = ({htmlContent, limit, blog_id}) => {
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
    const previewText = htmlContent.replace(/<[^>]+>/g, '').slice(0, limit);
    return (
      <View style={styles.container}>
        <RenderHTML
          source={{html: blog_id ? previewText : htmlContent}}
          contentWidth={windowWidth}
          renderersProps={customRenderersProps}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
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
