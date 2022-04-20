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
      <div className="st_table st_table_row">
        <div>{rowData[ROW_KEYLABELS[0].key]}</div>
        <div>
          <button
            className={`st_button st_button_pii ${
              rowData[ROW_KEYLABELS[1].key] && 'active'
            }`}
            onClick={(e) => toggleRowField(e, rowFieldPII)}
          >
            PII
          </button>
        </div>
        <div>
          <button
            className={`st_button st_button_masking ${
              rowData[ROW_KEYLABELS[2].key] && 'active'
            }`}
            onClick={(e) => toggleRowField(e, rowFieldMasking)}
          >
            Masked
          </button>
        </div>
        <div>
          <button className="st_button st_button_type">
            {rowData[ROW_KEYLABELS[3].key]}
          </button>
        </div>
      </div>
    </>
  );
};

export default StRouterDetailRow;
