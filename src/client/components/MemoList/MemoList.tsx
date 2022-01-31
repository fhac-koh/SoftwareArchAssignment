import React, { useEffect, useState } from "react";

import "#c/components/MemoList/MemoList.css"
import { Table } from "antd";
import { resolveHeader } from "#c/utils/tableUtils";

import TestMemoList from "dummy/memoListFromServer.json";
import { InnerPaths } from "#c/routes/InnerPaths";
import { useNavigate } from "react-router-dom";

const headerData = resolveHeader("title", "date");
interface DataProps {
    key: string;
    title: string;
    date: string;
}

export const MemoList: React.FC = () => {
    const redirect = useNavigate();
    const [tableData, setTableData] = useState<DataProps[]>([]);
    useEffect(() => {
        const { memoList } = TestMemoList;
        setTableData( memoList.map(({memoId,title,date}) => {
            return {
                key: memoId,
                title: title,
                date: date
            }
        }) );
    },[]);

    return (
        <div id="MemoList--Base">
            <div id="MemoList--Component">
                <div id="MemoList--Header">
                    <div id="MemoList--Title">Memo List</div>
                </div>
                <Table
                    columns={headerData}
                    dataSource={tableData}
                    //loading
                    size="middle"
                    pagination={false}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                onClick(record);
                            },
                        };
                    }}
                >
                </Table>
            </div>
        </div>
    );

    function onClick(record: DataProps) {
        console.log(record);
        redirect(InnerPaths.memoDetail(record.key));
    }
};
