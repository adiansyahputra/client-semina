import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { notifActions } from '../notif/notifSlice';
import { eventsActions } from './eventsSlice';

let debouncedFetchEvents = debounce(getData, 1000);

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    dispatch(eventsActions.startFetching());

    try {
      setTimeout(() => {
        dispatch(notifActions.clearNotif());
      }, 5000);

      let params = {
        keyword: getState().events.keyword,
        category: getState().events?.category?.value || '',
        talent: getState().events?.talent?.value || '',
      };

      let res = await debouncedFetchEvents('/cms/events', params);

      res.data.data.forEach((res) => {
        res.categoryName = res?.category?.name ?? '';
        res.talentName = res?.talent?.name ?? '-';
      });

      dispatch(
        eventsActions.successFetching({
          events: res.data.data,
        })
      );
    } catch (error) {
      dispatch(eventsActions.errorFetching());
    }
  };
};
