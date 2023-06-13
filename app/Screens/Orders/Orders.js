import React from 'react';
import {
  SafeAreaView,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {IconButton} from 'react-native-paper';
import {COLORS, FONTS} from '../../constants/theme';
import AllCart from './AllCart';
import Canceled from './Canceled';
import Completed from './Completed';
import OnDelivery from './OnDelivery';

const renderScene = SceneMap({
  All: AllCart,
  OnDelivery: OnDelivery,
  Completed: Completed,
  Canceled: Canceled,
});

const Orders = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'All', title: 'All'},
    {key: 'OnDelivery', title: 'On Delivery'},
    {key: 'Completed', title: 'Completed'},
    {key: 'Canceled', title: 'Canceled'},
  ]);

  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
          justifyContent: 'space-between',
          // borderBottomWidth:1,
          // borderBottomColor:COLORS.borderColor,
        }}>
        <IconButton
          icon={() => (
            <View
              style={{
                // borderWidth:1,
                // borderColor:COLORS.borderColor,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <FeatherIcon color={COLORS.title} size={18} name="menu" />
            </View>
          )}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
        {/* <Text style={{...FONTS.fontSatoshiBold,color:COLORS.title,flex:1, fontSize: 18,justifyContent:'center',alignItems:'center', textAlign: 'center',marginLeft:5}}>bateeq</Text> */}
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={{width: 70, height: 35}}
            source={require('../../assets/images/logo.png')}
          />
        </TouchableOpacity>
        {/* <IconButton
                    icon={() => <FeatherIcon color={COLORS.title} size={20} name='search'/>}
                    size={25}
                    onPress={() => navigation.navigate('Search')}
                /> */}
        {/* <IconButton
                    icon={() => <FeatherIcon color={COLORS.title} size={20} name='heart'/>}
                    size={25}
                    onPress={() => navigation.navigate('Wishlist')}
                /> */}
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          icon={() => (
            <View>
              <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 14,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -4,
                  right: -6,
                }}>
                <Text
                  style={{...FONTS.fontXs, fontSize: 10, color: COLORS.white}}>
                  2
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      </View>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor={COLORS.title}
            indicatorStyle={{backgroundColor: 'transparent'}}
            labelStyle={{
              //   ...FONTS.fontLg,
              ...FONTS.fontSatoshiBold,
              color: '#B2B2B2',
              textTransform: 'capitalize',
            }}
            scrollEnabled={true}
            tabStyle={{
              width: 115,
              borderWidth: 1,
              borderColor: '#B2B2B2',
              marginRight: 6,
              borderRadius: 6,
            }}
            style={{
              backgroundColor: 'transparent',
              elevation: 0,
              borderWidth: 1,
              borderColor: COLORS.white,
              marginLeft: 16,
            }}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

export default Orders;
