import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import { Card, Form, Input, message, notification } from "antd";
  import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";
import { removeBasket } from "../redux/slice/basketSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/ConfigureStore";
  import CheckoutSummary from "./CheckoutSummary";
  
  const Checkout = () => {
    const [cardName, setCardName] = useState < string > ("");
    const {basket} = useAppSelector((state) => state.basket);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCardName(e.target.value);
    };

    const handlePayment = async (event: SyntheticEvent) => {
      event.preventDefault();
      if (!stripe || !elements) return;
      try {
        const cardElement = elements.getElement(CardNumberElement);
        const paymentResult = await stripe.confirmCardPayment(basket?.ClientSecret!,{ 
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: cardName
            }
          }
        });

        if(paymentResult.paymentIntent?.status === "succeeded"){
          notification.success({
            message: "Your payment is successfull",
          });
          dispatch(removeBasket());
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        }
        else {
          notification.success({
            message: paymentResult.error?.message!,
          });
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  
    const [form] = Form.useForm();
  
    return (
      <div className="checkout">
        <div className="checkout__form">
          <h1>Checkout Page</h1>
          <Card title="Fill your Card details here">
            <Form form={form} layout="vertical">
              <Form.Item
                name="cardName"
                rules={[
                  { required: true, message: "Card Name is required", min: 5 },
                ]}
                label="Name on Card"
              >
                <Input
                  name="cardName"
                  placeholder="Mention the name on your card"
                  value={cardName}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Card Number">
                <div className="stripe-input">
                  <CardNumberElement />
                </div>
              </Form.Item>
              <div className="inline">
                <Form.Item label="Expiry Date">
                  <div className="stripe-input">
                    <CardExpiryElement />
                  </div>
                </Form.Item>
                <Form.Item label="CVV">
                  <div className="stripe-input">
                    <CardCvcElement />
                  </div>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </div>
        <div className="checkout__summary">
          <CheckoutSummary />
        </div>
      </div>
    );
  };
  
  export default Checkout;