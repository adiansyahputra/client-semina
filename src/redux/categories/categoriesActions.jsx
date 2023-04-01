import { categoriesActions } from './categoriesSlice';
import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { notifActions } from '../notif/notifSlice';

let debouncedFetchCategories = debounce(getData, 1000);

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(categoriesActions.startFetching());

    try {
      setTimeout(() => {
        dispatch(notifActions.clearNotif());
      }, 5000);

      let res = await debouncedFetchCategories('/cms/categories');

      dispatch(
        categoriesActions.successFetching({
          categories: res.data.data,
        })
      );
    } catch (error) {
      dispatch(categoriesActions.errorFetching());
    }
  };
};
