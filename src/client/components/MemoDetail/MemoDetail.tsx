import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DisplayIcon } from "#c/components/MemoDetail/DisplayIcon";

import { DisplayMemo } from "./DisplayMemo/DisplayMemo";
import { getMemoDetail } from "#c/routes/ServerApi";

import "#c/components/MemoDetail/MemoDetail.css";
interface statusAbstract {
    id: string;
    title: string;
    text: string;
    requireLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MemoStatus = createContext<statusAbstract>({
    id: "",
    title: "",
    text: "",
    requireLoad: {} as React.Dispatch<React.SetStateAction<boolean>>,
});

export const MemoDetail: React.FC = () => {
    const params = useParams();
    const memoId = params.memoId !== undefined ? params.memoId : "-";
    const [memo, setMemo] = useState({ title: "", text: "" });
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        if (load) {
            setLoading(true);
            getMemoDetail(memoId)
                .then((result) => {
                    setMemo(result);
                    setLoading(false);
                    setLoad(false);
                })
                .catch((err) => console.log(err));
        }
    }, [load]);

    const memoValue: statusAbstract = {
        id: memoId,
        title: memo.title,
        text: memo.text,
        requireLoad: setLoad,
    };

    return (
        <div id="MemoDetail--Base">
            {loading ? (
                <DisplayIcon />
            ) : (
                <MemoStatus.Provider value={memoValue}>
                    <DisplayMemo />
                </MemoStatus.Provider>
            )}
        </div>
    );
};
