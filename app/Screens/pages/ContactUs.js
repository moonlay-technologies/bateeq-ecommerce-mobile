import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import CustomHTML from '../../components/CustomHtml';
import LoadingScreen from '../../components/LoadingView';

const PagesContactUs = ({ route }) => {
  const { dataPages, title, loading } = route.params;
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.backgroundColor }}>
        <Header title={title} titleLeft leftIcon={'back'} />
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {loading && <LoadingScreen Loading2 />}
            <Text style={{ fontSize: 20, color: COLORS.title, ...FONTS.fontBold }}>{dataPages?.title}</Text>
            <CustomHTML htmlContent={dataPages?.body} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PagesContactUs;
