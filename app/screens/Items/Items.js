import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import ProductItem from '../../components/ProductItem';
import { useQuery, useLazyQuery } from '@apollo/client';
import LoadingScreen from '../../components/LoadingView';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  GQL_GET_PRODUCT_LIST_ITEM_BY_CATEGORY_COLLECTION,
  __GQL_GET_PRODUCT_LIST_ITEM_BY_CATEGORY_COLLECTION,
} from '../../graphql/queries';
import FilterModal from '../../components/screens/items/filter-product';

const Items = ({ navigation, route }) => {
  const { handle, subTitle, id } = route.params;
  const [itemView, setItemView] = useState('grid');
  const [dataCategories, setDataCategories] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const flatListRef = useRef(null);

  const {
    data,
    fetchMore,
    loading: loadingGetProducts,
  } = useQuery(GQL_GET_PRODUCT_LIST_ITEM_BY_CATEGORY_COLLECTION, {
    variables: {
      first: 5,
      handle: handle,
      id: id,
      after: null,
      product_filters: [
    ...selectedProductTypes.map(productType => ({ productType })),
        {
          price: {
            ...(priceRange.min && priceRange.max ? { min: parseFloat(priceRange.min), max: parseFloat(priceRange.max) } : {}),
          },

        }
      ],
    },
  });

  useEffect(() => {
    if (data) {
      setDataCategories(data?.collection?.products.nodes || []);
      setDataFilters(data?.collection?.products || {});
    }
  }, [data]);

  

  const handleFilterButtonClick = () => {
    setShowInput(!showInput);
  };

  const handleLoadMore = async () => {
    const { endCursor, hasNextPage } = data?.collection?.products?.pageInfo;

    if (data && hasNextPage) {
      setIsLoadingMore(true);
      try {
        await fetchMore({
          variables: {
            first: 5,
            handle: handle,
            id: id,
            after: endCursor,
            product_filters: [
              ...selectedProductTypes.map(productType => ({ productType })),
                  {
                    price: {
                      ...(priceRange.min && priceRange.max ? { min: parseFloat(priceRange.min), max: parseFloat(priceRange.max) } : {}),
                    },
          
                  }
                ],
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              collection: {
                ...fetchMoreResult.collection,
                products: {
                  ...fetchMoreResult.collection.products,
                  nodes: [...prev?.collection.products?.nodes, ...fetchMoreResult.collection.products.nodes],
                },
              },
            };
          },
        });
      } catch (error) {
        console.error('Error fetching more products:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };


  const renderItem = ({ item }) => (
    <View style={{ width: '50%', paddingHorizontal: 5 }}>
      <ProductItem
        onPress={() =>
          navigation.navigate('ProductDetail', {
            id: item.id,
          })
        }
        imgLength
        imageSrc={item?.images?.edges[0]?.node?.url}
        title={item.title}
        price={item?.variants?.nodes[0]?.price?.amount}
        oldPrice={item?.variants?.nodes[0]?.compareAtPrice?.amount}
      />
    </View>
  );
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Header titleLeft leftIcon={'back'} title={subTitle} />
        </View>
        <View style={{ height: '100%' }}>
          <FilterModal
            visible={showInput}
            onClose={() => setShowInput(false)}
            dataFilter={dataFilters}
            selectedProductTypes={selectedProductTypes}
            setSelectedProductTypes={setSelectedProductTypes}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            
          />
          <TouchableOpacity
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '30%',
              marginBottom: 10,
              marginHorizontal: 17,
            }}
            onPress={handleFilterButtonClick}
          >
            <Text
              style={{
                textAlign: 'center',
                marginRight: 10,
                marginVertical: 3,
                color: 'black',
                ...FONTS.font,
              }}
            >
              Filter
            </Text>
            <AntDesignIcon color="#374957" size={20} name="filter" style={{ textAlign: 'center', marginVertical: 3 }} />
          </TouchableOpacity>
          {loadingGetProducts ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
              }}
            >
              <LoadingScreen />
            </View>
          ) : dataCategories && dataCategories.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
              }}
            >
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Product Not Found</Text>
            </View>
          ) : (
            <FlatList
              data={dataCategories}
              renderItem={renderItem}
              ref={flatListRef}
              keyExtractor={item => String(item.id)}
              numColumns={itemView === 'grid' ? 2 : 1}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              contentContainerStyle={{
                minHeight: '100%',
                paddingHorizontal: 8,
                paddingBottom: 90,
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                isLoadingMore && (
                  <View style={{ marginBottom: 90 }}>
                    <LoadingScreen Loading2 />
                  </View>
                )
              }
              onEndReached={() => handleLoadMore()}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    padding: 10,
    position: 'absolute',
  },
  snackbar: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
});

// Rest of the code...

export default Items;
