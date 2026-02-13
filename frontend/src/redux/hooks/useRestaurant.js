import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../slices/restaurantSlice";

export const useRestaurants = (limit = 20) => {
  const dispatch = useDispatch();
  const { items, loading, hasNextPage, page, error } = useSelector(
    (state) => state.restaurants
  );

  // Initial load
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchRestaurants({ page: 1, limit }));
    }
  }, [dispatch, items.length, limit]);

  const loadMore = () => {
    if (!loading && hasNextPage) {
      dispatch(fetchRestaurants({ page, limit }));
    }
  };

  return { restaurants: items, loading, hasNextPage, loadMore, error };
};