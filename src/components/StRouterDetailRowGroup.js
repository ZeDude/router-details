import { ROWGROUP_KEYLABELS, ROW_KEYLABELS } from './StRouteDetailsUtils';
import StRouterDetailRow from './StRouterDetailRow';

const StRouterDetailRowGroup = ({
  tabCurrentKey,
  rowGroupKeyIndex,
  rowGroupExcluded,
  rowGroupData,
  rowGroupStatus,
  toggleRowGroup,
  toggleRowField
}) => {
  const rowGroupKey = ROWGROUP_KEYLABELS[rowGroupKeyIndex].key;
  const rowKeyPref = `row##${tabCurrentKey}##${rowGroupKey}`;
  return (
    <>
      {!rowGroupExcluded && (
        <div className="st_group_header">
          <div
            className={`st_pointer fas ${
              rowGroupStatus ? 'fa-square-caret-down' : 'fa-square-caret-right'
            } fa-xs st_group_header_icon`}
            onClick={(e) => toggleRowGroup(e, rowGroupKey)}
          ></div>
          <div
            className="st_pointer"
            onClick={(e) => toggleRowGroup(e, rowGroupKey)}
          >
            {ROWGROUP_KEYLABELS[rowGroupKeyIndex].label}
          </div>
        </div>
      )}
      {!rowGroupExcluded &&
        rowGroupStatus &&
        rowGroupData.length > 0 &&
        rowGroupData.map((rowData, rowIndex) => {
          return (
            <StRouterDetailRow
              key={`rowgroup##${rowKeyPref}##${
                rowData[ROW_KEYLABELS[0].key]
              }##${rowIndex}`}
              rowKeyPref={rowKeyPref}
              rowIndex={rowIndex}
              rowData={rowData}
              toggleRowField={toggleRowField}
            />
          );
        })}
      {/* {!rowGroupExcluded && rowGroupStatus && rowGroupData.length === 0 && (
        <div
          key={`group_header_empty##${rowKeyPref}`}
          className="st_table st_table_row"
        >
          <div key={`div_group_header_empty##${rowKeyPref}`}>
            Empty {ROWGROUP_KEYLABELS[rowGroupKeyIndex].label} results.
          </div>
        </div>
      )} */}
    </>
  );
};

export default StRouterDetailRowGroup;
