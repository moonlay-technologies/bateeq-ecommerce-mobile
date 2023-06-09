import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS} from '../constants/theme';

const ExpandableSection = ({title, children}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleExpanded}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.title,
            ...FONTS.fontSatoshiBold,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: COLORS.title,
            ...FONTS.fontSatoshiRegular,
          }}>
          {isExpanded ? '-' : '+'}
        </Text>
      </TouchableOpacity>

      {isExpanded && children}
    </>
  );
};

export const Footer = () => {
  return (
    <View style={{padding: 30, backgroundColor: '#EEEEEE'}}>
      <ExpandableSection title="Catalogue">
        <View>
          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>New Arrival</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Men</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Women</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Kids</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Sale</Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>

      <ExpandableSection title="Customer Care">
        <View style={{gap: 10}}>
          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>FAQs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Shipping & Returns</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>

      <ExpandableSection title="About Us">
        <View style={{gap: 10}}>
          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Our Story</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Our Team</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Careers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Blog</Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>
    </View>
  );
};

export const ShowHideProductDetail = () => {
  return (
    <View style={{marginTop: 50}}>
      <ExpandableSection title="Product Size Chart">
        <View style={{marginBottom: 20}}>
        <Image
            style={{width: 333, height: 333}}
            source={require('../assets/images/size-chart.png')}
          />
        </View>
      </ExpandableSection>

      <ExpandableSection title="Product Care">
        <View style={{}}>
          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>FAQs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Shipping & Returns</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>

      <ExpandableSection title="Shipping & Return Policy">
        <View style={{marginTop: 10, borderBottomWidth: 1, borderBottomColor: COLORS.danger}}>
          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Careers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginBottom: 10}}>
            <Text>Blog</Text>
          </TouchableOpacity>
        </View>
      </ExpandableSection>
    </View>
  );
};

const showHideMenu = {Footer, ShowHideProductDetail}

export default showHideMenu
