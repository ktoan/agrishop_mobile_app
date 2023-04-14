import {View, Text} from 'react-native';
import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Sizes from '../constants/Sizes';
import Colors from '../constants/Colors';
import Shadow from '../constants/Shadow';
import Fonts from '../constants/Fonts';

const TwoPointSlider = ({
  values,
  min,
  max,
  prefix,
  postFix,
  onValuesChange,
  step = 1,
}) => {
  return (
    <MultiSlider
      values={values}
      sliderLength={Sizes.width - Sizes.space3 * 4}
      min={min}
      max={max}
      step={step}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: Colors.primary,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: Colors.light,
      }}
      minMarkerOverlapDistance={50}
      customMarker={e => {
        return (
          <View
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 4,
                borderColor: Colors.white,
                backgroundColor: Colors.primary,
                ...Shadow,
              }}
            />
            <Text
              style={{
                marginTop: Sizes.space1,
                color: Colors.grey,
                ...Fonts.body5,
              }}>
              {prefix}
              {e.currentValue}
              {postFix}
            </Text>
          </View>
        );
      }}
      onValuesChange={values => onValuesChange(values)}
    />
  );
};

export default TwoPointSlider;
