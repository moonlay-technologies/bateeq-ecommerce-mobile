import AddAddress from '../screens/Account/Address/Add';
import AddressList from '../screens/Account/Address/Address';
import AppSetting from '../screens/Account/AppSetting';
import AccountDetails from '../screens/Account/EditProfile';
import Profile from '../screens/Account/Profile';
import ResetPassword from '../screens/Auth/ResetPassword';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import Checkout from '../screens/Checkout/Checkout';
import Items from '../screens/Items/Items';
import Onboarding from '../screens/Onboarding/Onboarding';
import OrderDetail from '../screens/Orders/OrdersDetail';
import ProductDetail from '../screens/Products/ProductDetail';
import DrawerNavigation from './DrawerNavigation';
import PagesInShopify from '../screens/Pages/PageByRoute';

export const AuthScreens = [
  {
    name: 'DrawerNavigation',
    component: DrawerNavigation,
  },
  {
    name: 'OrderDetail',
    component: OrderDetail,
  },
  {
    name: 'Profile',
    component: Profile,
  },
  {
    name: 'EditProfile',
    component: AccountDetails,
  },
  {
    name: 'Address',
    component: AddressList,
  },
  {
    name: 'AddAddress',
    component: AddAddress,
  },
  {
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    name: 'Checkout',
    component: Checkout,
  },

  {
    name: 'Items',
    component: Items,
  },
  {
    name: 'AppSetting',
    component: AppSetting,
  },
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'PagesInShopify',
    component: PagesInShopify,
  },
];

export const Screens = [
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'SignUp',
    component: SignUp,
  },
  {
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    name: 'Onboarding',
    component: Onboarding,
  },

  //   {
  //     name: 'AppSetting',
  //     component: AppSetting,
  //   },
  //   {
  //     name: 'AppSetting',
  //     component: AppSetting,
  //   },
];
