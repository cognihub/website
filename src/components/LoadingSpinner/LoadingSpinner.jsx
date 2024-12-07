import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
    return (
        <div className={styles.LoadingSpinnerContainer}>
            <div className={styles.loadingspinner}>
                <div id={styles.square1} />
                <div id={styles.square2} />
                <div id={styles.square3} />
                <div id={styles.square4} />
                <div id={styles.square5} />
            </div>
        </div>
    )
}
