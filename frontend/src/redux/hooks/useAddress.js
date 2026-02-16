import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  fetchAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  clearAddressError,
} from "../slices/addressSlice";
import { useCallback } from "react";

export const useAddress = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.address);

  const getAddresses = useCallback(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const getSingleAddress = useCallback(
    (id) => {
      dispatch(fetchAddress(id));
    },
    [dispatch],
  );

  const addNewAddress = useCallback(
    (address) => {
      return dispatch(addAddress(address));
    },
    [dispatch],
  );

  const editAddress = useCallback(
    (address) => {
      return dispatch(updateAddress(address));
    },
    [dispatch],
  );

  const removeAddress = useCallback(
    (id) => {
      return dispatch(deleteAddress(id));
    },
    [dispatch],
  );

  const clearError = useCallback(() => {
    dispatch(clearAddressError());
  }, [dispatch]);

  return {
    addresses: items,
    loading,
    error,
    getAddresses,
    getAddress: getSingleAddress,
    addAddress: addNewAddress,
    updateAddress: editAddress,
    deleteAddress: removeAddress,
    clearError,
  };
};
