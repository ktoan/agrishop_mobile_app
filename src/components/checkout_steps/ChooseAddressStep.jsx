import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Sizes from '../../constants/Sizes';
import {useEffect} from 'react';
import SelectDropdown from '../SelectDropdown';
import {useState} from 'react';
import RenderPNG from '../RenderPNG';
import Images from '../../constants/Images';

const ChooseAddressStep = ({addresses, onChangeAddress = () => {}}) => {
  const [mapAddresses, setMapAddresses] = useState([]);

  useEffect(() => {
    const mappedData = addresses.reduce((arr, address) => {
      let newElement = {
        label: `${address.street}, ${address.district}, ${address.state}, ${address.country}`,
        value: address.id,
      };
      arr.push(newElement);
      return arr;
    }, []);
    setMapAddresses(mappedData);
  }, [addresses]);

  return (
    <View style={{paddingHorizontal: Sizes.space4}}>
      <SelectDropdown
        onChangeValue={value => onChangeAddress(value)}
        renderLeftIcon={() => <RenderPNG imageSource={Images.address} />}
        label="Choose shipping address"
        data={mapAddresses}
      />
    </View>
  );
};

export default ChooseAddressStep;
