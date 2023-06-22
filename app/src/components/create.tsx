import React from "react";
import { Form, Input, InputNumber, Modal, DatePicker } from 'antd';
import { IBankCreate } from "../types";
import { useCreateBankMutation } from "../api/bank.slice";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { newBankSchema } from "../validation/bank";


export default function BankCreate({ visible = false, onCancel }: { visible: boolean, onCancel: () => void }) {

    const [createBank, { isLoading: createLoading, error: createError }] = useCreateBankMutation();

    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<IBankCreate>(
        {
            resolver: joiResolver(newBankSchema)
        }
    );

    const onSubmit = handleSubmit((data) => {
        createBank(data).unwrap().then(() => {
            onCancel();
            clearErrors();

        }
        ).catch((err) => {
            if (!err.data.error) return;
            err = err.data.error;
            if (err.type == "validation")
                setError(err.attr, { message: err.msg })

        }
        );
    });

    return (
        <Modal
            title="Create Bank"
            open={visible}
            onOk={onSubmit}
            onCancel={onCancel}
            confirmLoading={createLoading}
        >
            <Form layout="vertical">
                <Form.Item label="Name">
                    <input {...register("name")} />
                    {errors.name && <p>{errors.name.message}</p>}
                </Form.Item>
                <Form.Item label="Number">
                    <input {...register("number")} />
                    {errors.number && <p>{errors.number.message}</p>}
                </Form.Item>
                <Form.Item label="Account Type">
                    <input {...register("accountType")} />
                    {errors.accountType && <p>{errors.accountType.message}</p>}
                </Form.Item>
                <Form.Item label="Starting Balance">
                    <input {...register("startingBalance")} />
                    {errors.startingBalance && <p>{errors.startingBalance.message}</p>}
                </Form.Item>
                <Form.Item label="Min Balance Warning">
                    <input {...register("minBalanceWarning")} />
                    {errors.minBalanceWarning && <p>{errors.minBalanceWarning.message}</p>}
                </Form.Item>
                <Form.Item label="Date">
                    <input type="date" {...register("Date")} />
                    {errors.Date && <p>{errors.Date.message}</p>}
                </Form.Item>
                <Form.Item label="Country">
                    <input {...register("country")} />
                    {errors.country && <p>{errors.country.message}</p>}
                </Form.Item>
                <Form.Item label="Currency">
                    <input {...register("currency")} />
                    {errors.currency && <p>{errors.currency.message}</p>}
                </Form.Item>
            </Form>
        </Modal>

    )

}