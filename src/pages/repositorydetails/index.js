import { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './repositorydetails.module.css';
import { useAppData } from '../../context/appContext';

export default (props) => {
    const { selectedRepository } = useAppData();
    const navigate = useNavigate();

    if (selectedRepository) {
        return (
            <div className={styles.detailsContainer}>
                <h1>
                    <a href={selectedRepository.url} target="_blank">
                        {selectedRepository.full_name}
                    </a>
                </h1>
    
                <div className={`${styles.repositoryDetails} ${styles.detailsSection}`}>
                    <h3>Repository Details</h3>
                    <p>
                        {selectedRepository.description}
                    </p>
                    <table className={styles.detailsTable}>
                        <tbody>
                            <tr>
                                <th>Created at:</th>
                                <td>{selectedRepository?.created_at?.split('T')[0]}</td>
                            </tr>
                            <tr>
                                <th>Last updated:</th>
                                <td>{selectedRepository?.updated_at?.split('T')[0]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className={styles.backButton} onClick={() => {
                    navigate('/searchresults');
                }}>
                    <img src="/images/backButton.png" />
                </button>
            </div>
        )
    } else {
        return (
            <Navigate to="/searchresults" />
        )
    }
}