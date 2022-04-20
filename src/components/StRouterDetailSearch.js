import { useState, useEffect } from 'react';

import { EMPTY_FILTER } from './StRouteDetailsUtils';

const StRouterDetailSearch = ({ stateRowDetails, setRowDetailsFilter }) => {
  const [searchInput, setSearchInput] = useState(
    stateRowDetails.filter.searchInput
  );
  const [showPIIOnly, setShowPIIOnly] = useState(
    stateRowDetails.filter.showPIIOnly
  );
  const applyFilter = (e) => {
    e.preventDefault();
    const newFilter = Object.assign({}, EMPTY_FILTER);
    newFilter.searchInput = searchInput.toLowerCase().trim();
    newFilter.showPIIOnly = showPIIOnly;
    if (
      newFilter.searchInput !== stateRowDetails.filter.searchInput ||
      newFilter.showPIIOnly !== stateRowDetails.filter.showPIIOnly
    ) {
      setRowDetailsFilter(e, newFilter);
    }
  };
  const resetInput = () => {
    setSearchInput('');
    setShowPIIOnly(false);
  };
  const resetFilter = (e) => {
    resetInput();
    const newFilter = Object.assign({}, EMPTY_FILTER);
    setRowDetailsFilter(e, newFilter);
  };
  const toggle = (value) => {
    return !value;
  };
  useEffect(() => {
    resetInput();
  }, [stateRowDetails.tabCurrentKey]);

  return (
    <>
      <div className="st_table_content">
        <form onSubmit={(e) => applyFilter(e)}>
          <div className="st_search_bar">
            <div className="fa-solid fa-magnifying-glass"></div>
            <input
              type="text"
              placeholder="Search"
              id="inputSearch"
              name="inputSearch"
              autoComplete="off"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
            <div className="st_vertical_separator"></div>
            <div className="st_show_pii">
              <input
                className="st_pointer"
                type="checkbox"
                style={{ margin: '5px 10px' }}
                id="showPIIOnly"
                name="showPIIOnly"
                checked={showPIIOnly}
                onChange={() => setShowPIIOnly(toggle)}
              />
              Show PII only
            </div>
            <button onClick={(e) => applyFilter(e)}>Apply</button>
          </div>
        </form>
      </div>
      <div className="st_search_clear">
        <span
          className="st_pointer"
          onClick={(e) => {
            resetFilter(e);
          }}
        >
          Reset Filter
        </span>
      </div>
    </>
  );
};

export default StRouterDetailSearch;
