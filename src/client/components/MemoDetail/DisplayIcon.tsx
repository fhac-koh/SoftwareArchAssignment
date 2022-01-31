import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

import "#c/components/MemoDetail/DisplayIcon.css";

export const DisplayIcon: React.FC = () => {
    return (
        <div id="MemoDetail--DisplayIcon">
            <div id="MemoDetail--WrapIcon">
                <LoadingOutlined id="MemoDetail--LoadingIcon" />
            </div>
        </div>
    );
};
