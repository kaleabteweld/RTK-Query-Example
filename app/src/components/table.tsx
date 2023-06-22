import React from "react";
import { IBank } from "../types";
import { Button, Table } from 'antd';
import columns, { addColumn } from "../utility/columns";
import DeleteBank from "./delete";
import UpdateBank from "./Update";



export default function BankTable({ dataSource = [], isFetching, error }: { dataSource?: IBank[], isFetching: boolean, error: any }) {

    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
    const [updateModalVisible, setUpdateModalVisible] = React.useState(false);

    const [selectedBank, setSelectedBank] = React.useState<IBank | null>(null);

    var _columns = [...columns]

    _columns = addColumn({
        title: 'Delete',
        key: 'Delete',
        dataIndex: 'Delete',
        render: (_: any, record: IBank) => (
            <span>
                <Button type="primary" onClick={() => { setSelectedBank(record); setDeleteModalVisible(true) }}>Delete </Button>
            </span>
        ),
    })

    _columns = addColumn({
        title: 'Update',
        key: 'Update',
        dataIndex: 'Update',
        render: (_: any, record: IBank) => (
            <span>
                <Button type="primary" onClick={() => { console.log("_ ", _); setSelectedBank(record); setUpdateModalVisible(true) }}>Update </Button>
            </span>
        ),

    })


    return (
        <React.Fragment>
            {selectedBank && <DeleteBank bankId={selectedBank?.id} visible={deleteModalVisible} onCancel={() => setDeleteModalVisible(false)} />}
            {selectedBank && <UpdateBank bank={selectedBank} visible={updateModalVisible} onCancel={() => setUpdateModalVisible(false)} />}

            {
                error ? <div>Error...</div> :
                    <Table dataSource={dataSource} columns={_columns} loading={isFetching} />

            }
        </React.Fragment>
    )
}   