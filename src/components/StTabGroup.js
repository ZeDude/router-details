import { TAB_KEYS } from './StRouteDetailsUtils';

const StTabGroup = ({ stateRowDetails, setTabCurrentKey }) => {
  console.log(`StTabGroup tabCurrentKey: ${stateRowDetails.tabCurrentKey}`);
  return (
    <div key={'st_tab_group'} className="st_tab_group">
      {TAB_KEYS.map((tabKey) => {
        return (
          <button
            key={`buttontab_${tabKey}`}
            className={`st_tab_button ${
              tabKey === stateRowDetails.tabCurrentKey ? 'active' : ''
            }`}
            onClick={(e) => setTabCurrentKey(e, tabKey)}
          >
            {tabKey}
          </button>
        );
      })}
    </div>
  );
};

export default StTabGroup;
