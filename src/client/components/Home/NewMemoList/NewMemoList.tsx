import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

import { StatusContext } from "#c/components/Home/Home";
import { InnerPaths } from "#c/routes/InnerPaths";
import { getMemoList } from "#c/routes/ServerApi";
import { resolveHeader } from "#c/utils/tableUtils";
import { trimString } from "#c/utils/formatUtils";

import "#c/components/Home/NewMemoList/NewMemoList.css";

const headerData = resolveHeader(["title", 55], ["date", 45]);
interface DataProps {
    key: string;
    title: string;
    date: string;
}

export const NewMemoList: React.FC = () => {
    const redirect = useNavigate();
    const homeState = useContext(StatusContext);
    const [tableData, setTableData] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState(false);

    // table body's max height : 64, 0.9, 82 are other elements height
    const tableScrollControl =
        (document.documentElement.clientHeight - 64) * 0.9 - 50;

    useEffect(() => {
        if (homeState.requireReload === true) {
            setLoading(true);
            homeState.setRequireReload(false);
            getMemoList({ SortVal: "date", SortOrder: "DESC" })
                .then((result) => {
                    const setData = result.map((memo) => {
                        return {
                            ...memo,
                            title: trimString(memo.title, 20, "…"),
                        };
                    });
                    setTableData(setData);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [homeState.requireReload]);

    return (
        <div id="NewMemoList--Base">
            <div id="NewMemoList--Box">
                <div id="NewMemoList--Head">New Memos!</div>
                <div id="NewMemoList--Table">
                    <Table
                        columns={headerData}
                        dataSource={tableData}
                        loading={loading}
                        showHeader={false}
                        pagination={false}
                        scroll={{ y: tableScrollControl }}
                        size="middle"
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    onClick(record);
                                },
                            };
                        }}
                    />
                </div>
            </div>
        </div>
    );

    function onClick(record: DataProps) {
        redirect(InnerPaths.memoDetail(record.key));
    }
};
