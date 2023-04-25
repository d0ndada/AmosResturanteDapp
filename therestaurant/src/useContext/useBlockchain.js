import { useState, useEffect } from "react";
import Web3 from "web3";
import { RESTAURANT_ABI, RESTAURANT_ADDRESS } from "../config";

export const useBlockchain = () => {
  const [loading, setLoading] = useState(false);
  const [restaurantCreated, setRestaurantCreated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [selectedDate, setSelectedDate] = useState("");

  const getAccount = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setAccount(account);
      return account;
    } catch (error) {
      console.error(error);
    }
  };
  const getBookings = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const restaurantContract = new web3.eth.Contract(
        RESTAURANT_ABI,
        RESTAURANT_ADDRESS
      );
      setContract(restaurantContract);
      const bookingIds = await restaurantContract.methods
        .getBookings(1) // replace with your restaurant ID
        .call();
      const temp = [];
      for (let i = 0; i < bookingIds.length; i++) {
        const bookingId = bookingIds[i];
        const booking = await restaurantContract.methods
          .bookings(bookingId)
          .call();
        temp.push(booking);
        console.log(booking);
      }
      setBookings(temp);
      setRestaurantCreated(true);
      return temp;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteBooking = async (id) => {
    await contract.methods
      .removeBooking(id)
      .send({ from: account })
      .once("receipt", async () => {
        getBookings(1);
      });
  };

  const editBooking = async (id, numberOfGuests, name, date, time) => {
    await contract.methods
      .editBooking(id, numberOfGuests, name, date, time)
      .send({ from: account })
      .once("receipt", async () => {
        getBookings(1);
      });
  };
  const createBooking = async (numberOfGuests, name, date, timeInMinutes) => {
    try {
      await contract.methods
        .createBooking(numberOfGuests, name, date, timeInMinutes, 1)
        .send({ from: account });
      getBookings(1);
    } catch (error) {
      console.error(error);
    }
  };

  const createRestaurant = async () => {
    setLoading(true);
    const account = await getAccount();
    if (account) {
      const web3 = new Web3(window.ethereum);
      const restaurantContract = new web3.eth.Contract(
        RESTAURANT_ABI,
        RESTAURANT_ADDRESS
      );
      setContract(restaurantContract);
      await restaurantContract.methods
        .createRestaurant("Amos fine-dine")
        .send({ from: account });
      localStorage.setItem("restaurantCreated", true);
    }
    setLoading(false);
  };
  useEffect(() => {
    const restaurantAlreadyCreated = localStorage.getItem("restaurantCreated");

    if (restaurantAlreadyCreated) {
      getAccount().then(() => {
        getBookings(1);
      });
    }
  }, []);

  return {
    loading,
    restaurantCreated,
    bookings,
    getBookings,
    contract,
    account,
    deleteBooking,
    editBooking,
    selectedDate,
    setSelectedDate,
    createBooking,
  };
};

export default useBlockchain;
