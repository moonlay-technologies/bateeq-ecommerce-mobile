import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../Screens/Onboarding/Splash';
import Onboarding from '../Screens/Onboarding/Onboarding';
import Welcome from '../Screens/Onboarding/Welcome';
import SignUp from '../Screens/Auth/SignUp';
import SignIn from '../Screens/Auth/SignIn';
import Products from '../Screens/Products/PopularItems';
import DrawerNavigation from './DrawerNavigation';
import ProductDetail from '../Screens/Products/ProductDetail';
import Featured from '../Screens/Featured/Featured';
import Orders from '../Screens/Orders/Orders';
import DeliveryTracking from '../Screens/Delivery/DeliveryTracking';
import Wishlist from '../Screens/Wishlist/Wishlist';
import Profile from '../Screens/Account/Profile';
import EditProfile from '../Screens/Account/EditProfile';
import Coupons from '../Screens/Account/Coupons';
import Address from '../Screens/Account/Address/Address';
import AddDeliveryAddress from '../Screens/Account/Address/Add';
import Filter from '../Screens/Filter/Filter';
import Items from '../Screens/Items/Items';
import CategoryHome from '../Screens/Categories/CategoryHome';
import Search from '../Screens/Search/Search';
import Payment from '../Screens/Delivery/Payment';
import Components from '../component-template/Components';
import AccordionScreen from '../component-template/Accordion';
import ActionSheet from '../component-template/ActionSheet';
import Buttons from '../component-template/Buttons';
import Inputs from '../component-template/Inputs';
import ActionModals from '../component-template/ActionModals';
import Charts from '../component-template/Charts';
import Chips from '../component-template/Chips';
import CollapseElements from '../component-template/CollapseElements';
import DividerElements from '../component-template/DividerElements';
import FileUploads from '../component-template/FileUploads';
import Headers from '../component-template/Headers';
import Footers from '../component-template/Footers';
import TabStyle1 from '../component-template/Footers/FooterStyle1';
import TabStyle2 from '../component-template/Footers/FooterStyle2';
import TabStyle3 from '../component-template/Footers/FooterStyle3';
import TabStyle4 from '../component-template/Footers/FooterStyle4';
import ListScreen from '../component-template/Lists';
import Paginations from '../component-template/Paginations';
import Pricings from '../component-template/Pricings';
import Snackbars from '../component-template/Snakbars';
import PageOurStory from '../components/PageOurStory';
import SwipeableScreen from '../components/Swipeable';
import Tabs from '../component-template/Tabs';
import Tables from '../component-template/Tables';
import Toggles from '../component-template/Toggles';
import Slider from '../Screens/Products/BestSellerProduct';
import Checkout from '../Screens/Checkout/Checkout';
import MainHome from '../Screens/Home/MainHome';
import Cart from '../Screens/Cart/Cart';
import BottomNavigation from './BottomNavigation';

const StackComponent = createNativeStackNavigator();

