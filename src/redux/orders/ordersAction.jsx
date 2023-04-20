import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { ordersActions } from './ordersSlice';
import { notifActions } from '../notif/notifSlice';
import moment from 'moment';

let debouncedFetchOrders = debounce(getData, 1000);

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    dispatch(ordersActions.startFetching());

    try {
      setTimeout(() => {
        dispatch(notifActions.clearNotif());
      }, 5000);

      let params = {
        page: getState().orders?.page || 1,
        limit: getState().orders?.limit || 10,
        startDate: moment(getState().orders?.date?.startDate).format(
          'YYYY-MM-DD'
        ),
        endDate: moment(getState().orders?.date?.endDate).format('YYYY-MM-DD'),
      };

      let res = await debouncedFetchOrders('/cms/orders', params);

      const _temp = [];
      res.data.data.order.forEach((res) => {
        _temp.push({
          name: `${res.personalDetail.firstName} ${res.personalDetail.lastName}`,
          email: res.personalDetail.email,
          title: res.historyEvent.title,
          date: res.historyEvent.date,
          orderDate: moment(res.date).format('DD-MM-YYYY, h:mm:ss a'),
          venueName: res.historyEvent.venueName,
        });
      });

      dispatch(
        ordersActions.successFetching({
          orders: _temp,
          pages: res.data.data.pages,
        })
      );
    } catch (error) {
      dispatch(ordersActions.errorFetching());
    }
  };
};
