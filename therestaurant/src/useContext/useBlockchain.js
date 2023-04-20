import { useState, useEffect } from "react";
import Web3 from "web3";
import { RESTAURANT_ABI, RESTAURANT_ADDRESS } from "../config";

export const useBlockchain = () => {
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [restaurantCreated, setRestaurantCreated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [contract, setContract] = useState();

  const createRestaurant = async () => {
    setLoading(true);
    const web3 = new Web3(window.ethereum);
    const restaurantContract = new web3.eth.Contract(
      RESTAURANT_ABI,
      RESTAURANT_ADDRESS
    );
    setContract(restaurantContract);
    const restaurantName = "Amos fine-dine";

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setAccount(account);

      const restaurantCount = await restaurantContract.methods
        .restaurantCount()
        .call();
      if (restaurantCount > 0) {
        setRestaurantCreated(true);
        setLoading(false);
        return;
      }
      const result = await restaurantContract.methods
        .createRestaurant(restaurantName)
        .send({ from: account });
      console.log(
        "New restaurant created with ID:",
        result.events.RestaurantCreated.returnValues.id
      );
      setRestaurantCreated(true);

      localStorage.setItem("restaurantCreated", true);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const getBookings = async (restaurantId) => {
    const booking = await contract.methods.getBookings(restaurantId).call();

    const temp = [];
    for (let i = 1; i < booking.id; i++) {
      const booking = await contract.methods.getBookings(i).call();
      console.log(booking);
      temp.push(booking);
    }

    setBookings(temp);
    console.log(temp);
  };
  const getCurrentAccount = async () => {
    if (typeof window.ethereum !== "undefined") {
      const storedConnectedState = localStorage.getItem("connected");

      if (storedConnectedState === "false") {
        return;
      }
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        const TodoContract = new web3.eth.Contract(
          RESTAURANT_ABI,
          RESTAURANT_ADDRESS
        );

        setContract(TodoContract);
        setAccount(account);
        await getBookings(TodoContract);
      }
    }
  };

  // const addBooking
  useEffect(() => {
    const restaurantAlreadyCreated = localStorage.getItem("restaurantCreated");

    if (!restaurantAlreadyCreated) {
      createRestaurant();
      getCurrentAccount();
    } else {
      setRestaurantCreated(true);
      getBookings(1);
      getCurrentAccount();
    }
  }, []);

  return {
    loading,
    restaurantCreated,
    createRestaurant,
    bookings,
    getBookings,
  };
};

export default useBlockchain;
