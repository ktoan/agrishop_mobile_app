import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import CategoryFlatListItem from '../../components/FlatListItem/CategoryFlatListItem';
import ProductFlatListItem from '../../components/FlatListItem/ProductFlatListItem';
import Input from '../../components/Input';
import RenderPNG from '../../components/RenderPNG';
import {categories, products} from '../../constants/FakeData';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import Sizes from '../../constants/Sizes';
import MainLayout from '../../layouts/MainLayout';
import FilterModal from '../../components/FilterModal';

const HomeScreen = ({navigation}) => {
  const [selectedCategoryCode, setSelectedCategoryCode] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.space4,
          paddingVertical: Sizes.space3,
        }}>
        <View>
          <Text style={{...Fonts.h4, marginBottom: Sizes.space1}}>
            Hello, Nguyen Khanh Toan
          </Text>
          <Text>What do you wanna buy for today?</Text>
        </View>
        <RenderPNG
          size={60}
          imageSource={{
            uri: 'https://scontent.fdad3-6.fna.fbcdn.net/v/t1.6435-9/169267831_1253554315046481_8931794399160773609_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a4a2d7&_nc_ohc=t799v6q8gysAX8nZybf&_nc_ht=scontent.fdad3-6.fna&oh=00_AfAz8oTtq1-HKVlLZPSYJ1DI-SSfhEX7uCvV_CktxIjtlw&oe=645DFF78',
          }}
          style={{borderRadius: 30}}
        />
      </View>
    );
  };

  function handleViewProductDetails(product) {
    navigation.navigate('Product', {
      screen: 'ProductDetailsScreen',
      params: {
        product: product,
      },
    });
  }

  return (
    <MainLayout renderHeader={renderHeader}>
      <View>
        {/* Search input */}
        <View
          style={{
            paddingHorizontal: Sizes.space4,
            paddingVertical: Sizes.space3,
          }}>
          <Input
            renderLeftIcon={() => <RenderPNG imageSource={Images.search} />}
            placeholder="Search keywords..."
            renderRightIcon={() => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowFilterModal(true);
                }}>
                <RenderPNG imageSource={Images.filter} />
              </TouchableOpacity>
            )}
          />
        </View>
        {showFilterModal && (
          <FilterModal
            isVisible={showFilterModal}
            onClose={() => setShowFilterModal(false)}
          />
        )}
        {/* List products by category */}
        <View
          style={{
            paddingVertical: Sizes.space3,
            paddingHorizontal: Sizes.space4,
          }}>
          {/* Render list categories */}
          <FlatList
            data={[{code: 'all', name: 'All Categories'}, ...categories]}
            horizontal
            keyExtractor={item => `CategoryFlatListItemCard-${item.id}`}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <CategoryFlatListItem
                onPress={() => setSelectedCategoryCode(item.code)}
                isActive={selectedCategoryCode === item.code}
                data={item}
                isLast={index === categories.length}
              />
            )}
          />
          {/* Render products fetched by selected category */}
          <View style={{paddingVertical: Sizes.space3}}>
            {products.map((item, index) => (
              <ProductFlatListItem
                onPress={() => handleViewProductDetails(item)}
                key={`ProductFlatListCard-${item.id}`}
                data={item}
                isLast={index === products.length - 1}
              />
            ))}
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default HomeScreen;
