import { ROW_KEYLABELS, ROWGROUP_KEYLABELS } from './StRouteDetailsUtils';
import StRouterDetailRowGroup from './StRouterDetailRowGroup';

const StRouterDetailTable = ({
  stateRowDetails,
  toggleRowGroup,
  toggleRowField
}) => {
  return (
    <div className="st_table_content">
      <div className="st_table st_table_header">
        <div>{ROW_KEYLABELS[0].label}</div>
        <div>{ROW_KEYLABELS[1].label}</div>
        <div>{ROW_KEYLABELS[2].label}</div>
        <div>{ROW_KEYLABELS[3].label}</div>
      </div>
      {stateRowDetails?.rowGroupStatus !== null &&
        ROWGROUP_KEYLABELS.map((keyLabel, keyLabelIndex) => {
          let rowGroupStatus =
            stateRowDetails && stateRowDetails.rowGroupsStatus
              ? stateRowDetails.rowGroupsStatus[stateRowDetails.tabCurrentKey][
                  keyLabel.key
                ]
              : false;
          let rowGroupExcluded =
            stateRowDetails && stateRowDetails.rowGroupsStatus
              ? stateRowDetails.rowGroupExcluded[
                  stateRowDetails.tabCurrentKey
                ].includes(keyLabel.key)
              : false;
          let rowGroupData = null;
          if (
            rowGroupStatus &&
            stateRowDetails.routerDetailsData['request'] &&
            stateRowDetails.routerDetailsData[stateRowDetails.tabCurrentKey][
              keyLabel.key
            ]
          ) {
            if (
              stateRowDetails.filter.searchInput ||
              stateRowDetails.filter.showPIIOnly
            ) {
              rowGroupData = stateRowDetails.routerDetailsData[
                stateRowDetails.tabCurrentKey
              ][keyLabel.key].filter((row) => {
                return (
                  (!stateRowDetails.filter.showPIIOnly ||
                    stateRowDetails.filter.showPIIOnly ===
                      row[ROW_KEYLABELS[1].key]) &&
                  (!stateRowDetails.filter.searchInput ||
                    row[ROW_KEYLABELS[0].key].indexOf(
                      stateRowDetails.filter.searchInput
                    ) > -1 ||
                    row[ROW_KEYLABELS[3].key].indexOf(
                      stateRowDetails.filter.searchInput
                    ) > -1)
                );
              });
            } else {
              // debug_log console.log(
              //   `Empty filter, ${stateRowDetails.tabCurrentKey} ${
              //     keyLabel.key
              //   } ${
              //     stateRowDetails.routerDetailsData[
              //       stateRowDetails.tabCurrentKey
              //     ][keyLabel.key]
              //   }`
              // );
              rowGroupData =
                stateRowDetails.routerDetailsData[
                  stateRowDetails.tabCurrentKey
                ][keyLabel.key];
            }
          }
          return (
            <StRouterDetailRowGroup
              key={`tabdetrowgroup##${stateRowDetails.tabCurrentKey}##${ROWGROUP_KEYLABELS[keyLabelIndex].key}##${keyLabelIndex}`}
              tabCurrentKey={stateRowDetails.tabCurrentKey}
              rowGroupKeyIndex={keyLabelIndex}
              rowGroupExcluded={rowGroupExcluded}
              rowGroupData={rowGroupData}
              rowGroupStatus={rowGroupStatus}
              toggleRowGroup={toggleRowGroup}
              toggleRowField={toggleRowField}
            />
          );
        })}
      <div className="st_padding_bottom15">&nbsp;</div>
    </div>
  );
};

export default StRouterDetailTable;
