import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { notifActions } from '../notif/notifSlice';
import { talentsActions } from './talentsSlice';

let debouncedFetchTalents = debounce(getData, 1000);

export const fetchTalents = () => {
  return async (dispatch, getState) => {
    dispatch(talentsActions.startFetching());

    try {
      setTimeout(() => {
        dispatch(notifActions.clearNotif());
      }, 5000);

      let params = {
        keyword: getState().talents.keyword,
      };

      let res = await debouncedFetchTalents('/cms/talents', params);

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        talentsActions.successFetching({
          talents: res.data.data,
        })
      );
    } catch (error) {
      dispatch(talentsActions.errorFetching());
    }
  };
};
