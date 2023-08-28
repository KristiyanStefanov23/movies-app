import css from './majorNav.module.css';

function MajorNavItem({ Icon, label, list = [] }) {
    function handleClick() {
        if (!list.length) return;
    }
    return (
        <li onClick={handleClick} className={css.item}>
            <div className={!!list.length && css.section}>
                <span>
                    <span className={css.icon}>{Icon && <Icon />}</span>
                    <span className={css.label}>{label}</span>
                </span>
            </div>
            {!!list.length && (
                <ul>
                    {list.map((Item) => (
                        <li>{Item}</li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default MajorNavItem;
