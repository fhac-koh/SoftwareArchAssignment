import React from "react";

import { Button, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

import "#c/components/Home/InputForm/InputForm.css";


const { TextArea } = Input;
const { Item: FormItem } = Form;

const required = {
    rules : [{ required: true}],
}

export const InputForm: React.FC = () => {
    function onFinish(values : unknown) {
        console.log(JSON.stringify(values, null, 2));
    };

    const [form] = Form.useForm();

    return (
        <Form
        id="InputForm--Base"
        form={form}
        onFinish={onFinish}
        >
            <div id="InputForm--Title">
                <FormItem name="title" {...required}>
                    <Input
                    id="a"
                    placeholder="Title"
                    maxLength={50}
                    showCount allowClear/>
                </FormItem>
            </div>
            <div id="InputForm--Body">
                <FormItem name="text" {...required}>
                    <TextArea
                    id="InputForm--Body--TextArea"
                    placeholder="Memo Body"
                    maxLength={1000}
                    showCount/>
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
};
