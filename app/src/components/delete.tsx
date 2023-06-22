import React from "react";
import { Modal, message } from 'antd';
import { useDeleteBankMutation } from "../api/bank.slice";

export default function DeleteBank({ bankId, visible = false, onCancel }: { bankId?: number, visible: boolean, onCancel: () => void }) {

    const [deleteBank, { isLoading: deleteLoading, error: deleteError }] = useDeleteBankMutation();

    const onSubmit = () => {
        if (bankId) {
            deleteBank(bankId).unwrap().then(() => {
                onCancel();
            }
            ).catch((err) => {
                if (!err.data.error) return;
                err = err.data.error;
                if (err.type == "validation")
                    message.error(err.msg);
            });
        }
    };

    return (
        <Modal
            title="Delete Bank"
            open={visible}
            onOk={onSubmit}
            onCancel={onCancel}
            confirmLoading={deleteLoading}
        >
            <p>Are you sure you want to delete this bank?</p>
        </Modal>

    )
}