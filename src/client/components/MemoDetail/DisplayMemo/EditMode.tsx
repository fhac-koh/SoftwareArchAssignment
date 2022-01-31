import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { RollbackOutlined, SendOutlined } from "@ant-design/icons";

import { MemoStatus } from "#c/components/MemoDetail/MemoDetail";
import { SetEditStatus } from "#c/components/MemoDetail/DisplayMemo/DisplayMemo";
import { updateMemo } from "#c/routes/ServerApi";
import { FailedFinishProps, InputMemoProps } from "#c/types/interfaces";

import "#c/components/MemoDetail/DisplayMemo/DisplayMemo.css";

const { TextArea } = Input;
const { Item: FormItem } = Form;

const required = {
    rules: [{ required: true }],
};

export const EditMode: React.FC = () => {
    const [form] = Form.useForm();
    const { id, title, text, requireLoad } = useContext(MemoStatus);
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
                            autoSize={{ maxRows: 100 }}
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

    function onFinish(values: InputMemoProps) {
        updateMemo(values, id)
            .then(() => {
                setOnEdit(false);
                requireLoad(true);
            })
            .catch((err) => console.log(err));
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
