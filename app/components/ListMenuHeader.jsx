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

function MenuItem({ item, subSubItem, onCloseSubMenu, isSubMenuOpen, setSubMenuOpen, dataStory, onPress }) {
  const navigation = useNavigation();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const menuItemRef = useRef(null);
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (isSubMenuOpen) {
      hideSubMenu();
    } else {
      if (item?.items?.length > 0) {
        showSubMenu();
      } else if (item.id === 'gid://shopify/MenuItem/519530053915') {
        navigation.navigate('PagesInShopify', { dataPages: dataStory });
      } else {
        navigation.navigate('Items', { id: item.resourceId, subTitle: item.title });
      }
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

  const renderSubMenuItems = items => {
    if (items.length === 0) {
      return null;
    }
    return items.map(subItem => (
      <MenuItem
        key={subItem.id}
        item={subItem}
        onCloseSubMenu={closeSubMenu}
        isSubMenuOpen={subMenuOpenStates[subItem.id] || false}
        setSubMenuOpen={value => toggleSubMenu(subItem.id, value)}
        dataStory={dataStory}
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
                  {renderSubMenuItems(item.items)}
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
