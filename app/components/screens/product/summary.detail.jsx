import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { formatWithCommas, priceToPercent } from '../../../utils/helper';
import { COLORS } from '../../../constants/theme';

function mapStateToProps(state) {
  return {};
}

/**
 * @param {object} props
 * @param {object} props.price
 * @param {number | string} props.price.regular
 * @param {number | string} props.price.discount
 * @param {string | '%' | 'Rp' | '$'} props.price.prefix
 * @returns {JSX.Element}
 */
function SummaryDetail(props) {
  const { price, title } = props;
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 15, width: '100%' }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        {typeof price?.discount === 'boolean' ? (
          <Text style={{ fontWeight: '700', fontSize: 18, color: COLORS.title }}>
            {[price?.prefix, formatWithCommas(Number(price?.regular))].join('. ') || ''}
          </Text>
        ) : price?.discount && price?.discount > price?.regular ? (
          <Text style={{ fontWeight: '700', fontSize: 18, color: COLORS.title }}>
            {[price?.prefix, formatWithCommas(Number(price?.regular))].join('. ') || ''}
          </Text>
        ) : (
          <Text style={{ fontWeight: '700', fontSize: 18, color: COLORS.title }}>
            {[price?.prefix, formatWithCommas(Number(price?.discount))].join('. ') || ''}
          </Text>
        )}
        {/* <View style={{ height: 30, width: 30, backgroundColor: '#FF7878', borderRadius: 15 }} /> */}
      </View>
      {price?.discount && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: 'rgba(255, 120, 120,.8)',
              marginRight: 10,
            }}
          >
            <Text style={{ color: '#FFFFFF' }}>{[priceToPercent(price?.regular, price?.discount), '%'].join(' ')}</Text>
          </View>
          <Text style={{ textDecorationLine: 'line-through' }}>
            {typeof price?.regular !== 'undefined' && price?.regular
              ? [price?.prefix, price?.discount].join('. ')
              : '-'}
          </Text>
        </View>
      )}

      <View style={{ marginTop: 5 }}>
        <Text numberOfLines={3} style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.title }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(SummaryDetail);
