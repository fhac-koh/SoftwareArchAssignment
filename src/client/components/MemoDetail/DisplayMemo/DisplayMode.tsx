import React, { useContext } from "react";

import "#c/components/MemoDetail/DisplayMemo/DisplayMemo.css";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { MemoStatus } from "#c/components/MemoDetail/MemoDetail";
import { SetEditStatus } from "#c/components/MemoDetail/DisplayMemo/DisplayMemo";
import { deleteMemo } from "#c/routes/ServerApi";

import "#c/components/MemoDetail/DisplayMemo/DisplayMemo.css";
import { useNavigate } from "react-router-dom";
import { InnerPaths } from "#c/routes/InnerPaths";

const buttonBase = {
    type: "primary" as const,
    size: "large" as const,
};

export const DisplayMode: React.FC = () => {
    const redirect = useNavigate();
    const { id, title, text } = useContext(MemoStatus);
    const setOnEdit = useContext(SetEditStatus);

    return (
        <div id="MemoDetail--DisplayMemo">
            <div id="MemoDetail--TitleVar">
                <div id="MemoDetail--TitleZone">
                    <div id="MemoDetail--Title">{title}</div>
                </div>
            </div>
            <div id="MemoDetail--BodyVar">
                <div id="MemoDetail--BodyZone">
                    <div id="MemoDetail--Body">{text}</div>
                </div>
            </div>
            <div id="MemoDetail--Buttons">
                <Button
                    id="MemoDetail--Edit"
                    {...buttonBase}
                    onClick={() => setOnEdit(true)}
                >
                    Edit
                    <EditOutlined />
                </Button>
                <div id="MemoDetail--ButtonMargin" />
                <Button
                    id="MemoDetail--Delete"
                    {...buttonBase}
                    onClick={deleteOnClick}
                    danger
                >
                    Delete
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    );

    function deleteOnClick() {
        deleteMemo(id)
            .catch((err) => console.log(err))
            .finally(() => redirect(InnerPaths.home));
    }
};
