import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import {changeFilters} from '../redux/actions/productActions';
import {convertCategoryFromServerToRendered} from '../utils/CategoryHandling';
import {getMaxAndMinPriceProduct} from '../utils/ProductHandling';
import TwoPointSlider from './TwoPointSlider';

const FilterProductModal = ({
  isVisible,
  filters,
  categories,
  onClose = () => {},
  products,
  changeFilters,
}) => {
  const dispatch = useDispatch();
  const modalAnimationValue = useRef(new Animated.Value(0)).current;
  const [showFilterProductModal, setShowFilterProductModal] =
    useState(isVisible);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const [maxValue, setMax] = useState(100);
  const [minValue, setMin] = useState(0);

  const onChangeRateRangeTimeout = useRef(null);
  const onChangePriceRangeTimeout = useRef(null);

  function onChangeTwoPointsRate(values) {
    if (onChangeRateRangeTimeout) {
      clearTimeout(onChangeRateRangeTimeout.current);
    }
    onChangeRateRangeTimeout.current = setTimeout(() => {
      changeFilters(dispatch, {rateRange: values});
    }, 1000);
  }

  function onChangeTwoPointsPrice(values) {
    if (onChangePriceRangeTimeout) {
      clearTimeout(onChangePriceRangeTimeout.current);
    }
    onChangePriceRangeTimeout.current = setTimeout(() => {
      changeFilters(dispatch, {priceRange: values});
    }, 1000);
  }

  useEffect(() => {
    setItems(convertCategoryFromServerToRendered(categories));
    setValue(filters.categories);
    if (showFilterProductModal) {
      Animated.timing(modalAnimationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
    const {max, min} = getMaxAndMinPriceProduct(products);
    setMax(max);
    setMin(min);
  }, [showFilterProductModal]);

  const modalY = modalAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Sizes.height, Sizes.height - 680],
  });

  const Section = ({title, children}) => {
    return (
      <View style={{paddingVertical: Sizes.space3}}>
        <Text
          style={{
            ...Fonts.body4,
            color: Colors.grey,
          }}>
          {title}
        </Text>
        {children}
      </View>
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: Colors.overlay}}>
        <TouchableWithoutFeedback
          onPress={() => setShowFilterProductModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: Colors.white,
          }}>
          <Text style={{...Fonts.h4, marginBottom: Sizes.space3}}>
            Filter Product
          </Text>
          <Section title={'Price'}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TwoPointSlider
                values={filters.priceRange}
                min={0}
                max={200}
                prefix={'$'}
                onValuesChange={values => onChangeTwoPointsPrice(values)}
                step={5}
              />
            </View>
          </Section>
          <Section title={'Rate'}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TwoPointSlider
                values={filters.rateRange}
                min={0}
                max={5}
                prefix={'$'}
                onValuesChange={values => onChangeTwoPointsRate(values)}
                step={0.5}
              />
            </View>
          </Section>
        </Animated.View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    filters: state.product.filters,
    categories: state.category.categories,
    products: state.product.products,
  };
};

const mapActionToProps = () => {
  return {changeFilters};
};

export default connect(mapStateToProps, mapActionToProps)(FilterProductModal);
