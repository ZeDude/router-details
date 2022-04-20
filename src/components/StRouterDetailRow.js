import { ROW_KEYLABELS } from './StRouteDetailsUtils';

const StRouterDetailRow = ({
  rowKeyPref,
  rowIndex,
  rowData,
  toggleRowField
}) => {
  const rowFieldPII = `${rowKeyPref}##${rowIndex}##${ROW_KEYLABELS[1].key}`;
  const rowFieldMasking = `${rowKeyPref}##${rowIndex}##${ROW_KEYLABELS[2].key}`;

  return (
    <>
      <div
        key={`row##${rowKeyPref}##${ROW_KEYLABELS[0].key}`}
        className="st_table st_table_row"
      >
        <div key={`row##${rowKeyPref}##${ROW_KEYLABELS[0].key}0`}>
          {rowData[ROW_KEYLABELS[0].key]}
        </div>
        <div key={`row##${rowKeyPref}##${ROW_KEYLABELS[0].key}1`}>
          <button
            className={`st_button st_button_pii ${
              rowData[ROW_KEYLABELS[1].key] && 'active'
            }`}
            onClick={(e) => toggleRowField(e, rowFieldPII)}
          >
            PII
          </button>
        </div>
        <div key={`row##${rowKeyPref}##${ROW_KEYLABELS[0].key}2`}>
          <button
            className={`st_button st_button_masking ${
              rowData[ROW_KEYLABELS[2].key] && 'active'
            }`}
            onClick={(e) => toggleRowField(e, rowFieldMasking)}
          >
            Masked
          </button>
        </div>
        <div key={`row##${rowKeyPref}##${ROW_KEYLABELS[0].key}3`}>
          <button className="st_button st_button_type">
            {rowData[ROW_KEYLABELS[3].key]}
          </button>
        </div>
      </div>
    </>
  );
};

export default StRouterDetailRow;
