import React from 'react';
import { useTable } from 'react-table';

const data = [
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
  }
];

const columns = [
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
                {headerGroup.headers.map((column) => {
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
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key: rowKey, ...rowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...rowProps} className="border-t">
                {row.cells.map((cell) => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps();
                  return (
                    <td
                      key={cellKey}
                      {...cellProps}
                      className="px-4 py-2 border border-gray-200"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
