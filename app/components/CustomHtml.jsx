import { View, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';
import LoadingScreen from "./LoadingView";
import React from "react";

const renderers = {
  iframe: IframeRenderer
}

const customHTMLElementModels = {
  iframe: iframeModel
}

function provideEmbeddedHeaders(uri, tagName) {
  console.log({uri,tagName})
  if (tagName === "iframe") {
    // Pass an authorization header to all iframes in protected-domain.com
    return {
      Authorization: "AIzaSyCyRAbemvjs7zuMDs0mQugP9xPnE3p1ziU"
    }
  }
}
/**
 *
 * @param htmlContent
 * @param limit
 * @param blog_id
 * @param {object} props
 * @param {object} props.htmlStyle
 * @returns {JSX.Element}
 * @constructor
 */
const CustomHTML = ({ htmlContent, limit, blog_id, ...props }) => {
  const screen = useWindowDimensions();
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

    const contentStyle = {
      body: {
        whiteSpace: 'normal',
        color: 'gray',
      },
      p: {
        color: 'gray',
        marginBottom: 7,
        marginTop: -2,
      },
    };

    const ignoredTags = [];
    const paragraphEndIndex = htmlContent.indexOf('</p>') + 4;
    const previewText = htmlContent.slice(0, paragraphEndIndex);
    return (
      <View style={styles.container}>
        <RenderHTML
            {...props}
            renderers={renderers}
            WebView={WebView}
            customHTMLElementModels={customHTMLElementModels}
            provideEmbeddedHeaders={provideEmbeddedHeaders}
          source={{ html: blog_id ? previewText : htmlContent }}
            style={{
              width:"100%",
              height:screen.height,
              backgroundColor:"transparent"
            }}
            javaScriptEnabled={true}
            renderLoading={()=> { return <LoadingScreen/>}}
          contentWidth={windowWidth}
          tagsStyles={{
            ...contentStyle,
            ...props?.htmlStyle,
          }}
          renderersProps={customRenderersProps}
          ignoredDomTags={props?.ignoredTags ?? ignoredTags}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    // paddingVertical: -10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 3,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CustomHTML;
