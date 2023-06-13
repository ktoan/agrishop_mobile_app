import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import Shadow from '../../constants/Shadow';
import Fonts from '../../constants/Fonts';
import Input from '../Input';
import RenderPNG from '../RenderPNG';
import Images from '../../constants/Images';
import {useState} from 'react';
import {Rating} from 'react-native-ratings';
import Button from '../Button';
import {showErrorToast} from '../../utils/ToastActions';
import {addReviewToProduct} from '../../redux/actions/productActions';
import {useDispatch} from 'react-redux';

const LeaveReviewItem = ({data = null}) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    comment: '',
    value: 0,
  });

  function onChangeTextInput(value, name) {
    setFormValue(formValue => ({...formValue, [name]: value}));
  }

  function onChangeRatingValue(value) {
    setFormValue(formValue => ({...formValue, value}));
  }

  function onSubmitForm() {
    let permitSubmit = true;
    if (!formValue.comment || !formValue.value) {
      showErrorToast('All fields must be filled and rating at least 1');
      permitSubmit = false;
    }
    if (permitSubmit) {
      addReviewToProduct(dispatch, formValue, data.id, () => {
        setFormValue({
          comment: '',
          value: 0,
        });
      });
    }
  }

  return (
    data && (
      <View
        style={{
          marginBottom: Sizes.space3,
          backgroundColor: Colors.white,
          paddingVertical: Sizes.space3,
          paddingHorizontal: Sizes.space4,
          ...Shadow,
        }}>
        <Text style={{...Fonts.h4, marginBottom: Sizes.space3}}>
          {data.name}
        </Text>
        <Text
          style={{
            ...Fonts.body4,
            color: Colors.grey,
            marginBottom: Sizes.space3,
          }}>
          ${data.price.toFixed(2)}
        </Text>
        <Rating
          style={{marginBottom: Sizes.space3}}
          startingValue={formValue.value}
          imageSize={30}
          jumpValue={0.5}
          onFinishRating={newRating => onChangeRatingValue(newRating)}
        />
        <Input
          placeholder="Enter your review"
          style={{marginBottom: Sizes.space3}}
          value={formValue.comment}
          onChangeText={value => onChangeTextInput(value, 'comment')}
          renderLeftIcon={() => <RenderPNG imageSource={Images.comment} />}
        />
        <Button
          onPress={() => onSubmitForm()}
          text="Submit"
          textStyle={{...Fonts.body4}}
        />
      </View>
    )
  );
};

export default LeaveReviewItem;
