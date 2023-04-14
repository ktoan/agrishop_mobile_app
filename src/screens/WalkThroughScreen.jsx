import React, {useRef} from 'react';
import {Animated, Image, Text, View} from 'react-native';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import {walkthrough} from '../constants/Data';
import Fonts from '../constants/Fonts';
import Shadow from '../constants/Shadow';
import Sizes from '../constants/Sizes';

const WalkThroughScreen = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, Sizes.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {walkthrough.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [Colors.grey, Colors.primary, Colors.grey],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                width: 10,
                height: 10,
                backgroundColor: dotColor,
                marginHorizontal: Sizes.space1,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Animated.FlatList
        data={walkthrough}
        keyExtractor={item => item.id}
        horizontal
        snapToInterval={Sizes.width}
        decelerationRate={'normal'}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={30}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <View style={{width: Sizes.width, justifyContent: 'center'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{height: Sizes.height * 0.5, width: '100%'}}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  height: Sizes.height * 0.35,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: Sizes.space3,
                }}>
                <Text style={{...Fonts.h1}}>{item.title}</Text>
                <Text
                  style={{
                    ...Fonts.body3,
                    marginTop: Sizes.space2,
                    color: Colors.grey,
                    textAlign: 'center',
                  }}>
                  {item.sub_title}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {/* Footer  */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: Sizes.height * 0.2,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.space4,
          paddingVertical: Sizes.space3,
        }}>
        <Dots />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Button
            onPress={() => navigation.navigate('LoginScreen')}
            text="Login"
            style={{flex: 1, marginLeft: Sizes.space1, ...Shadow}}
          />
          <Button
            onPress={() => navigation.navigate('RegisterScreen')}
            text="Register"
            bgColor={Colors.white}
            bdColor={Colors.white}
            fgColor={Colors.primary}
            style={{flex: 1, marginRight: Sizes.space1}}
          />
        </View>
      </View>
    </View>
  );
};

export default WalkThroughScreen;
