import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { gqlError } from '../utils/eror-handling';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { GET_SHIPPING_POLICY, GET_PAGES } from '../graphql/queries';

function ExpandableSection({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const onError = err => {
    gqlError({ error: err, Toast });
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleExpanded}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: COLORS.title,
            ...FONTS.fontSatoshiBold,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: COLORS.title,
            ...FONTS.fontSatoshiRegular,
          }}
        >
          {isExpanded ? '-' : '+'}
        </Text>
      </TouchableOpacity>

      {isExpanded && children}
    </>
  );
}

export const Footer = ({ dataPagesStory }) => {
  const navigation = useNavigation();
  const [pageContactUs, setPageContactUs] = useState(null);
  console.log('pageContactUs', pageContactUs);
  const [pageFaq, setPageFaq] = useState(null);

  const { data: dataPageContactUs, loading: loadingPages } = useQuery(GET_PAGES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      handle: 'contact',
    },
  });

  const { data: dataPageFaq, loading: loadingPageFaq } = useQuery(GET_PAGES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      handle: 'f-a-q',
    },
  });

  const { data: dataPageShippingPolicy, loading: loadingShippingPolicy } = useQuery(GET_SHIPPING_POLICY, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (dataPageContactUs) {
      setPageContactUs(dataPageContactUs?.page);
    }
    if (dataPageFaq) {
      setPageFaq(dataPageFaq?.page);
    }
  }, [dataPageContactUs, dataPageFaq]);

  return (
    <View style={{ padding: 30, backgroundColor: '#EEEEEE' }}>
      <ExpandableSection title="Catalogue">
        <View>
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate('Items', { query: 'New Variants' })}
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              New Arrival
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Items', { query: 'Men' })}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Men
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate('Items', { query: 'Women' })}
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Women
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate('Items', { query: 'Kids' })}
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Kids
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate('Items', { query: 'Sale' })}
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Sale
            </Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>

      <ExpandableSection title="Customer Care">
        <View style={{ gap: 10 }}>
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() =>
              navigation.navigate('PagesInShopify', {
                dataPages: pageFaq,
                loadingPages,
              })
            }
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              FAQs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() =>
              navigation.navigate('PagesInShopify', {
                dataPages: pageContactUs,
                loadingPages,
              })
            }
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Contact Us
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Shipping & Returns
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() =>
              navigation.navigate('PagesInShopify', {
                dataPages: dataPageShippingPolicy.shop.termsOfService,
                loadingPages,
              })
            }
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Term of Service
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity> */}
        </View>
      </ExpandableSection>

      <ExpandableSection title="About Company">
        <View style={{ gap: 10 }}>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
              onPress={() => Linking.openURL('http://www.bateeq.com/our-story/')}
            >
              About Bateeq
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => Linking.openURL('http://www.bateeq.com/sustainability-journey/')}
          >
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Our Responsibility
            </Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>
    </View>
  );
};

export function ShowHideProductDetail() {
  return (
    <View style={{ marginTop: 50 }}>
      <ExpandableSection title="Product Size Chart">
        <View style={{ marginBottom: 20 }}>
          <Image style={{ width: 333, height: 333 }} source={require('../assets/images/size-chart.png')} />
        </View>
      </ExpandableSection>

      <ExpandableSection title="Product Care">
        <View style={{}}>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              FAQs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Contact Us
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Shipping & Returns
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>

      <ExpandableSection title="Shipping & Return Policy">
        <View
          style={{
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.danger,
          }}
        >
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Careers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
            >
              Blog
            </Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>
    </View>
  );
}

const showHideMenu = { Footer, ShowHideProductDetail };

export default showHideMenu;
