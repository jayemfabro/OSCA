const Table = ({ children, className = '' }) => {
    return (
        <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
            {children}
        </table>
    );
};

const Head = ({ children }) => {
    return <thead className="bg-gray-50">{children}</thead>;
};

const Body = ({ children }) => {
    return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
};

const Row = ({ children, className = '' }) => {
    return <tr className={className}>{children}</tr>;
};

const Cell = ({ children, className = '', header = false }) => {
    const Tag = header ? 'th' : 'td';
    const defaultClasses = header 
        ? 'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
        : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';

    return (
        <Tag className={`${defaultClasses} ${className}`}>
            {children}
        </Tag>
    );
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export default Table;
