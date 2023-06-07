import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  // ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
// import Octicons from 'react-native-vector-icons/Octicons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, RadioButton, Snackbar } from 'react-native-paper';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import ProductItem from '../../components/ProductItem';
import pic1 from '../../assets/images/product/pic1.jpg';
import pic2 from '../../assets/images/product/pic2.jpg';
import pic3 from '../../assets/images/product/pic3.jpg';
import pic4 from '../../assets/images/product/pic4.jpg';
import pic5 from '../../assets/images/product/pic5.jpg';
import pic6 from '../../assets/images/product/pic6.jpg';
import pic7 from '../../assets/images/product/pic7.jpg';
import pic8 from '../../assets/images/product/pic8.jpg';
import { ProductApi } from '../../service/shopify-api';
// import Ripple from 'react-native-material-ripple';
// import CheckBox from '@react-native-community/checkbox';
// import {GlobalStyleSheet} from '../../constants/StyleSheet';
// import CustomButton from '../../../components/CustomButton';
import MobilesData from '../../JSON/Mobiles.json';
import ElectronicsData from '../../JSON/Electronics.json';
import FashionData from '../../JSON/Fashion.json';
import FurnitureData from '../../JSON/Furniture.json';
import GroceryData from '../../JSON/Grocery.json';
import AppliancesData from '../../JSON/Appliances.json';
import BooksToysData from '../../JSON/BooksToys.json';
import LoadingScreen from '../../components/LoadingView';

