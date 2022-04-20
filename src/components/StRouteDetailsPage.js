import { useReducer, useEffect } from 'react';

import { fetchData } from '../controllers/StRouteDetailsController';
import {
  ROWGROUP_KEYLABELS,
  TAB_KEYS,
  EMPTY_FILTER
} from './StRouteDetailsUtils';
import StTabGroup from './StTabGroup';
import StRouterDetailSearch from './StRouterDetailSearch';
import StRouterDetailTable from './StRouterDetailTable';

const reducerRowDetails = (state, action) => {
  let newState = null;
  switch (action.type) {
    case 'FETCH_ROUTERDETAILS':
      newState = Object.assign({}, state, {
        routerDetailsData: action.payload,
        rowGroupsStatus: {}
      });
      // initialize rowGroupsStatus
      TAB_KEYS.forEach((tabKey) => {
        newState.rowGroupsStatus[tabKey] = {};
        newState.rowGroupExcluded[tabKey] = [];
        ROWGROUP_KEYLABELS.forEach((rowGroupKeyLabel) => {
          newState.rowGroupsStatus[tabKey][rowGroupKeyLabel.key] = action
            .payload[tabKey][rowGroupKeyLabel.key]
            ? true
            : false;
          if (!action.payload[tabKey][rowGroupKeyLabel.key]) {
            newState.rowGroupExcluded[tabKey].push(rowGroupKeyLabel.key);
          }
        });
      });
      // debug_log      console.log('FETCH_ROUTERDETAILS, newState: ', JSON.stringify(newState));
      return newState;
    case 'CHANGE_TABKEY':
      if (state.tabCurrentKey !== action.payload) {
        newState = Object.assign({}, state, {
          tabCurrentKey: action.payload,
          filter: EMPTY_FILTER
        });
        return newState;
      }
      return state;
    case 'APPLY_FILTER':
      newState = Object.assign({}, state, {
        filter: action.payload
      });
      return newState;
    case 'TOGGLE_ROWGROUP':
      newState = Object.assign({}, state);
      // rowGroupKey = action.payload;
      // debug_log console.log(
      //   `before TOGGLE_ROWGROUP tabCurrentKey: ${
      //     state.tabCurrentKey
      //   } action.payload: ${action.payload} current bool: ${
      //     newState.rowGroupsStatus[state.tabCurrentKey][action.payload]
      //   }`
      // );
      newState.rowGroupsStatus[state.tabCurrentKey][action.payload] =
        !newState.rowGroupsStatus[state.tabCurrentKey][action.payload];
      // debug_log console.log(
      //   `after TOGGLE_ROWGROUP tabCurrentKey: ${
      //     state.tabCurrentKey
      //   } action.payload: ${action.payload} current bool: ${
      //     newState.rowGroupsStatus[state.tabCurrentKey][action.payload]
      //   }`
      // );
      return newState;
    case 'TOGGLE_ROWFIELD':
      newState = Object.assign({}, state);
      let rowFieldTree = action.payload.split('##');
      // debug_log console.log(
      //   `before TOGGLE_ROWFIELD tabCurrentKey: ${
      //     state.tabCurrentKey
      //   } action.payload: ${action.payload} current bool: ${
      //     newState.routerDetailsData[rowFieldTree[0]][rowFieldTree[1]][
      //       rowFieldTree[2]
      //     ][rowFieldTree[3]]
      //   }`
      // );
      newState.routerDetailsData[rowFieldTree[0]][rowFieldTree[1]][
        rowFieldTree[2]
      ][rowFieldTree[3]] =
        !newState.routerDetailsData[rowFieldTree[0]][rowFieldTree[1]][
          rowFieldTree[2]
        ][rowFieldTree[3]];
      // debug_log console.log(
      //   `after TOGGLE_ROWFIELD tabCurrentKey: ${
      //     state.tabCurrentKey
      //   } action.payload: ${action.payload} current bool: ${
      //     newState.routerDetailsData[rowFieldTree[0]][rowFieldTree[1]][
      //       rowFieldTree[2]
      //     ][rowFieldTree[3]]
      //   }`
      // );
      return newState;
    case 'CLEAR_FILTER':
      return Object.assign({}, state, { filter: EMPTY_FILTER });
    default:
      console.error('reducerRowDetails, Invalid action type: ', action?.type);
      return state;
  }
};
const initialState = {
  tabCurrentKey: TAB_KEYS[0],
  routerDetailsData: {},
  filter: EMPTY_FILTER,
  rowGroupsStatus: null,
  rowGroupExcluded: {}
};

const StRouteDetailsPage = () => {
  const [stateRowDetails, dispatch] = useReducer(
    reducerRowDetails,
    initialState
  );
  const toggleRowGroup = (e, rowGroupKey) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_ROWGROUP', payload: rowGroupKey });
  };
  const toggleRowField = (e, rowFieldKey) => {
    e.preventDefault();
    // debug_log console.log(`toggleRowField, rowFieldKey`, rowFieldKey);
    dispatch({ type: 'TOGGLE_ROWFIELD', payload: rowFieldKey.substring(5) });
  };
  const setTabCurrentKey = (e, tabKey) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_TABKEY', payload: tabKey });
  };
  const setRowDetailsFilter = (e, newFilter) => {
    e.preventDefault();
    dispatch({ type: 'APPLY_FILTER', payload: newFilter });
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        // debug_log console.log('fetchData data', JSON.stringify(data));
        dispatch({ type: 'FETCH_ROUTERDETAILS', payload: data });
      })
      .catch((error) => {
        // manage error
      });
  }, []);

  return (
    <>
      <header>
        <div className="st_header">
          <span className="st_header_method">
            {stateRowDetails.routerDetailsData.method}
          </span>
          {stateRowDetails.routerDetailsData.path}
        </div>
        <ul className="st_breadcrumb">
          <li>All APIs</li>
          <li>{stateRowDetails.routerDetailsData.api}</li>
          <li>{stateRowDetails.routerDetailsData.path}</li>
        </ul>
      </header>
      <div className="st_horizontal_separator"></div>
      <StTabGroup
        stateRowDetails={stateRowDetails}
        setTabCurrentKey={setTabCurrentKey}
      />
      <div key={'st_tab_container'} className="st_tab_container">
        <StRouterDetailSearch
          key={`routerSearch${stateRowDetails.tabCurrentKey}`}
          stateRowDetails={stateRowDetails}
          setRowDetailsFilter={setRowDetailsFilter}
        />
        <StRouterDetailTable
          key={`routerTable${stateRowDetails.tabCurrentKey}`}
          stateRowDetails={stateRowDetails}
          toggleRowGroup={toggleRowGroup}
          toggleRowField={toggleRowField}
        />
      </div>
    </>
  );
};

export default StRouteDetailsPage;
