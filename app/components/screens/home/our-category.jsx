import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import {Text, useWindowDimensions, View} from "react-native";
import {COLORS} from "../../../constants/theme";
import FeaturedCard from "../../FeaturedCard";
import {CollectionsOurCategory} from "../../../store/actions/product";
import LoadingScreen from "../../LoadingView";

function mapStateToProps({Product}) {
    let { collections } = Product
 return {
        collections
 };
}

/**
 *
 * @param {object} props
 * @returns {JSX.Element}
 */
function OurCategory(props)  {
  let { collections, CollectionsOurCategory  } = props
  const screen = useWindowDimensions()

  useEffect(()=> {
    CollectionsOurCategory({
      first:6,
      query:"categories",
      after:null
    })
  },[CollectionsOurCategory])

  return (

      <View
          style={{
              flex:1,
              marginHorizontal:10,
          }}
      >
          <Text
              style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: COLORS.title,
                  marginBottom: 10
              }}
          >
              Our Category
          </Text>
          <View
              style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
              }}
          >
              {
                  collections?.ourCategory?.loading ?(
                      <LoadingScreen Loading3 />
                  ):(
                      collections?.ourCategory?.data?.map(item => (
                          <View style={{ width: screen.width / 2 - 10, padding: 10 }} key={item.id}>
                              <FeaturedCard
                                  image={item.images.edges[0]?.node.url}
                                  title={item.description}
                                  dataCollection={collections?.ourCategory?.data ?? []}
                                  imagePath
                                  categories
                              />
                          </View>
                      ))
                  )
              }
          </View>
      </View>
  );
}

export default connect(
 mapStateToProps,{
     CollectionsOurCategory
 }
)(OurCategory);