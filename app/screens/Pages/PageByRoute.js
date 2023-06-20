import React from 'react';
import {SafeAreaView, ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import CustomHTML from '../../components/CustomHtml';

const PagesInShopify = ({route}) => {
  const {dataPages} = route.params;
  const screen = useWindowDimensions()
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor }}>
        <Header title={dataPages?.title === "Refund Policy" ? "Shipping & Return" : dataPages?.title} titleLeft leftIcon={'back'} />
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center',flex:1,paddingHorizontal:15, paddingBottom:100}}>
            <Text
              style={{fontSize: 20,marginBottom:20, color: COLORS.title, ...FONTS.fontBold}}>
              {dataPages?.title}
            </Text>

            <CustomHTML htmlContent={dataPages?.body} htmlStyle={{
              img: {
                overflow:"hidden",
                borderRadius: 10,
                left:-5,
                width:`${screen.width / 2 - 30}px`,
                objectFit:"cover",
              }
            }}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PagesInShopify;
