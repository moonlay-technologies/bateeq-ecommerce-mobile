import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
// import { useQuery, gql } from '@apollo/client';
import CustomHTML from '../../components/CustomHtml';
// import LoadingScreen from '../../components/LoadingView';

// const GET_PAGE_STORY  = gql`
// query getPageStory {
//     page(handle: "our-story") {
//       id
//       title
//       body
//     }
//   }
// `;

const PageOurStory = ({route}) => {
  const { pageStory } = route.params;
    // const [pageStory, setPageStory] = useState(null)
    // const {data, loading, error} = useQuery(GET_PAGE_STORY);

    // useEffect(() => {
    //     if (data) {
    //       setPageStory(data.page)
    //     }
    //   }, [data]);

    //   if (loading) {
    //     return <LoadingScreen />;
    //   }

    //   if (error) {
    //     return <Text>Error: {error.message}</Text>;
    //   }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
        <Header title={'Story Bateeq'} titleLeft leftIcon={'back'} />
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize: 20, color: COLORS.title,...FONTS.fontBold}}>
              {pageStory?.title}
            </Text>
            <CustomHTML
              htmlContent={pageStory?.body}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PageOurStory;
