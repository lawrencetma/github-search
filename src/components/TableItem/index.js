import styles from "./tableitem.module.css";
import { useAppData } from '../../context/appContext';
import { useNavigate } from "react-router-dom";


const TableItem = ({record, index, setModalVisible, setRecord}) => {
    const { setRepository } = useAppData();
    const navigate = useNavigate();
    let rowClass = {}

    if (index % 2 === 0) {
        rowClass = styles.oddRowContainer;
    } else {
        rowClass = styles.evenRowContainer;
    }

    return (
        <tr key={index} className={rowClass}>
            <td>{record.name}</td>
            <td>
                <a href={record.html_url} target="_blank">{record.full_name}</a>
            </td>
            <td>{record.owner.login}</td>
            <td>{record.language ? record.language : 'N/A'}</td>
            <td>{record.forks}</td>
            <td>{record.stargazers_count}</td>
            <td>{record.updated_at.split('T')[0]}</td>
            <td>
                <button className={styles.menuButton} onClick={(e) => {
                    setRepository(record)
                    setModalVisible(true)
                    navigate('/repositorydetails')
                }}>
                    <img src="/images/threeDots.png" />
                </button>
            </td>
        </tr>
    )
}

export default TableItem;