const ProductData = [
  {
    image: pic1,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic2,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic3,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
    status: 'Trending',
  },
  {
    image: pic4,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic5,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic6,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
    status: 'Sale',
  },
  {
    image: pic7,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic8,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
];

// const discountFilterData = [
//   {
//     selected: false,
//     title: '50% or more',
//   },
//   {
//     selected: false,
//     title: '30% or more',
//   },
//   {
//     selected: false,
//     title: '40% or more',
//   },
//   {
//     selected: false,
//     title: '60% or more',
//   },
//   {
//     selected: false,
//     title: '70% or more',
//   },
// ];
// const brandFilterData = [
//   {
//     selected: true,
//     title: 'Roadster',
//   },
//   {
//     selected: true,
//     title: 'Peter England',
//   },
//   {
//     selected: true,
//     title: 'Flying Machine',
//   },
//   {
//     selected: true,
//     title: 'Killer',
//   },
//   {
//     selected: true,
//     title: "Levi's",
//   },
//   {
//     selected: true,
//     title: 'Puma',
//   },
//   {
//     selected: true,
//     title: 'Wildcraft',
//   },
//   {
//     selected: true,
//     title: 'Ndet',
//   },
//   {
//     selected: true,
//     title: 'Woodland',
//   },
// ];

const GET_LIST_PRODUCTS_CATEGORIES = gql`
  query GetProducts($first: Int!, $query: String!, $after: String) {
    products(first: $first, query: $query, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          description
          descriptionHtml
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

function Items({ navigation, route }) {
  const { type, query, categories, colletionTitle } = route.params;
  const [itemView, setItemView] = useState('grid');
  const [dataCategories, setDataCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [valSearch, setValSearch] = useState('');

  const flatListRef = useRef(null);
  const Products =
    type == 'Mobiles'
      ? MobilesData.items
      : type == 'Electronics'
      ? ElectronicsData.items
      : type == 'Furniture'
      ? FurnitureData.items
      : type == 'Grocery'
      ? GroceryData.items
      : type == 'Dress'
      ? AppliancesData.items
      : type == 'Bottom'
      ? BooksToysData.items
      : type == 'Top'
      ? FashionData.items
      : ProductData;

  const [itemData, setItemData] = useState(Products);

  const { data, fetchMore, loading } = useQuery(GET_LIST_PRODUCTS_CATEGORIES, {
    variables: {
      first: 10,
      query: valSearch || query,
    },
  });

  const [filterSearch, { loading: loadingSearch }] = useLazyQuery(GET_LIST_PRODUCTS_CATEGORIES, {
    onCompleted: ({ products }) => {
      const results = products?.edges || [];
      setDataCategories(results);
    },
  });

  const handleSearchButton = () => {
    filterSearch({
      variables: {
        first: 10,
        query: valSearch,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setDataCategories(data?.products?.edges || []);
    }
  }, []);

  const handleValChange = val => {
    setValSearch(val);
  };

  const handleFilterButtonClick = () => {
    setShowInput(!showInput);
  };

  const handleItemLike = val => {
    const items = itemData.map(data => {
      if (val === data.id) {
        if (data.isLike) {
          setSnackText('Item removed to Favourite.');
        } else {
          setSnackText('Item add to Favourite.');
        }
        setIsSnackbar(true);
        return { ...data, isLike: !data.isLike };
      }
      return data;
    });
    setItemData(items);
  };

  const handleLoadMore = async () => {
    if (data.products.pageInfo.hasNextPage) {
      setIsLoadingMore(true);
      try {
        const result = await fetchMore({
          variables: {
            first: 10,
            query,
            after: data.products.pageInfo.endCursor,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              products: {
                ...fetchMoreResult.products,
                edges: [...prev.products.edges, ...fetchMoreResult.products.edges],
              },
            };
          },
        });
        // Process the result if needed
      } catch (error) {
        console.error('Error fetching more products:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    handleLoadMore();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    if (currentPage === 1 && data && data.products.pageInfo.hasNextPage) {
      return (
        <TouchableOpacity style={styles.paginationButton} onPress={handleNextPage}>
          <AntDesignIcon name="right" size={20} color={COLORS.black} />
        </TouchableOpacity>
      );
    }
    if (currentPage > 1 && data && data.products.pageInfo.hasNextPage) {
      return (
        <>
          <TouchableOpacity style={styles.paginationButton} onPress={handlePrevPage}>
            <AntDesignIcon name="left" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationButton} onPress={handleNextPage}>
            {isLoadingMore ? (
              <LoadingScreen type="circle" />
            ) : (
              <AntDesignIcon name="right" size={20} color={COLORS.black} />
            )}
          </TouchableOpacity>
        </>
      );
    }
    if (currentPage > 1 && !data.products.pageInfo.hasNextPage) {
      return (
        <TouchableOpacity style={styles.paginationButton} onPress={handlePrevPage}>
          <AntDesignIcon name="left" size={20} color={COLORS.black} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderItem = ({ item }) => (
    // <View
    //   style={{
    //     width: itemView == 'list' ? '100%' : '50%',
    //     paddingHorizontal: 10,
    //     marginBottom: 8,
    //   }}>
    //   <ItemCard
    //     listView={itemView == 'list' ? true : false}
    //     id={item.id}
    //     subCategory="MEN - LS - REGULER"
    //     imageSrc={item.images[0].src}
    //     images={item.images}
    //     price={item.variants[0].price}
    //     oldPrice={item.variants[0].compare_at_price}
    //     title={item.title}
    //     description={item.description}
    //     shopBtn={false}
    //     itemName={item.title}
    //   />
    // </View>
    <View style={{ width: '50%', paddingHorizontal: 5 }}>
      <ProductItem
        onPress={() =>
          navigation.navigate('ProductDetail', {
            item: {
              title: item.node.title,
              images: item.node.images.edges,
              oldPrice: item?.node?.variants?.edges[0]?.node?.compareAtPrice?.amount,
              price: item.node.variants.edges[0].node.price.amount,
              desc: item.node.descriptionHtml,
              variant: item.node.variants.edges,
            },
            // category: type,
          })}
        imgLength
        id={item.node.id}
        imageSrc={item.node.images.edges[0].node.url}
        // images={item.images}
        title={item.node.title}
        desc={item.node.description}
        status={item.status ? 'SALE' : null}
        price={item.node.variants.edges[0].node.price.amount}
        oldPrice={item?.node?.variants?.edges[0]?.node?.compareAtPrice?.amount}
        // rating={data.rating}
        // reviews={data.reviews}
        isLike={item.isLike}
        handleItemLike={handleItemLike}
      />
    </View>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  // const [sortVal, setSortVal] = useState('');
  // const [sheetType, setSheetType] = useState('');
  // const [brandFilter, setBrandFilter] = useState(brandFilterData);
  // const [discountFilter, setDiscountFilter] = useState(discountFilterData);
  // const [filterData, setFilterData] = useState([]);

  // const handleFilterSelected = val => {
  //   let Brand = brandFilter.map(data => {
  //     if (val === data.title) {
  //       return {...data, selected: !data.selected};
  //     }
  //     return data;
  //   });
  //   let Discount = discountFilter.map(data => {
  //     if (val === data.title) {
  //       return {...data, selected: !data.selected};
  //     }
  //     return data;
  //   });
  //   setBrandFilter(Brand);
  //   setDiscountFilter(Discount);
  //   setFilterData(
  //     sheetType == 'brand' ? Brand : sheetType == 'discount' ? Discount : [],
  //   );
  // };

  return (
    <>
      {/* <RBSheet
        ref={sheetRef}
        height={
          sheetType === 'sort'
            ? 250
            : sheetType === 'discount'
            ? 310
            : sheetType === 'brand'
            ? 400
            : 300
        }
        closeOnDragDown={true}
        closeOnPressMask={true}>
        {sheetType == 'sort' ? (
          <RadioButton.Group
            onValueChange={value => {
              setSortVal(value);
              sheetRef.current.close();
            }}
            value={sortVal}>
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="What's new"
              value="newest"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Price - high to low"
              value="price-hightolow"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Price - low to hight"
              value="price-lowtohigh"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Popularity"
              value="popularity"
            />
            <RadioButton.Item
              color={COLORS.primary}
              uncheckedColor={COLORS.label}
              style={{paddingVertical: 2}}
              label="Discount"
              value="discount"
            />
          </RadioButton.Group>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5,
                marginTop: -10,
                marginBottom: 5,
              }}>
              <TouchableOpacity
                onPress={() => sheetRef.current.close()}
                style={{
                  padding: 10,
                  marginRight: 3,
                }}>
                <FeatherIcon color={COLORS.title} size={24} name="x" />
              </TouchableOpacity>
              <Text style={{...FONTS.h6, top: 1}}>Filters</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {filterData.map((data, index) => (
                <View
                  key={index}
                  style={{
                    width: '50%',
                  }}>
                  <List.Item
                    style={{paddingVertical: 2}}
                    onPress={() => handleFilterSelected(data.title)}
                    left={() => (
                      <CheckBox
                        tintColors={{true: COLORS.primary, false: COLORS.text}}
                        style={{left: 10}}
                        value={data.selected}
                        disabled
                      />
                    )}
                    title={() => (
                      <Text
                        style={{
                          ...FONTS.font,
                          ...FONTS.fontMedium,
                          top: -1,
                          color: COLORS.title,
                        }}>
                        {data.title}
                      </Text>
                    )}
                  />
                </View>
              ))}
            </View>
            <View style={GlobalStyleSheet.container}>
              <View style={GlobalStyleSheet.row}>
                <View style={GlobalStyleSheet.col50}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.borderColor,
                      paddingHorizontal: 15,
                      alignItems: 'center',
                      paddingVertical: 14,
                      borderRadius: SIZES.radius,
                    }}>
                    <Text style={{...FONTS.fontLg, color: COLORS.primary}}>
                      Clear
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={GlobalStyleSheet.col50}>
                  <CustomButton title={'Apply'} />
                </View>
              </View>
            </View>
          </>
        )}
      </RBSheet> */}

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Header titleLeft leftIcon="back" title={categories ? query : colletionTitle || 'All Product'} />
        </View>
        {/* <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ripple
                onPress={() => {
                  setSheetType('sort');
                  sheetRef.current.open();
                }}
                style={styles.badge}>
                <Octicons size={16} style={{marginRight: 6}} name="sort-desc" />
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  Sort By
                </Text>
                <FeatherIcon
                  style={{marginLeft: 2, marginRight: -6}}
                  size={18}
                  name="chevron-down"
                />
              </Ripple>
              <TouchableOpacity
                onPress={() => navigation.navigate('Filter')}
                style={styles.badge}>
                <FeatherIcon style={{marginRight: 8}} size={15} name="filter" />
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  Filter
                </Text>
              </TouchableOpacity>
              <Ripple
                onPress={() => {
                  setSheetType('brand');
                  setFilterData(brandFilter);
                  sheetRef.current.open();
                }}
                style={styles.badge}>
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  Brand
                </Text>
                <FeatherIcon
                  style={{marginLeft: 2, marginRight: -6}}
                  size={18}
                  name="chevron-down"
                />
              </Ripple>
              <Ripple
                onPress={() => {
                  setSheetType('discount');
                  setFilterData(discountFilter);
                  sheetRef.current.open();
                }}
                style={styles.badge}>
                <Text style={{...FONTS.font, top: -1, color: COLORS.title}}>
                  discount
                </Text>
                <FeatherIcon
                  style={{marginLeft: 2, marginRight: -6}}
                  size={18}
                  name="chevron-down"
                />
              </Ripple>
            </View>
          </ScrollView>
        </View> */}
        {/* <ScrollView> */}
        {/* <View
            style={{
              paddingTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 5,
              }}>
              {itemData.map((data, index) => (
                <View key={index} style={{width: '50%', paddingHorizontal: 5}}>
                  <ProductItem
                    onPress={() =>
                      navigation.navigate('ProductDetail', {
                        item: data,
                        category: type,
                      })
                    }
                    imgLength={type == 'Fashion'}
                    id={data.id}
                    imageSrc={data.image}
                    title={data.title}
                    desc={data.desc}
                    status={data.status}
                    price={data.price}
                    oldPrice={data.oldPrice}
                    rating={data.rating}
                    reviews={data.reviews}
                    isLike={data.isLike}
                    handleItemLike={handleItemLike}
                  />
                </View>
              ))}
            </View>
          </View> */}

        <View style={{ height: '100%' }}>
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
                ...FONTS.fontSatoshiBold,
              }}
            >
              Filter
            </Text>
            <AntDesignIcon color="#374957" size={20} name="filter" style={{ textAlign: 'center', marginVertical: 3 }} />
          </TouchableOpacity>
          {showInput && (
            <View>
              <TextInput
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginBottom: 10,
                  marginHorizontal: 17,
                }}
                placeholder="Search"
                autoFocus
                value={valSearch}
                onChangeText={handleValChange}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#333333',
                    gap: 6,
                    paddingVertical: 6,
                    paddingHorizontal: 24,
                    flexDirection: 'row',
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 38,
                  }}
                  onPress={handleSearchButton}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.fontSatoshiBold,
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Search
                  </Text>
                  <Ionicons
                    name="md-arrow-forward"
                    size={12}
                    color={COLORS.white}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 4,
                      marginLeft: 18,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {loadingSearch || isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LoadingScreen />
            </View>
          ) : (
            <FlatList
              data={dataCategories}
              renderItem={renderItem}
              ref={flatListRef}
              keyExtractor={item => item.node.id.toString()}
              numColumns={itemView === 'grid' ? 2 : 1}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              contentContainerStyle={{
                paddingHorizontal: 8,
                marginBottom: 10,
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                data &&
                data.products.pageInfo.hasNextPage && (
                  <View style={styles.paginationContainer}>{renderPaginationButtons()}</View>
                )
              }
              onEndReached={handleLoadMore}
            />
          )}
        </View>
        {/* </ScrollView> */}
        <Snackbar
          visible={isSnackbar}
          duration={3000}
          onDismiss={() => setIsSnackbar(false)}
          action={{
            label: 'Wishlist',
            onPress: () => {
              navigation.navigate('Wishlist');
            },
          }}
        >
          {snackText}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}

// const styles = StyleSheet.create({
//   badge: {
//     borderWidth: 1,
//     borderColor: COLORS.borderColor,
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 15,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

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
