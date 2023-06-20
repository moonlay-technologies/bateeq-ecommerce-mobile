import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, View} from "react-native";
import {GetPagesSummary} from "../../../store/actions/pages";
import CustomHTML from "../../CustomHtml";
import {COLORS, FONTS} from "../../../constants/theme";
import {findKey} from "../../../utils/helper";
import LoadingScreen from "../../LoadingView";
import Ionicons from "react-native-vector-icons/Ionicons";

function mapStateToProps({Pages}) {
    let { collections } = Pages
 return {
        summary: collections?.summary
 };
}

/**
 * @param {object} props
 * @param {object} props.style
 * @param {Function} props.onRedirect
 * @param {Function} props.GetPagesSummary
 * @param {object} props.summary
 * @returns {JSX.Element}
 */
function OurStory(props = {})  {
    let { summary,GetPagesSummary, onRedirect } = props
    useEffect(()=> {
        GetPagesSummary({
            handle:"our-story"
        })
    },[GetPagesSummary])

    function handleRedirect(){
        if(props.onRedirect && typeof(props.onRedirect) === 'function'){
            props.onRedirect({data:summary.data})
        }
    }

  return summary.loading ? <LoadingScreen Loading3 /> : summary?.data && (
   <View style={{
       flex:1,
       marginHorizontal:16,
       justifyContent: 'center',
       alignItems: 'center',
       ...props?.style,
   }}>
       <Text
           style={{
               fontSize: 20,
               color: COLORS.title,
               marginBottom: 16,
               ...FONTS.fontSatoshiBold,
           }}
       >
           {findKey(summary.data,['title']) ?? "-"}
       </Text>
       <CustomHTML htmlContent={summary?.data?.body} blog_id />
       <TouchableOpacity
           onPress={handleRedirect}
           style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               paddingVertical: 8,
               paddingHorizontal: 16,
               borderWidth: 1,
               borderColor: 'black',
           }}
       >
           <Text
               style={{
                   color: COLORS.title,
                   ...FONTS.fontSatoshiRegular,
                   fontSize: 16,
               }}
           >
               Learn More
           </Text>
           <Ionicons
               name="md-arrow-forward"
               size={12}
               color="#000"
               style={{
                   justifyContent: 'center',
                   alignItems: 'center',
                   marginTop: 6,
                   marginLeft: 18,
               }}
           />
       </TouchableOpacity>
   </View>
  );
}

export default connect(
 mapStateToProps, {GetPagesSummary}
)(OurStory);