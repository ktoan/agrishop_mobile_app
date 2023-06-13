import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Shadow from '../../constants/Shadow';
import Sizes from '../../constants/Sizes';
import RenderPNG from '../RenderPNG';
import CheckBox from '../CheckBox';
import {changeQuantity} from '../../redux/actions/cartActions';
import {connect, useDispatch} from 'react-redux';

const CartFlatListItem = ({
  data,
  isLast,
  onCheckCartItem = () => {},
  onUncheckCartItem = () => {},
  deleteCartItem = () => {},
}) => {
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);

  const ActionQuantityButton = ({imageSource, onPress = () => {}}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          padding: Sizes.space1,
          borderWidth: 1,
          borderColor: Colors.primary,
          borderRadius: 10,
        }}>
        <RenderPNG imageSource={imageSource} size={20} />
      </TouchableOpacity>
    );
  };

  function handleClickCheckBox() {
    if (!isChecked) {
      onCheckCartItem();
      setChecked(true);
    } else {
      onUncheckCartItem();
      setChecked(false);
    }
  }

  function handleOnChangeQuantity(dir) {
    if (isChecked) return;
    changeQuantity(dispatch, data.id, dir);
  }

  return (
    <View
      style={{
        paddingVertical: Sizes.space3,
        paddingHorizontal: Sizes.space4,
        backgroundColor: Colors.white,
        ...Shadow,
        marginBottom: isLast ? 0 : Sizes.space3,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
      }}>
      <RenderPNG
        imageSource={{uri: data.product.images[0].url}}
        size={100}
        style={{borderRadius: 10}}
      />
      <View style={{flex: 1, marginLeft: Sizes.space3}}>
        <Text style={{...Fonts.h4, width: '90%'}} numberOfLines={1}>
          {data.product.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Sizes.space3,
          }}>
          <Text
            style={{
              ...Fonts.body4,
              color: Colors.grey,
            }}>
            {data.quantity}
          </Text>
          <Text
            style={{
              ...Fonts.body4,
              color: Colors.grey,
            }}>
            {' '}
            x{' '}
          </Text>
          <Text
            style={{
              ...Fonts.body4,
              color: Colors.grey,
              marginRight: Sizes.space2,
            }}>
            $
            {data.product.saleOff > 0
              ? (
                  data.product.price -
                  (data.product.price * data.product.saleOff) / 100
                ).toFixed(2)
              : data.product.price.toFixed(2)}
          </Text>
          {data.product.saleOff > 0 ? (
            <Text
              style={{
                ...Fonts.body4,
                color: Colors.red,
                textDecorationLine: 'line-through',
              }}>
              ${data.product.price.toFixed(2)}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ActionQuantityButton
            imageSource={Images.subtract}
            onPress={() => handleOnChangeQuantity('minus')}
          />
          <Text style={{...Fonts.h3, marginHorizontal: Sizes.space3}}>
            {data.quantity}
          </Text>
          <ActionQuantityButton
            imageSource={Images.plus}
            onPress={() => handleOnChangeQuantity('plus')}
          />
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <TouchableOpacity activeOpacity={0.7} onPress={deleteCartItem}>
          <RenderPNG imageSource={Images.delete} />
        </TouchableOpacity>
        <CheckBox isChecked={isChecked} onPress={() => handleClickCheckBox()} />
      </View>
    </View>
  );
};

const mapStateToProps = state => () => {
  return {};
};

const mapActionToProps = () => {
  return {
    changeQuantity,
  };
};

export default connect(mapStateToProps, mapActionToProps)(CartFlatListItem);
