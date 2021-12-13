import styles from "./modal.module.css";

const TableModal = ({ isVisible = false, setModalVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
          <button onClick={() => setModalVisible(false)}>
            Close
          </button>
        
    </div>
  );
};

export default TableModal;
