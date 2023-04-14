import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';
import RenderPNG from './RenderPNG';
import Images from '../constants/Images';
import Fonts from '../constants/Fonts';
import DatePicker from 'react-native-date-picker';

export default function DateInput({
  style,
  value,
  setValue = () => {},
  textStyle,
  ...props
}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleConfirmValue(date) {
    setOpen(false);
    setDate(date);
    setValue(date.toISOString().split('T')[0]);
  }

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal} activeOpacity={0.7}>
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
            <RenderPNG imageSource={Images.calendar} />
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
              showSoftInputOnFocus={false}
              caretHidden={false}
              editable={false}
              style={{
                width: '100%',
                paddingLeft: Sizes.space4,
                ...Fonts.body5,
                fontWeight: '600',
                ...textStyle,
              }}
              {...props}
            />
          </View>
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={handleConfirmValue}
        onCancel={handleCloseModal}
      />
    </>
  );
}
