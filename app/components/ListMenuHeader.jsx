import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MenuListHeader({ dataListMenu, dataStory }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const navigation = useNavigation();

  const toggleSubMenu = menu => {
    setActiveSubMenu(prevActiveMenu => (prevActiveMenu === menu.id ? null : menu.id));
    if (menu.title === 'OUR STORY') {
      navigation.navigate('PagesInShopify', { dataPages: dataStory });
    }
  };

  const renderSubMenu = subMenu => {
    return subMenu.map(item => (
      <TouchableOpacity
        style={[styles.subMenuItem, { borderBottomWidth: 0 }]}
        key={item.id}
        onPress={() => {
          if (!item.items) {
            toggleSubMenu(item);
          } else if (item.title === 'SHOP MENSWEAR') {
            navigation.navigate('Items', { query: 'men' });
          } else if (item.title === 'SHOP WOMENSWEAR') {
            navigation.navigate('Items', { query: 'women' });
          } else if (item.title === 'SHOP KIDSWEAR') {
            navigation.navigate('Items', { query: 'kids' });
          } else {
            navigation.navigate('Items', { query: item?.title });
          }
        }}
      >
        <Text style={styles.subMenuText}>{item.title}</Text>
        {item.items && (
          <View style={styles.nestedSubMenuContainer}>
            {item.items.map(subItem => (
              <TouchableOpacity
                style={styles.subMenuItem}
                key={subItem.id}
                onPress={() => navigation.navigate('Items', { query: subItem?.title })}
              >
                <Text style={styles.subMenuNestedText}>{subItem.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  const renderMainMenu = dataMenu => {
    return dataMenu?.menu?.items?.map(item => (
      <View key={item?.id} style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton} onPress={() => toggleSubMenu(item)}>
          <Text style={styles.subMenuNestedText}>{item?.title}</Text>
        </TouchableOpacity>
        {item.items && activeSubMenu === item.id && (
          <View style={item.items.length !== 0 ? styles.subMenuContainer : null}>
            <ScrollView style={{ maxHeight: 200 }}>{renderSubMenu(item?.items)}</ScrollView>
          </View>
        )}
      </View>
    ));
  };

  return <View style={{ flexDirection: 'row' }}>{renderMainMenu(dataListMenu)}</View>;
}

export default MenuListHeader;

const styles = {
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  menuItem: {
    justifyContent: 'center',
    alignItem: 'center',
    marginLeft: 'auto',
  },
  menuItemButton: {
    padding: 10,
  },
  menuText: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
  subMenuContainer: {
    position: 'absolute',
    top: '100%',
    width: 115,
    left: 0,
    borderColor: '#9DB2BF',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 6,
    zIndex: 10,
  },
  nestedSubMenuContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 5,

    paddingHorizontal: 10,
  },
  subMenuItem: {
    paddingVertical: 5,
  },
  subMenuText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  subMenuNestedText: {
    fontSize: 11,
    color: 'black',
  },
};
