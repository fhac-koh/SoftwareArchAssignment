import React, { useContext } from "react";

import "#c/components/MemoDetail/DisplayMemo/DisplayMemo.css";
import { Button, Form, Input } from "antd";
import { RollbackOutlined, SendOutlined } from "@ant-design/icons";

import { MemoStatus } from "#c/components/MemoDetail/MemoDetail";
import { SetEditStatus } from "#c/components/MemoDetail/DisplayMemo/DisplayMemo";

import "#c/components/MemoDetail/DisplayMemo/DisplayMemo.css";
import { updateMemo } from "#c/routes/ServerApi";

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

export const EditMode: React.FC = () => {
    const [form] = Form.useForm();
    const { id, title, text } = useContext(MemoStatus);
    const setOnEdit = useContext(SetEditStatus);

    return (
        <Form
            id="MemoDetail--DisplayMemo"
            form={form}
            initialValues={{ title: title, text: text }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <div id="MemoDetail--TitleVar">
                <div id="MemoDetail--TitleZone">
                    <FormItem name="title" {...required}>
                        <Input maxLength={50} showCount bordered={false} />
                    </FormItem>
                </div>
            </div>
            <div id="MemoDetail--BodyVar">
                <div id="MemoDetail--BodyZone">
                    <FormItem name="text" {...required}>
                        <TextArea
                            autoSize={{ minRows: 12, maxRows: 100 }}
                            maxLength={1000}
                            showCount
                            bordered={false}
                        />
                    </FormItem>
                </div>
            </div>
            <div id="MemoDetail--Buttons">
                <FormItem>
                    <Button
                        id="MemoDetail--Submit"
                        type="primary"
                        htmlType="submit"
                        onClick={() => setOnEdit(true)}
                    >
                        Submit
                        <SendOutlined />
                    </Button>
                </FormItem>
                <div id="MemoDetail--ButtonMargin" />
                <Button
                    id="MemoDetail--Cancel"
                    type="dashed"
                    size="large"
                    onClick={() => setOnEdit(false)}
                    danger
                >
                    Cancel
                    <RollbackOutlined />
                </Button>
            </div>
        </Form>
    );

    function onFinish(values: InputProps) {
        console.log(JSON.stringify(values, null, 2), id);
        updateMemo(values, id).catch((err) => console.log(err));
        setOnEdit(false);
    }

    function onFinishFailed({ values, errorFields, outOfDate }: FailedProps) {
        console.log("error!");
        console.log(values, errorFields, outOfDate);
    }
};
