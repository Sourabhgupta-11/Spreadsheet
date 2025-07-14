import React, { useState, useEffect } from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
} from 'react-table';
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

const Spreadsheet = () => {
  const [columns, setColumns] = useState([
    { Header: '#', accessor: 'rowIndex', disableResizing: true, width: 40 },
    { Header: 'Job Request', accessor: 'job', resizable: true },
    { Header: 'Submitted', accessor: 'submitted', resizable: true },
    { Header: 'Status', accessor: 'status', resizable: true },
    { Header: 'Submitter', accessor: 'submitter', resizable: true },
    { Header: 'URL', accessor: 'url', resizable: true },
    { Header: 'Assigned', accessor: 'assigned', resizable: true },
    { Header: 'Priority', accessor: 'priority', resizable: true },
    { Header: 'Due Date', accessor: 'dueDate', resizable: true },
    { Header: 'Est. Value', accessor: 'value', resizable: true },
  ]);
  const [data, setData] = useState(defaultRows);
  const [activeCell, setActiveCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null);

  const augmentedData = data.map((row, index) => ({
    ...row,
    rowIndex: index + 1,
  }));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: augmentedData,
      defaultColumn: {
        minWidth: 80,
        width: 150,
        maxWidth: 400,
      },
    },
    useFlexLayout,
    useResizeColumns
  );

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
    if (accessor !== 'rowIndex') {
      updated[rowIndex][accessor] = value;
      setData(updated);
    }
  };

  const handleAddColumn = () => {
    const newAccessor = `custom_${columns.length}`;
    const newColumn = {
      Header: `Column ${columns.length}`,
      accessor: newAccessor,
      resizable: true,
    };
    const updatedColumns = [...columns, newColumn];
    const updatedData = data.map((row) => ({ ...row, [newAccessor]: '' }));
    setColumns(updatedColumns);
    setData(updatedData);
  };

  return (
    <div className="overflow-auto border rounded shadow-sm text-sm bg-white">
      <div {...getTableProps()} className="table w-full">
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr bg-gray-100 border-b">
              {headerGroup.headers.map((column, colIndex) => (
                <div
                  {...column.getHeaderProps()}
                  className={`th font-medium text-left px-2 py-2 border-r relative ${
                    column.id === 'rowIndex' ? 'text-center w-[40px] min-w-[40px] max-w-[40px]' : ''
                  }`}
                >
                  {column.render('Header')}
                  {column.canResize && (
                    <div {...column.getResizerProps()} className="resizer" />
                  )}
                </div>
              ))}
              {/* + Column Header */}
              <div
                className="th text-blue-600 font-bold px-2 py-2 cursor-pointer justify-center items-center flex border-l border-gray-300 min-w-[60px] max-w-[60px]"
                style={{ width: '60px', flexShrink: 0 }}
                onClick={handleAddColumn}
              >
                +
              </div>
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr border-b">
                {row.cells.map((cell, colIndex) => {
                  const isActive =
                    activeCell &&
                    activeCell[0] === rowIndex &&
                    activeCell[1] === colIndex;
                  const isEditing =
                    editingCell &&
                    editingCell[0] === rowIndex &&
                    editingCell[1] === colIndex;
                  return (
                    <div
                      {...cell.getCellProps()}
                      className={`td px-2 py-1 border-r cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap ${
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
                          autoFocus
                          className="w-full border rounded px-1 py-0.5"
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
                    </div>
                  );
                })}
                {/* Matching + Column Body Cell */}
                <div
                  className="td border-l border-gray-200"
                  style={{ width: '60px', flexShrink: 0 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Spreadsheet;
