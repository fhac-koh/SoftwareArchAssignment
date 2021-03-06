import React, { createContext, useState } from "react";

import { DisplayMode } from "#c/components/MemoDetail/DisplayMemo/DisplayMode";
import { EditMode } from "#c/components/MemoDetail/DisplayMemo/EditMode";

import "#c/components/MemoDetail/DisplayMemo/DisplayMemo.css";
export const SetEditStatus = createContext(
    {} as React.Dispatch<React.SetStateAction<boolean>>
);

export const DisplayMemo: React.FC = () => {
    const [onEdit, setOnEdit] = useState(false);
    return (
        <SetEditStatus.Provider value={setOnEdit}>
            {onEdit ? <EditMode /> : <DisplayMode />}
        </SetEditStatus.Provider>
    );
};
