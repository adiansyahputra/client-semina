import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { listsActions } from './listsSlice';

let debouncedFetchListsCategories = debounce(getData, 1000);
let debouncedFetchListsSpeakers = debounce(getData, 1000);
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

export const fetchListSpeakers = () => {
  return async (dispatch) => {
    dispatch(listsActions.startFetchingListsSpeakers());

    try {
      let res = await debouncedFetchListsSpeakers('/cms/talents');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: { value: res._id, name: 'speaker' },
        });
      });

      dispatch(
        listsActions.successFetchingListsSpeakers({
          speakers: _temp,
        })
      );
    } catch (error) {
      dispatch(listsActions.errorFetchingListsSpeakers());
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
