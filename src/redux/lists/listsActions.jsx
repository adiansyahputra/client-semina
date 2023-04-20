import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { listsActions } from './listsSlice';

let debouncedFetchListsCategories = debounce(getData, 1000);
let debouncedFetchListsTalents = debounce(getData, 1000);
let debouncedFetchListsEvents = debounce(getData, 1000);

export const fetchListCategories = () => {
  return async (dispatch) => {
    dispatch(listsActions.startFetchingListsCategories());

    try {
      let res = await debouncedFetchListsCategories('/cms/categories');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: { value: res._id, name: 'category' },
        });
      });

      dispatch(
        listsActions.successFetchingListsCategories({
          categories: _temp,
        })
      );
    } catch (error) {
      dispatch(listsActions.errorFetchingListsCategories());
    }
  };
};

export const fetchListTalents = () => {
  return async (dispatch) => {
    dispatch(listsActions.startFetchingListsTalents());

    try {
      let res = await debouncedFetchListsTalents('/cms/talents');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: { value: res._id, name: 'talent' },
        });
      });

      dispatch(
        listsActions.successFetchingListsTalents({
          talents: _temp,
        })
      );
    } catch (error) {
      dispatch(listsActions.errorFetchingListsTalents());
    }
  };
};

export const fetchListEvents = () => {
  return async (dispatch) => {
    dispatch(listsActions.startFetchingListsEvents());

    try {
      let res = await debouncedFetchListsEvents('/cms/events');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.title,
          target: { value: res._id, name: 'event' },
        });
      });

      dispatch(
        listsActions.successFetchingListsEvents({
          events: _temp,
        })
      );
    } catch (error) {
      dispatch(listsActions.errorFetchingListsEvents());
    }
  };
};
