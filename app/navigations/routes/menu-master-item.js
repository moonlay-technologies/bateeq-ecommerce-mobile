import OrderDetail from '../../screens/Orders/OrdersDetail';
import Orders from '../../screens/Orders/Orders';
import ProductDetail from '../../screens/Products/ProductDetail';
import DrawerNavigation from '../DrawerNavigation';
import PagesInShopify from '../../screens/Pages/PageByRoute';
import Home from '../../screens/Home/MainHome';
import Cart from '../../screens/Cart/Cart';
import Checkout from '../../screens/Checkout/Checkout';
import Items from '../../screens/Items/Items';
import AddressList from '../../screens/Account/Address/Address';
import AddAddress from '../../screens/Account/Address/Add';
import EditAddress from '../../screens/Account/Address/Edit';
import ChangePassword from '../../screens/Account/ChangePassword';
import AccountDetails from '../../screens/Account/EditProfile';
import Profile from '../../screens/Account/Profile';
import SignIn from '../../screens/Auth/SignIn';
import BottomNavigation from '../../component-template/BottomNavigate';
import Search from '../../screens/Search/Search';

export default [
  {
    name: 'DrawerNavigation',
    component: DrawerNavigation,
  },
  {
    name: 'BottomNavigation',
    component: BottomNavigation,
  },
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'OrderDetail',
    component: OrderDetail,
  },
  {
    name: 'Orders',
    component: Orders,
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
    name: 'EditAddress',
    component: EditAddress,
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
    name: 'ChangePassword',
    component: ChangePassword,
  },
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'PagesInShopify',
    component: PagesInShopify,
  },
  {
    name: 'Cart',
    component: Cart,
  },
  {
    name: 'Search',
    component: Search,
  },
];
