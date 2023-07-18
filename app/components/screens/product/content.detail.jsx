import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import CustomHTML from '../../CustomHtml';
import { COLORS } from '../../../constants/theme';
import LoadingScreen from '../../LoadingView';

function mapStateToProps(state) {
  return {};
}

/**
 *
 * @param {object} props
 * @param {object} props.data
 * @returns {JSX.Element}
 */
function ContentDetail(props) {
  const { data } = props;
  const screen = useWindowDimensions();
  const windowWidth = useWindowDimensions().width;
  const [maxSummary, setMaxSummary] = useState(50);
  const [visible, setVisible] = useState(false);
  function onOpenDescription() {
    setVisible(!visible);
  }

  return (
    <View style={{ marginBottom: 10, paddingHorizontal: 15 }}>
      <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold', color: '#000000' }}>Detail Product</Text>
      <View>
        {visible ? (
          <RenderHTML
            source={{ html: data?.descriptionHtml }}
            style={{
              width: '100%',
              // height: screen.height,
              backgroundColor: 'transparent',
            }}
            javaScriptEnabled
            renderLoading={() => {
              return <LoadingScreen />;
            }}
            contentWidth={windowWidth}
            tagsStyles={
              {
                // ...contentStyle,
                // ...props?.htmlStyle,
              }
            }
            ignoredDomTags={['iframe']}
          />
        ) : (
          <Text numberOfLines={2}>{`${data?.description}`}</Text>
        )}

        <View style={{ width: '100%', height: 20, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Text style={{ color: COLORS.primary }} onPress={onOpenDescription}>
            {visible ? 'Read Less' : 'Read More'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(ContentDetail);
