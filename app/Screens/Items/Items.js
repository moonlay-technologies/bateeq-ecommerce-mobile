import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  // ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
// import Octicons from 'react-native-vector-icons/Octicons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, FONTS} from '../../constants/theme';
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
import {List, RadioButton, Snackbar} from 'react-native-paper';
import {ProductApi} from '../../service/shopify-api';
// import Ripple from 'react-native-material-ripple';
// import CheckBox from '@react-native-community/checkbox';
// import {GlobalStyleSheet} from '../../constants/StyleSheet';
// import CustomButton from '../../components/CustomButton';
import MobilesData from '../../JSON/Mobiles.json';
import ElectronicsData from '../../JSON/Electronics.json';
import FashionData from '../../JSON/Fashion.json';
import FurnitureData from '../../JSON/Furniture.json';
import GroceryData from '../../JSON/Grocery.json';
import AppliancesData from '../../JSON/Appliances.json';
import BooksToysData from '../../JSON/BooksToys.json';
import {gql, useQuery} from '@apollo/client';
import LoadingScreen from '../../components/LoadingView';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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

const discountFilterData = [
  {
    selected: false,
    title: '50% or more',
  },
  {
    selected: false,
    title: '30% or more',
  },
  {
    selected: false,
    title: '40% or more',
  },
  {
    selected: false,
    title: '60% or more',
  },
  {
    selected: false,
    title: '70% or more',
  },
];
const brandFilterData = [
  {
    selected: true,
    title: 'Roadster',
  },
  {
    selected: true,
    title: 'Peter England',
  },
  {
    selected: true,
    title: 'Flying Machine',
  },
  {
    selected: true,
    title: 'Killer',
  },
  {
    selected: true,
    title: "Levi's",
  },
  {
    selected: true,
    title: 'Puma',
  },
  {
    selected: true,
    title: 'Wildcraft',
  },
  {
    selected: true,
    title: 'Ndet',
  },
  {
    selected: true,
    title: 'Woodland',
  },
];

const GET_LIST_PRODUCTS_CATEGORIES = gql`
  query GetProducts($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Items = ({navigation, route}) => {
  // const sheetRef = useRef();
  const {type, collectionId, query, categories, colletionTitle} = route.params;
  const [itemView, setItemView] = useState('grid');
  const [productData, setProductData] = useState(null);
  const [dataCategories, setDataCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [collectionCustomId, setCollectionCustomId] = useState({
    collection_id: collectionId,
  });

  const {data: dataListCategories} = useQuery(GET_LIST_PRODUCTS_CATEGORIES, {
    variables: {
      first: 5,
      query: query,
    },
  });

  // console.log('collectionTit', dataListCategories.products.edges.map(e => e.node.variants.edges[0].node.price.amount))

  useEffect(() => {
    getDataProducts();
    if (dataListCategories) {
      setDataCategories(dataListCategories?.products?.edges);
    }
    // getDataCount();
  }, []);

  const getDataProducts = () => {
    setIsLoading(true);
    ProductApi.get(collectionCustomId)
      .then(res => {
        // console.log(res.products[0].images.map(src => src.src));
        setIsLoading(false);
        setProductData(res.products);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('errorrr', error);
      });
  };

  const Products =
    type == 'Mobiles'
      ? MobilesData.items
      : type == 'Electronics'
      ? ElectronicsData.items
      : type == 'Furniture'
      ? FurnitureData.items
      : type == 'Grocery'
      ? GroceryData.items
      : type == 'Appliances'
      ? AppliancesData.items
      : type == 'Books,Toys'
      ? BooksToysData.items
      : type == 'Fashion'
      ? FashionData.items
      : ProductData;

  const [itemData, setItemData] = useState(Products);

  // const [sortVal, setSortVal] = useState('');
  // const [sheetType, setSheetType] = useState('');
  // const [brandFilter, setBrandFilter] = useState(brandFilterData);
  // const [discountFilter, setDiscountFilter] = useState(discountFilterData);
  // const [filterData, setFilterData] = useState([]);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');

  const handleItemLike = val => {
    let items = itemData.map(data => {
      if (val === data.id) {
        if (data.isLike) {
          setSnackText('Item removed to Favourite.');
        } else {
          setSnackText('Item add to Favourite.');
        }
        setIsSnackbar(true);
        return {...data, isLike: !data.isLike};
      }
      return data;
    });
    setItemData(items);
  };

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

  const renderItem = ({item}) => (
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
    <View style={{width: '50%', paddingHorizontal: 5}}>
      <ProductItem
        onPress={() =>
          navigation.navigate('ProductDetail', {
            item: {
              title: categories ? item.node.title : item.title,
              images: categories
                ? item.node.images.edges[0].node.url
                : item.images,
              oldPrice: categories
                ? item?.node?.variants?.edges[0]?.node?.compareAtPrice?.amount
                : item.variants[0].compare_at_price,
              price: categories
                ? item.node.variants.edges[0].node.price.amount
                : item.variants[0].price,
              desc: categories ? item.node.description : item.desc,
              variant: categories
                ? data.products.edges[0].node.variants.edges[0].node
                    .selectedOptions[0].value
                : item?.options[0]?.values,
              colors: categories
                ? data.products.edges[0].node.variants.edges[0].node
                    .selectedOptions[1].value
                : item?.options[1]?.values,
            },
            // category: type,
          })
        }
        imgLength
        id={categories ? item.node.id : item.id}
        imageSrc={
          categories ? item.node.images.edges[0].node.url : item.images[0].src
        }
        // images={item.images}
        title={categories ? item.node.title : item.title}
        desc={categories ? item.node.description : item.desc}
        status={item.status ? 'SALE' : null}
        price={
          categories
            ? item.node.variants.edges[0].node.price.amount
            : item.variants[0].price
        }
        oldPrice={
          categories
            ? item?.node?.variants?.edges[0]?.node?.compareAtPrice?.amount
            : item.variants[0].compare_at_price
        }
        // rating={data.rating}
        // reviews={data.reviews}
        isLike={item.isLike}
        handleItemLike={handleItemLike}
      />
    </View>
  );

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
        }}>
        <View style={{paddingHorizontal: 20}}>
          <Header titleLeft leftIcon={'back'} title={categories ? query : colletionTitle ? colletionTitle : "All Product"} />
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
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LoadingScreen />
          </View>
        ) : (
          <View>
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
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginRight: 10,
                  marginVertical: 3,
                  ...FONTS.fontSatoshiBold,
                }}>
                Filter
              </Text>
              <AntDesignIcon
                color={'#374957'}
                size={20}
                name="filter"
                style={{textAlign: 'center', marginVertical: 3}}
              />
            </TouchableOpacity>
            <FlatList
              data={
                categories ? dataListCategories?.products?.edges : productData
              }
              renderItem={renderItem}
              keyExtractor={item => (categories ? item.node.id : item.id)}
              numColumns={itemView === 'grid' ? 2 : 1}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              windowSize={10}
              onEndReachedThreshold={0.5}
              contentContainerStyle={{
                paddingHorizontal: 8,
                marginBottom: 15,
              }}
              // onEndReached={() => {
              // Load more data here
              // }}
            />
          </View>
        )}
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
          }}>
          {snackText}
        </Snackbar>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Items;
