import React, {useState} from 'react';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {connect, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import ChooseAddressStep from '../../components/checkout_steps/ChooseAddressStep';
import ConfirmProductsStep from '../../components/checkout_steps/ConfirmProductsStep';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import MainLayout from '../../layouts/MainLayout';
import PaymentMethodStep from '../../components/checkout_steps/PaymentMethodStep';
import {showErrorToast, showSuccessToast} from '../../utils/ToastActions';
import {createNewOrder} from '../../redux/actions/cartActions';

const CheckoutScreen = ({navigation, route, addresses}) => {
  const dispatch = useDispatch();

  const btnTextStyle = {
    color: Colors.primary,
    ...Fonts.body4,
  };

  const {orderItems} = route.params;
  const [addressId, setAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardDetailsForm, setCardDetailsForm] = useState({
    number: '',
    cvc: '',
    expMonth: '',
    expYear: '',
    name: '',
  });

  function onSubmitProgresses() {
    let permitSubmit = true;
    if (!addressId) {
      showErrorToast('Please choose your address!');
      permitSubmit = false;
    }
    if (paymentMethod === 'CARD') {
      if (
        !cardDetailsForm.name ||
        !cardDetailsForm.number ||
        !cardDetailsForm.cvc ||
        !cardDetailsForm.expMonth ||
        !cardDetailsForm.expYear
      ) {
        showErrorToast('Please enter your card details!');
        permitSubmit = false;
      }
    }
    if (permitSubmit) {
      const mappedOrderItems = orderItems.reduce((arr, item) => {
        arr.push({
          productId: item.product.id,
          quantity: item.quantity,
        });
        return arr;
      }, []);
      const orderRequest = {
        addressId,
        description: `New order created at ${new Date()}`,
        paymentMethod,
        items: mappedOrderItems,
        stripeRequest: cardDetailsForm,
      };
      function next() {
        showSuccessToast('Create orders successfully!');
        navigation.navigate('Account', {
          screen: 'OrdersScreen',
        });
      }
      function errorHandle(message) {
        showErrorToast(message);
      }
      createNewOrder(dispatch, orderRequest, next, errorHandle);
    }
  }

  return (
    <MainLayout
      renderHeader={() => (
        <Header title="Checkout" backEnabled navigation={navigation} />
      )}>
      <ProgressSteps
        activeStepIconBorderColor={Colors.primary}
        activeLabelColor={Colors.primary}
        disabledStepIconColor={Colors.light}
        disabledStepNumColor={Colors.primary}
        labelColor={Colors.grey}
        completedStepIconColor={Colors.primary}
        completedProgressBarColor={Colors.primary}>
        <ProgressStep
          nextBtnTextStyle={btnTextStyle}
          previousBtnTextStyle={btnTextStyle}
          label="Confirm Products">
          <ConfirmProductsStep products={orderItems} />
        </ProgressStep>
        <ProgressStep
          nextBtnTextStyle={btnTextStyle}
          previousBtnTextStyle={btnTextStyle}
          nextBtnDisabled={!addressId}
          label="Choose Address">
          <ChooseAddressStep
            addresses={addresses}
            onChangeAddress={id => {
              setAddressId(id);
            }}
          />
        </ProgressStep>
        <ProgressStep
          onSubmit={() => onSubmitProgresses()}
          nextBtnTextStyle={btnTextStyle}
          previousBtnTextStyle={btnTextStyle}
          label="Choose Payment Method">
          <PaymentMethodStep
            paymentMethod={paymentMethod}
            onChangePaymentMethod={payMth => setPaymentMethod(payMth)}
            cardDetailsForm={cardDetailsForm}
            setCardDetailsForm={setCardDetailsForm}
          />
        </ProgressStep>
      </ProgressSteps>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    addresses: state.address.addresses,
  };
};

const mapActionToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapActionToProps)(CheckoutScreen);
