import Profile from '../../screens/Account/Profile';
import MainHome from '../../screens/Home/MainHome';
import Orders from '../../screens/Orders/Orders';
import Search from '../../screens/Search/Search';

// asset
import HomeIcon from '../../assets/images/icons/home.png';
// import favourite from '../../assets/images/icons/favourite.png';
import SearchIcon from '../../assets/images/icons/search.png';
import UserIcon from '../../assets/images/icons/user.png';
import ReceiptIcon from '../../assets/images/icons/receipt.png';

export default [
  {
    name: 'Home',
    component: MainHome,
    icon: HomeIcon,
    navigate: 'Home',
  },
  {
    name: 'Search',
    component: Search,
    icon: SearchIcon,
    navigate: 'Search',
  },
  {
    name: 'Orders',
    component: Orders,
    icon: ReceiptIcon,
    navigate: 'Orders',
  },
  {
    name: 'Profile',
    component: Profile,
    icon: UserIcon,
    navigate: 'Profile',
  },
];
