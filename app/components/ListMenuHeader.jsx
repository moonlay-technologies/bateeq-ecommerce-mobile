import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MenuItem({ item, onCloseSubMenu, isSubMenuOpen, setSubMenuOpen, dataStory, onPress }) {
  const navigation = useNavigation();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const menuItemRef = useRef(null);
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (isSubMenuOpen) {
      hideSubMenu();
    } else {
      showSubMenu();
    }

    if (item.id === 'gid://shopify/MenuItem/519458652443') {
      navigation.navigate('Items', { handle: 'special-offer-3-3', subTitle: 'SALE' });
    }
    if (item.id === 'gid://shopify/MenuItem/519530053915') {
      navigation.navigate('PagesInShopify', { dataPages: dataStory });
    }
  };

  const showSubMenu = () => {
    measureMenuItem();
    setSubMenuOpen(true);
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideSubMenu = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSubMenuOpen(false);
    });
  };

  const measureMenuItem = () => {
    menuItemRef.current.measure((x, y, width, height, pageX, pageY) => {
      setModalPosition({ top: pageY + height, left: pageX });
    });
  };
  const [subMenuOpenStates, setSubMenuOpenStates] = useState({});

  const toggleSubMenu = (itemId, value) => {
    setSubMenuOpenStates(prevState => ({
      ...prevState,
      [itemId]: value,
    }));
  };

  const closeSubMenu = () => {
    setSubMenuOpenStates({});
  };

  const subMenuStyle = [
    styles.subMenuContainer,
    { top: modalPosition.top, left: modalPosition.left, opacity: fadeAnimation },
  ];

  const handleSubItemPress = subItem => {
    switch (subItem?.id) {
      case 'gid://shopify/MenuItem/538806976795':
        navigation.navigate('Items', { handle: 'tampa-1', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/526979334427':
        navigation.navigate('Items', { handle: 'kamala-collections', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845440795':
        navigation.navigate('Items', { handle: 'padma', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845473563':
        navigation.navigate('Items', { handle: 'peksi-kawung', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/526979137819':
        navigation.navigate('Items', { handle: 'samara', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845571867':
        navigation.navigate('Items', { handle: 'loka', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845408027':
        navigation.navigate('Items', { handle: 'cakiyar', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/526526349595':
        navigation.navigate('Items', { handle: 'monez', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845276955':
        navigation.navigate('Items', { handle: 'miwiti-collection', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845309723':
        navigation.navigate('Items', { handle: 'nalika-collection', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/526979367195':
        navigation.navigate('Items', { handle: 'zora', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845342491':
        navigation.navigate('Items', { handle: 'danadyaksa-collection', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/521845244187':
        navigation.navigate('Items', { handle: 'nostalgia-collection', subTitle: subItem.title });
        break;
      case 'gid://shopify/MenuItem/519704019227':
        navigation.navigate('Items', { handle: 'shirt-1', subTitle: 'MEN' });
        break;
      case 'gid://shopify/MenuItem/519704051995':
        navigation.navigate('Items', { handle: 'outer', subTitle: 'WOMEN' });
        break;
      case 'gid://shopify/MenuItem/525267632411':
        navigation.navigate('Items', { handle: 'boys', subTitle: 'KIDS' });
        break;
      default:
        navigation.navigate('Items', { handle: subItem.title, subTitle: subItem.title });
        break;
    }
  };

  const renderSubMenuItems = items => {
    return items.map(subItem => (
      <MenuItem
        key={subItem.id}
        item={subItem}
        onCloseSubMenu={closeSubMenu}
        isSubMenuOpen={subMenuOpenStates[subItem.id] || false}
        setSubMenuOpen={value => toggleSubMenu(subItem.id, value)}
        onPress={() => handleSubItemPress(subItem)}
      />
    ));
  };

  return (
    <View style={styles.menuItemContainer}>
      <TouchableOpacity onPress={onPress || handlePress} ref={menuItemRef}>
        <Text style={styles.menuItemTitle}>{item.title}</Text>
      </TouchableOpacity>
      {isSubMenuOpen && (
        <Modal visible={isSubMenuOpen} transparent>
          <TouchableWithoutFeedback onPress={hideSubMenu}>
            <View style={styles.modalContainer}>
              <Animated.View style={subMenuStyle}>
                <ScrollView contentContainerStyle={styles.subMenuScrollContainer}>
                  {item.items.map(subItem => (
                    <MenuItem
                      key={subItem.id}
                      item={subItem}
                      onCloseSubMenu={closeSubMenu}
                      isSubMenuOpen={subMenuOpenStates[subItem.id] || false}
                      setSubMenuOpen={value => toggleSubMenu(subItem.id, value)}
                      onPress={() => handleSubItemPress(subItem)}
                    />
                  ))}
                </ScrollView>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

function MenuListHeader({ dataListMenu, dataStory }) {
  const [subMenuOpenStates, setSubMenuOpenStates] = useState({});

  const toggleSubMenu = (itemId, value) => {
    setSubMenuOpenStates(prevState => ({
      ...prevState,
      [itemId]: value,
    }));
  };

  const closeSubMenu = () => {
    setSubMenuOpenStates({});
  };

  return (
    <ScrollView contentContainerStyle={styles.menuContainer} horizontal showsHorizontalScrollIndicator={false}>
      {dataListMenu?.menu?.items?.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          onCloseSubMenu={closeSubMenu}
          isSubMenuOpen={subMenuOpenStates[item.id] || false}
          setSubMenuOpen={value => toggleSubMenu(item.id, value)}
          dataStory={dataStory}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 16,
    marginBottom: 6,
    flexDirection: 'row',
    width: 'auto',
  },
  menuItemContainer: {
    width: 'auto',
    marginHorizontal: 8,
  },
  menuItemTitle: {
    fontSize: 13,
    color: '#333',
    paddingTop: 4,
    paddingBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subMenuContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 999,
    maxHeight: 200,
  },
  subMenuScrollContainer: {
    flexGrow: 1,
  },
});

export default MenuListHeader;