const StackNavigator = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return (
      <StackComponent.Navigator
        initialRouteName="DrawerNavigation"
        detachInactiveScreens={true}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}>
        <StackComponent.Screen name="Splash" component={Splash} />
        {/*<StackComponent.Screen*/}
        {/*  name="DrawerNavigation"*/}
        {/*  component={DrawerNavigation}*/}
        {/*/>*/}
        <StackComponent.Screen name={'Products'} component={Products} />
        <StackComponent.Screen name={'EditProfile'} component={EditProfile} />
        <StackComponent.Screen name={'Address'} component={Address} />
        <StackComponent.Screen
          name={'AddDeliveryAddress'}
          component={AddDeliveryAddress}
        />
        <StackComponent.Screen
          name={'ProductDetail'}
          component={ProductDetail}
        />
        <StackComponent.Screen name={'Checkout'} component={Checkout} />
        <StackComponent.Screen name={'Payment'} component={Payment} />
        <StackComponent.Screen name={'PageOurStory'} component={PageOurStory} />
        <StackComponent.Screen name={'Items'} component={Items} />
        <StackComponent.Screen name={'SignIn'} component={SignIn} />
        <StackComponent.Screen name={'SignUp'} component={SignUp} />
      </StackComponent.Navigator>
    );
  }

  return (
    <>
      <StackComponent.Navigator
        initialRouteName="Onboarding"
        detachInactiveScreens={true}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}>
        <StackComponent.Screen name={'Home'} component={MainHome} />
        <StackComponent.Screen
          name={'ProductDetail'}
          component={ProductDetail}
        />
        <StackComponent.Screen name={'Cart'} component={Cart} />
        <StackComponent.Screen name={'Splash'} component={Splash} />
        <StackComponent.Screen name={'Onboarding'} component={Onboarding} />
        <StackComponent.Screen name={'Welcome'} component={Welcome} />
        <StackComponent.Screen name={'SignUp'} component={SignUp} />
        <StackComponent.Screen name={'SignIn'} component={SignIn} />
        <StackComponent.Screen
          name={'DrawerNavigation'}
          component={DrawerNavigation}
        />
        <StackComponent.Screen name={'CategoryHome'} component={CategoryHome} />
        <StackComponent.Screen name={'Products'} component={Products} />
      
        <StackComponent.Screen name={'Featured'} component={Featured} />
        <StackComponent.Screen name={'Orders'} component={Orders} />
        <StackComponent.Screen
          name={'DeliveryTracking'}
          component={DeliveryTracking}
        />
        <StackComponent.Screen name={'Wishlist'} component={Wishlist} />
        <StackComponent.Screen name={'Profile'} component={Profile} />
        <StackComponent.Screen name={'Address'} component={Address} />
        <StackComponent.Screen name={'EditProfile'} component={EditProfile} />
        <StackComponent.Screen name={'Coupons'} component={Coupons} />
        <StackComponent.Screen name={'Payment'} component={Payment} />
        <StackComponent.Screen
          name={'AddDeliveryAddress'}
          component={AddDeliveryAddress}
        />
        <StackComponent.Screen name={'Filter'} component={Filter} />
        <StackComponent.Screen name={'Search'} component={Search} />
        <StackComponent.Screen name={'Components'} component={Components} />
        <StackComponent.Screen name={'Accordion'} component={AccordionScreen} />
        <StackComponent.Screen name={'ActionSheet'} component={ActionSheet} />
        <StackComponent.Screen name={'ActionModals'} component={ActionModals} />
        <StackComponent.Screen name={'Buttons'} component={Buttons} />
        <StackComponent.Screen name={'Charts'} component={Charts} />
        <StackComponent.Screen name={'Chips'} component={Chips} />
        <StackComponent.Screen
          name={'CollapseElements'}
          component={CollapseElements}
        />
        <StackComponent.Screen
          name={'DividerElements'}
          component={DividerElements}
        />
        <StackComponent.Screen name={'FileUploads'} component={FileUploads} />
        <StackComponent.Screen name={'Inputs'} component={Inputs} />
        <StackComponent.Screen name={'Headers'} component={Headers} />
        <StackComponent.Screen name={'Footers'} component={Footers} />
        <StackComponent.Screen name={'TabStyle1'} component={TabStyle1} />
        <StackComponent.Screen name={'TabStyle2'} component={TabStyle2} />
        <StackComponent.Screen name={'TabStyle3'} component={TabStyle3} />
        <StackComponent.Screen name={'TabStyle4'} component={TabStyle4} />
        <StackComponent.Screen name={'lists'} component={ListScreen} />
        <StackComponent.Screen name={'Paginations'} component={Paginations} />
        <StackComponent.Screen name={'Pricings'} component={Pricings} />
        <StackComponent.Screen name={'Snackbars'} component={Snackbars} />
        <StackComponent.Screen name={'Swipeable'} component={SwipeableScreen} />
        <StackComponent.Screen name={'Tabs'} component={Tabs} />
        <StackComponent.Screen name={'Tables'} component={Tables} />
        <StackComponent.Screen name={'Toggles'} component={Toggles} />
        <StackComponent.Screen name={'SliderBestProduct'} component={Slider} />
        <StackComponent.Screen name={'Checkout'} component={Checkout} />
      </StackComponent.Navigator>
    </>
  );
};

export default StackNavigator;
