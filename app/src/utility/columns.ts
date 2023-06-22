import { AccountType } from "../types";

var columns: any[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Account Type',
        dataIndex: 'accountType',
        key: 'accountType',
        render: (accountType: AccountType) => accountType,
    },
    {
        title: 'Starting Balance',
        dataIndex: 'startingBalance',
        key: 'startingBalance',
    },
    {
        title: 'Min Balance Warning',
        dataIndex: 'minBalanceWarning',
        key: 'minBalanceWarning',
    },
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency',
    },
];

export default columns;

export function addColumn(column: { title: string, dataIndex: string, key: string, render?: (value: any, record: any) => any }): any[] {
    if (columns.find((c) => c.key === column.key)) {
        columns.splice(columns.findIndex((c) => c.key === column.key), 1, column);
        return columns;
    }
    columns.push(column);
    return columns;
}