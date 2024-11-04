import styles from './Tooltip.module.css'

export default function Tooltip({ children, title, position }) {
    return (
        <div className={styles.Tooltip} data-position={position} data-tool-tip={title}>
            {children}
        </div>
    )
}
