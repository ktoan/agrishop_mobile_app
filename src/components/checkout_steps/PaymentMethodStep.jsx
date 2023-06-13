import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CreditCard from 'react-native-credit-card';
import MonthPicker from 'react-native-month-year-picker';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Sizes from '../../constants/Sizes';
import Input from '../Input';
import RenderPNG from '../RenderPNG';
import SelectDropdown from '../SelectDropdown';

const PaymentMethodStep = ({
  cardDetailsForm,
  setCardDetailsForm,
  paymentMethod,
  onChangePaymentMethod = () => {},
}) => {
  const paymentMethods = [
    {label: 'Card', value: 'CARD'},
    {label: 'Ship code', value: 'SHIP_CODE'},
    {label: 'Banking', value: 'BANKING'},
  ];

  function onChangeTextInput(name, value) {
    setCardDetailsForm(prev => ({...prev, [name]: value}));
  }

  const [focused, setFocused] = useState('');
  const [isShowed, setShowed] = useState(false);
  const [startedDate, setStartedDate] = useState(
    cardDetailsForm.expiry || new Date(),
  );

  return (
    <View style={{paddingHorizontal: Sizes.space4}}>
      {paymentMethod ? (
        <>
          {paymentMethod === 'CARD' ? (
            <View>
              <CreditCard
                imageFront={Images.cardFront}
                imageBack={Images.cardBack}
                style={{marginBottom: Sizes.space3}}
                focused={focused}
                number={cardDetailsForm.number}
                expiry={`${cardDetailsForm.expMonth}/${cardDetailsForm.expYear}`}
                cvc={cardDetailsForm.cvc}
                name={cardDetailsForm.name}
              />
              <Input
                value={cardDetailsForm.number}
                onFocus={() => setFocused('number')}
                placeholder="Card number"
                renderLeftIcon={() => <RenderPNG imageSource={Images.visa} />}
                style={{marginBottom: Sizes.space3}}
                onChangeText={value => onChangeTextInput('number', value)}
              />
              <Input
                value={cardDetailsForm.name}
                placeholder="Name of card owner"
                renderLeftIcon={() => (
                  <RenderPNG imageSource={Images.userFilled} />
                )}
                style={{marginBottom: Sizes.space3}}
                onChangeText={value => onChangeTextInput('name', value)}
              />
              <Input
                value={cardDetailsForm.cvc}
                onChangeText={value => onChangeTextInput('cvc', value)}
                onFocus={() => setFocused('cvc')}
                placeholder="CVC"
                style={{marginBottom: Sizes.space3}}
                renderLeftIcon={() => <RenderPNG imageSource={Images.cvc} />}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowed(true)}>
                <Input
                  editable={false}
                  caretHidden
                  placeholder="Expiry"
                  style={{marginBottom: Sizes.space3}}
                  renderLeftIcon={() => (
                    <RenderPNG imageSource={Images.calendar} />
                  )}
                  value={`${cardDetailsForm.expMonth || 'MM'}/${
                    cardDetailsForm.expYear || 'YY'
                  }`}
                />
              </TouchableOpacity>
              {isShowed && (
                <MonthPicker
                  onChange={(e, newDate) => {
                    const value = newDate.toLocaleDateString();
                    let expMonth =
                      value.split('/')[0].length === 1
                        ? `0${value.split('/')[0]}`
                        : value.split('/')[0];
                    let expYear = value.split('/')[2];
                    setShowed(false);
                    setCardDetailsForm(prev => ({
                      ...prev,
                      expMonth,
                      expYear,
                    }));
                  }}
                  value={startedDate}
                  minimumDate={new Date()}
                />
              )}
            </View>
          ) : (
            <Text>Others</Text>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onChangePaymentMethod(null)}>
            <Text style={{...Fonts.body4, color: Colors.grey}}>
              Back to choose payment method
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <SelectDropdown
          data={paymentMethods}
          onChangeValue={onChangePaymentMethod}
          renderLeftIcon={() => <RenderPNG imageSource={Images.payment} />}
        />
      )}
    </View>
  );
};

export default PaymentMethodStep;
