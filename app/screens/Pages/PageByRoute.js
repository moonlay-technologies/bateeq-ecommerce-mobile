import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import CustomHTML from '../../components/CustomHtml';

const PagesInShopify = ({route}) => {
  const {dataPages} = route.params;
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
        <Header title={dataPages?.title === "Refund Policy" ? "Shipping & Return" : dataPages?.title} titleLeft leftIcon={'back'} />
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 25, paddingRight: 25}}>
            <Text
              style={{fontSize: 20, color: COLORS.title, ...FONTS.fontBold}}>
              {dataPages?.title}
            </Text>
            <CustomHTML htmlContent={dataPages?.body} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PagesInShopify;
