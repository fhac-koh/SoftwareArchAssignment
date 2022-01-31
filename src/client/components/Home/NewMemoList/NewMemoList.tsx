import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

import { StatusContext } from "#c/components/Home/Home";
import { InnerPaths } from "#c/routes/InnerPaths";
import { resolveHeader } from "#c/utils/tableUtils";
import { getMemoList } from "#c/routes/ServerApi";

import "#c/components/Home/NewMemoList/NewMemoList.css";

const headerData = resolveHeader("title", "date");
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
        (document.documentElement.clientHeight - 64) * 0.9 - 82;

    useEffect(() => {
        if (homeState.requireReload === true) {
            setLoading(true);
            homeState.setRequireReload(false);
            getMemoList({ SortConf: "date", StartNum: "1" })
                .then((result) => {
                    setTableData(result);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
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
                        size="middle"
                        pagination={false}
                        scroll={{ y: tableScrollControl }}
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
        console.log(record);
        redirect(InnerPaths.memoDetail(record.key));
    }
};
