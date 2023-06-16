import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import LoadingScreen from "../../LoadingView";
import ProductCardStyle1 from "../../ProductCardStyle";
import {COLORS, FONTS} from "../../../constants/theme";
import {CollectionProductLatest, CollectionProductLatestShow} from "../../../store/actions/product";
import {GlobalStyleSheet} from "../../../constants/StyleSheet";
import FeaturedCard from "../../FeaturedCard";
import {findKey} from "../../../utils/helper";

function mapStateToProps({Product}) {
    let { collections } = Product
 return {
    collections
 };
}

/**
 *
 * @param {object} props
 * @param {Function} props.CollectionProductLatest
 * @param {Function} props.CollectionProductLatestShow
 * @param {object} props.collections
 * @param {object} props.collections.latest
 * @param {object} props.collections.latest.show
 * @param {Array | [] | object[]} props.collections.latest.data
 * @param {object} props.collections.latest.variables
 * @param {boolean} props.collections.latest.loading
 * @param {object} props.collections.latest.pagination
 * @returns {JSX.Element}
 */
function LatestCollections(props)  {
    let { collections, CollectionProductLatest,CollectionProductLatestShow } = props
    const screen = useWindowDimensions()


    useEffect(()=> {
        CollectionProductLatest({
            first:4,
            query:"kamala",
            after: null
        })
    },[CollectionProductLatest])

    useEffect(()=> {
        CollectionProductLatestShow({
            handle:"latest-collection"
        })
    },[CollectionProductLatestShow])

  return (
      <View>
          {collections?.latest.show?.loading ? (
              <LoadingScreen Loading3 />
          ) : (
              <View
                  style={{
                      ...GlobalStyleSheet.container,
                      borderTopColor: COLORS.borderColor,
                  }}
              >
                  <Text
                      style={{
                          ...FONTS.fontSatoshiBold,
                          color: COLORS.title,
                          marginBottom: 16,
                          fontSize: 18,
                          textAlign: 'center',
                      }}
                  >
                      {findKey(collections.latest.show.data,['title']) ?? "-"}
                  </Text>
                  <FeaturedCard
                      image={findKey(collections.latest.show.data,['image','url']) ?? null}
                      title={findKey(collections.latest.show.data,['description'])}
                      dataCollection={findKey(collections.latest.show,['data'])}
                  />
              </View>
          )}
          <View style={{ justifyContent: 'center', alignItems: 'center',marginBottom: 40}}>
              {collections.latest.loading ? (
                  <LoadingScreen Loading3 />
              ) : (
                  <View
                      style={{
                          marginHorizontal:14,
                          marginTop:10
                      }}
                  >
                      <View
                          style={{
                              gap:10,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between',
                          }}
                      >
                          {
                              Array.isArray(collections.latest.data) && collections.latest.data.length > 0 ?
                                  collections.latest.data.slice(0,4).length > 0 &&
                                  collections.latest.data.slice(0,4).map((product)=> {
                                      return (
                                          <View
                                              key={product.id}
                                              style={{
                                                  width: screen.width / 2 - 25,
                                                  marginBottom: 20,
                                                  flexDirection: 'row',
                                                  flexWrap: 'wrap',
                                                  justifyContent: 'space-between',
                                              }}
                                          >
                                              <ProductCardStyle1
                                                  onPress={() =>
                                                      navigation.navigate('ProductDetail', {
                                                          id: product?.id ?? "-",
                                                      })
                                                  }
                                                  imageSrc={product?.images?.edges[0].node.url}
                                                  title={product?.title}
                                                  price={product?.variants?.edges[0].node.price.amount}
                                                  oldPrice={product?.variants?.edges[0]?.node?.compareAtPrice?.amount}
                                              />
                                          </View>
                                      )
                                  })
                                  :
                                  <View>
                                      <Text>Empty</Text>
                                  </View>
                          }

                      </View>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <TouchableOpacity
                              onPress={() => navigation.navigate('Items', { query: 'Kamala' })}
                              style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 1,
                                  width: 200,
                                  height: 48,
                              }}
                          >
                              <Text
                                  style={{
                                      ...FONTS.fontSatoshiBold,
                                      color: COLORS.title,
                                      marginRight: 2,
                                  }}
                              >
                                  See More
                              </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              )}
          </View>
      </View>
  );
}

export default connect(
 mapStateToProps,
    {
        CollectionProductLatest,
        CollectionProductLatestShow
    }
)(LatestCollections);