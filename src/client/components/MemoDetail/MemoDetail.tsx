import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DisplayIcon } from "#c/components/MemoDetail/DisplayIcon";

import "#c/components/MemoDetail/MemoDetail.css";

import TestData from "dummy/memoDetailFromServer.json";
import { DisplayMemo } from "./DisplayMemo/DisplayMemo";
// import { getMemoDetail } from "#c/routes/ServerApi";

interface statusAbstract {
    id: string;
    title: string;
    text: string;
}

export const MemoStatus = createContext<statusAbstract>({
    id: "",
    title: "",
    text: "",
});

export const MemoDetail: React.FC = () => {
    const params = useParams();
    const memoId = params.memoId !== undefined ? params.memoId : "-";
    const [memo, setMemo] = useState({ title: "", text: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setMemo({
            title: TestData.title,
            text: TestData.text,
        });
        setLoading(false);
        // getMemoDetail(memoId).then((result) => {
        //     setMemo(result);
        //     setLoading(false);
        // }).catch((err) => console.log(err));
    }, []);

    const memoValue: statusAbstract = {
        id: memoId,
        title: memo.title,
        text: memo.text,
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
