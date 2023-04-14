import Images from './Images';

export const walkthrough = [
  {
    id: 1,
    title: 'Genuine product',
    sub_title: 'Diversified items of products in life, genuine product, safe',
    image: Images.welcome,
  },
  {
    id: 2,
    title: 'Easy search',
    sub_title:
      'Find products easy with Scanning camera, pay with just one camera scan',
    image: Images.connect,
  },
  {
    id: 3,
    title: 'Super fast delivery',
    sub_title: 'Delivery within the next day including Saturday and Sunday',
    image: Images.delivery,
  },
];

export const profile_links = [
  {
    id: 1,
    label: 'My information',
    image: Images.information,
    redirectTo: 'InformationScreen',
  },
  {
    id: 2,
    label: 'My addresses',
    image: Images.address,
    redirectTo: 'AddressesScreen',
  },
  {id: 3, label: 'My orders', image: Images.order},
  {id: 4, label: 'My transactions', image: Images.transaction},
  {id: 5, label: 'Logout', image: Images.logout, logout: true},
];
