import React, { useContext } from "react";

import { Button, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

import "#c/components/Home/InputForm/InputForm.css";
import { StatusContext } from "#c/components/Home/Home";
import { postNewMemo } from "#c/routes/ServerApi";

const { TextArea } = Input;
const { Item: FormItem } = Form;

interface InputProps {
    title: string;
    text: string;
}

interface FailedProps {
    values: unknown;
    errorFields: unknown;
    outOfDate: unknown;
}

const required = {
    rules: [{ required: true }],
};

export const InputForm: React.FC = () => {
    const homeState = useContext(StatusContext);
    const [form] = Form.useForm();

    return (
        <Form
            id="InputForm--Base"
            form={form}
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
                    <Button type="primary" htmlType="submit">
                        Add <SendOutlined />
                    </Button>
                </FormItem>
            </div>
        </Form>
    );

    function onFinish(values: InputProps) {
        postNewMemo(values).catch((err) => console.log(err));
        homeState.setRequireReload(true);
    }

    function onFinishFailed({ values, errorFields, outOfDate }: FailedProps) {
        console.log("error!");
        console.log(values, errorFields, outOfDate);
    }
};
