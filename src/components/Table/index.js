import { useState } from "react";
import styles from "./table.module.css";
import TableModal from "../TableModal";
import TableItem from "../TableItem";


// columns: [name, url, owner, language, forks, stars, last_updated ]
const renderColumnHeaders = (columns) => {
    return (
      <thead>
        <tr className={styles.headerContainer}>
          {columns.map((column, index) => {
            return (
              <th key={index} className={styles.columnStyle}>
                {column}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };
  
  const renderTableRows = (
    tableData,
    setModalVisible,
  ) => {
    if (tableData.length > 0) {
      return (
        <tbody>
          {tableData.map((record, index) => {
            return (
              <TableItem
                record={record}
                index={index}
                setModalVisible={setModalVisible}
              />
            );
          })}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            No Matching Repositories
          </tr>
        </tbody>
      )
    }
  };
  
  const Table = ({ columns, tableData, containerClass }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <div className={containerClass}>
        <table className={styles.resultsTable}>
          {renderColumnHeaders(columns)}
          {renderTableRows(tableData, setModalVisible)}
        </table>
        <TableModal isVisible={modalVisible} setModalVisible={setModalVisible} />
      </div>
    );
  };
  
  export default Table;