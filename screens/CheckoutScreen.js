import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../helper/constants";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { Player } from "../PlayerContext";

const CheckoutScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [cardDetails, setCardDetails] = useState(null);
  const navigation = useNavigation();
  const { confirmPayment } = useStripe();

  const { setIsCheckout } = useContext(Player);

  useEffect(() => {
    
    setIsCheckout(true);
    
    return () => setIsCheckout(false);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    const amount = selectedPlan === "monthly" ? 59000 : 599000;

    try {
      const response = await axios.post(
        `${constants.url}/create-payment-intent`,
        { amount }
      );
      const { clientSecret } = response.data;

      if (cardDetails?.complete) {
        const { error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          paymentMethodData: {
            billingDetails: {
              email: "email@example.com",
              name: "John Doe",
              phone: "123456789",
            },
          },
        });

        if (error) {
          console.error(error);
          Alert.alert("Payment Failed", error.message);
        } else {
          Alert.alert(
            "Payment Successful",
            `Your payment of ${amount}₫ was successful!`
          );
          await upgradeToPremium();
        }
      } else {
        Alert.alert("Invalid Card", "Please enter valid card details.");
      }
    } catch (error) {
      console.error("Payment Intent Error:", error);
      Alert.alert(
        "Payment Error",
        "Unable to create payment intent. Please try again."
      );
    }
  };

  const upgradeToPremium = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.put(
        `${constants.url}/user/upToPremium/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Upgrade Successful", "You have been upgraded to premium!");
        navigation.navigate("Premium");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Upgrade Failed",
        "Unable to upgrade to premium. Please try again."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#1DB954", "#121212"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Choose Your Premium Plan</Text>
      </LinearGradient>

      <View style={styles.planContainer}>
        <TouchableOpacity
          style={[
            styles.planOption,
            selectedPlan === "monthly" && styles.selectedPlan,
          ]}
          onPress={() => handlePlanSelect("monthly")}
        >
          <Text style={styles.planTitle}>Premium Monthly</Text>
          <Text style={styles.planPrice}>59,000₫ / month</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.planOption,
            selectedPlan === "yearly" && styles.selectedPlan,
          ]}
          onPress={() => handlePlanSelect("yearly")}
        >
          <Text style={styles.planTitle}>Premium Yearly</Text>
          <Text style={styles.planPrice}>599,000₫ / year</Text>
        </TouchableOpacity>
      </View>

      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          borderWidth: 1,
          borderColor: "#b3b3b3",
          borderRadius: 10,
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />

      <TouchableOpacity style={styles.checkoutButton} onPress={handlePayment}>
        <Text style={styles.checkoutText}>Proceed to Payment</Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>
        By proceeding, you agree to Spotify's{" "}
        <Text style={styles.linkText}>Terms and Conditions</Text>.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  planContainer: {
    padding: 20,
  },
  planOption: {
    backgroundColor: "#1c1c1c",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: "#1DB954",
    borderWidth: 2,
  },
  planTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  planPrice: {
    color: "#b3b3b3",
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noteText: {
    color: "#b3b3b3",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  linkText: {
    color: "#1DB954",
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
