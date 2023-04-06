import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { notifActions } from '../notif/notifSlice';
import { paymentsActions } from './paymentsSlice';

let debouncedFetchPayments = debounce(getData, 1000);

export const fetchPayments = () => {
  return async (dispatch) => {
    dispatch(paymentsActions.startFetching());

    try {
      setTimeout(() => {
        dispatch(notifActions.clearNotif());
      }, 5000);

      let res = await debouncedFetchPayments('/cms/payments');

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        paymentsActions.successFetching({
          payments: res.data.data,
        })
      );
    } catch (error) {
      dispatch(paymentsActions.errorFetching());
    }
  };
};
