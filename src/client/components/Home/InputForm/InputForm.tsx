import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { StatusContext } from "#c/components/Home/Home";
import { postNewMemo } from "#c/routes/ServerApi";
import { FailedFinishProps, InputMemoProps } from "#c/types/interfaces";

import "#c/components/Home/InputForm/InputForm.css";

const { TextArea } = Input;
const { Item: FormItem } = Form;

const required = {
    rules: [{ required: true }],
};

export const InputForm: React.FC = () => {
    const homeState = useContext(StatusContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    return (
        <Form
            id="InputForm--Base"
            form={form}
            initialValues={{ title: "", text: "" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <div id="InputForm--Title">
                <FormItem name="title" {...required}>
                    <Input
                        placeholder="Title"
                        maxLength={50}
                        showCount
                        allowClear
                    />
                </FormItem>
            </div>
            <div id="InputForm--Body">
                <FormItem name="text" {...required}>
                    <TextArea
                        id="InputForm--Body--TextArea"
                        placeholder="Memo Body"
                        maxLength={1000}
                        showCount
                    />
                </FormItem>
            </div>
            <div id="InputForm--Submit">
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Add <SendOutlined />
                    </Button>
                </FormItem>
            </div>
        </Form>
    );

    function onFinish(values: InputMemoProps) {
        setLoading(true);
        postNewMemo(values)
            .then(() => {
                homeState.setRequireReload(true);
                form.setFieldsValue({ title: "", text: "" });
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    function onFinishFailed({
        values,
        errorFields,
        outOfDate,
    }: FailedFinishProps) {
        console.log("error!");
        console.log(values, errorFields, outOfDate);
    }
};
