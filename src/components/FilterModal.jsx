import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import {categories, products} from '../constants/FakeData';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import {getMaxAndMinPriceProduct} from '../utils/ProductHandling';
import DropDownPicker from 'react-native-dropdown-picker';
import TwoPointSlider from './TwoPointSlider';
import {convertCategoryFromServerToRendered} from '../utils/CategoryHandling';

const FilterModal = ({isVisible, onClose = () => {}}) => {
  const modalAnimationValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(
    convertCategoryFromServerToRendered(categories),
  );

  useEffect(() => {
    if (showFilterModal) {
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
  }, [showFilterModal]);

  const {max, min} = getMaxAndMinPriceProduct(products);

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
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
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
                values={[min, max]}
                min={min}
                max={max}
                prefix={'$'}
                onValuesChange={values => console.log(values)}
                step={5}
              />
            </View>
          </Section>
          <Section title={'Category'}>
            <DropDownPicker
              style={{marginTop: Sizes.space3}}
              multiple
              open={open}
              autoScroll
              maxHeight={200}
              placeholder="Select categories..."
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              showTickIcon={false}
              mode="BADGE"
              badgeColors={[Colors.primary]}
              badgeTextStyle={{color: Colors.white}}
              badgeDotColors={[Colors.white]}
            />
          </Section>
          <Section title={'Rate'}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TwoPointSlider
                values={[0, 5]}
                min={0}
                max={5}
                prefix={'$'}
                onValuesChange={values => console.log(values)}
                step={0.5}
              />
            </View>
          </Section>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
