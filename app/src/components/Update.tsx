import React from "react";
import { IBank, IBankUpdate } from "../types";
import { Form, Modal } from 'antd';
import { useUpdateBankMutation } from "../api/bank.slice";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { updateBankSchema } from "../validation/bank";


export default function UpdateBank({ bank, visible = false, onCancel }: { bank?: IBank, visible: boolean, onCancel: () => void }) {

    const [updateBank, { isLoading: updateLoading, error: updateError }] = useUpdateBankMutation();


    const { register, handleSubmit, setError, clearErrors, formState: { errors }, setValue } = useForm<IBankUpdate>({
        resolver: joiResolver(updateBankSchema)
    });

    React.useEffect(() => {
        if (bank) {
            setValue("name", bank.name);
            setValue("accountType", bank.accountType);
            setValue("country", bank.country);
            setValue("currency", bank.currency);
            setValue("Date", bank.Date);
            setValue("minBalanceWarning", bank.minBalanceWarning);
            setValue("number", bank.number);
            setValue("startingBalance", bank.startingBalance);
        }
    }, [bank])


    const onSubmit = (data: IBankUpdate) => {
        if (bank) {
            console.log(data);
            updateBank({ bank: data, id: bank.id }).unwrap().then(() => {
                clearErrors();
                onCancel();
            }
            ).catch((err) => {
                if (!err.data.error) return;
                err = err.data.error;
                if (err.type == "validation")
                    setError(err.attr, { message: err.msg })
            });
        }
    };


    return (

        <Modal
            title="Update Bank"
            open={visible}
            onOk={handleSubmit(onSubmit)}
            onCancel={onCancel}
            confirmLoading={updateLoading}
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
                    <input type="date" defaultValue={
                        bank?.Date ? new Date(bank.Date).toISOString().split('T')[0] : undefined
                    } {...register("Date")} />
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