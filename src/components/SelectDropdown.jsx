import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Sizes from '../constants/Sizes';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function SelectDropdown({
  label,
  data,
  onChangeValue = () => {},
  style,
  textStyle,
  placeholderStyle,
  renderLeftIcon = () => {},
  ...props
}) {
  const [value, setValue] = useState(null);
  return (
    <View style={{marginBottom: Sizes.space3}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.light,
          backgroundColor: Colors.light,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: Sizes.space4,
          paddingVertical: Sizes.space3,
          borderRadius: 10,
          ...style,
        }}>
        <Dropdown
          value={value}
          renderLeftIcon={renderLeftIcon}
          placeholder={label}
          data={data}
          {...props}
          style={{width: '100%'}}
          placeholderStyle={{
            paddingLeft: Sizes.space4,
            ...Fonts.body5,
          }}
          selectedTextStyle={{paddingLeft: Sizes.space4, ...Fonts.body5}}
          onChange={item => {
            setValue(item.value);
            onChangeValue(item.value);
          }}
          showsVerticalScrollIndicator={false}
          labelField="label"
          valueField="value"
        />
      </View>
    </View>
  );
}
