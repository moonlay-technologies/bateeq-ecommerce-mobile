import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_PAGE_STORY } from '../service/graphql/query/main-home';
import { gqlError } from '../utils/error-handling';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

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
  const [dataPages, setDataPages] = useState(null);

  const { loading: loadingPages } = useQuery(GET_PAGE_STORY, {
    fetchPolicy: 'no-cache',
    variables: {
      handle: 'contact',
    },
    onCompleted: ({ page }) => {
      if (page) {
        setDataPages(page);
      }
    },
    onError: err => {
      onError(err);
    },
  });

  return (
    <View style={{ padding: 30, backgroundColor: '#EEEEEE' }}>
      <ExpandableSection title="Catalogue">
        <View>
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate('Items', { query: 'New Arrival' })}
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
              navigation.navigate('ContactUs', {
                dataPages: dataPages,
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
              navigation.navigate('ContactUs', {
                dataPages: dataPages,
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

      <ExpandableSection title="About Us">
        <View style={{ gap: 10 }}>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: COLORS.title,
              }}
              onPress={() =>
                navigation.navigate('PageOurStory', {
                  dataPages: dataPagesStory,
                  loadingPages,
                })
              }
            >
              Our Story
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
              {' '}
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
