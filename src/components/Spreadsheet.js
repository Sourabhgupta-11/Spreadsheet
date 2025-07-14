import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './Spreadsheet.css';

const defaultRows = [
  {
    job: 'Launch social media campaign for product',
    submitted: '15-11-2024',
    status: 'In-process',
    submitter: 'Aisha Patel',
    url: 'www.aishapatel.com',
    assigned: 'Sophie Choudhury',
    priority: 'Medium',
    dueDate: '20-11-2024',
    value: '6,200,000 ₹',
  },
  {
    job: 'Update press kit for company redesign',
    submitted: '',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhanportfolio.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    value: '3,500,000 ₹',
  },
  {
    job: 'Finalize user testing feedback for app',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohnson.dev',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    value: '4,750,000 ₹',
  },
  {
    job: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen.io',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    value: '5,900,000 ₹',
  },
  {
    job: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrown.org',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    value: '2,800,000 ₹',
  },
  ...Array.from({ length: 25 }, () => ({
    job: '',
    submitted: '',
    status: '',
    submitter: '',
    url: '',
    assigned: '',
    priority: '',
    dueDate: '',
    value: '',
  })),
];

const initialColumns = [
  { Header: 'Job Request', accessor: 'job' },
  { Header: 'Submitted', accessor: 'submitted' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Submitter', accessor: 'submitter' },
  { Header: 'URL', accessor: 'url' },
  { Header: 'Assigned', accessor: 'assigned' },
  { Header: 'Priority', accessor: 'priority' },
  { Header: 'Due Date', accessor: 'dueDate' },
  { Header: 'Est. Value', accessor: 'value' },
];

const Spreadsheet = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(defaultRows);
  const [activeCell, setActiveCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null);

  const handleAddColumn = () => {
    const newAccessor = `custom_${columns.length}`;
    const newColumn = { Header: `Column ${columns.length + 1}`, accessor: newAccessor };
    const updatedColumns = [...columns, newColumn];
    const updatedData = data.map((row) => ({ ...row, [newAccessor]: '' }));
    setColumns(updatedColumns);
    setData(updatedData);
  };

  const handleKeyDown = (e) => {
    if (!activeCell) return;
    let [row, col] = activeCell;

    if (e.key === 'ArrowDown') row = (row + 1) % data.length;
    else if (e.key === 'ArrowUp') row = (row - 1 + data.length) % data.length;
    else if (e.key === 'ArrowRight') col = (col + 1) % columns.length;
    else if (e.key === 'ArrowLeft') col = (col - 1 + columns.length) % columns.length;

    setActiveCell([row, col]);
    setEditingCell(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCell, columns.length]);

  const handleCellChange = (rowIndex, accessor, value) => {
    const updated = [...data];
    updated[rowIndex][accessor] = value;
    setData(updated);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-auto border rounded shadow-sm text-sm bg-white">
      <table {...getTableProps()} className="table-auto w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest}>
                {headerGroup.headers.map((column, colIndex) => {
                  const { key: colKey, ...colProps } = column.getHeaderProps();
                  return (
                    <th
                      key={colKey}
                      {...colProps}
                      className="px-4 py-2 border-b text-left bg-gray-100"
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}

                <th
                  onClick={handleAddColumn}
                  className="px-4 py-2 border-b text-left bg-gray-100 text-blue-600 font-bold cursor-pointer"
                  style={{ minWidth: '80px' }}
                >
                  +
                </th>
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            const { key: rowKey, ...rowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...rowProps} className="border-t">
                {row.cells.map((cell, colIndex) => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps();
                  const isActive =
                    activeCell &&
                    activeCell[0] === rowIndex &&
                    activeCell[1] === colIndex;
                  const isEditing =
                    editingCell &&
                    editingCell[0] === rowIndex &&
                    editingCell[1] === colIndex;

                  return (
                    <td
                      key={cellKey}
                      {...cellProps}
                      className={`px-4 py-2 border border-gray-200 cursor-pointer ${
                        isActive
                          ? 'bg-yellow-100 ring-2 ring-yellow-400'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setActiveCell([rowIndex, colIndex]);
                        setEditingCell([rowIndex, colIndex]);
                      }}
                    >
                      {isEditing ? (
                        <input
                          className="w-full border rounded px-1 py-0.5"
                          autoFocus
                          value={cell.value || ''}
                          onChange={(e) =>
                            handleCellChange(rowIndex, cell.column.id, e.target.value)
                          }
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                        />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
                <td className="border border-gray-200"></td> 
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
