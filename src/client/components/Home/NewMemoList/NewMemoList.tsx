import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";

import { StatusContext, testContext } from "#c/components/Home/Home";
import TestMemoList from "dummy/memoListFromServer.json";

import "#c/components/Home/NewMemoList/NewMemoList.css";
import { useNavigate } from "react-router-dom";
import { InnerPaths } from "#c/routes/InnerPaths";
// import { getMemoList } from "#c/routes/ServerApi";

const headerData = resolveHeader("title", "date");
interface DataProps {
    key: string;
    title: string;
    date: string;
}

export const NewMemoList: React.FC = () => {
    const add = useContext(testContext);

    const redirect = useNavigate();
    const homeState = useContext(StatusContext);
    const [tableData, setTableData] = useState<DataProps[]>([]);
    //const [ loading, setLoading ] = useState(false);

    // table body's max height : 64, 0.9, 82 are other elements height
    const tableScrollControl =
        (document.documentElement.clientHeight - 64) * 0.9 - 82;

    useEffect(() => {
        if (homeState.requireReload === true) {
            const { memoList } = TestMemoList;
            console.log(memoList);
            setTableData(
                memoList
                    .map(({ memoId, title, date }): DataProps => {
                        return {
                            key: memoId,
                            title:
                                title.length >= 20
                                    ? title.slice(0, 20) + "…"
                                    : title,
                            date: date,
                        };
                    })
                    .concat(add.addisional)
                    .slice(0, 15)
            );
            homeState.setRequireReload(false);
        }
    }, [homeState.requireReload]);

    // useEffect(() => {
    //     if(homeState.requireReload === true){
    //         setLoading(true);
    //         homeState.setRequireReload(false);
    //         getMemoList({"SortConf": "date", "StartNum": "1"}).then((result) => {
    //             setTableData(result);
    //             setLoading(false);
    //         }).catch((err) => {console.log(err)});
    //     }
    // },[homeState.requireReload]);

    return (
        <div id="NewMemoList--Base">
            <div id="NewMemoList--Box">
                <div id="NewMemoList--Head">New Memos!</div>
                <div id="NewMemoList--Table">
                    <Table
                        columns={headerData}
                        dataSource={tableData}
                        //loading={loading}
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

function resolveHeader(...attribute: string[]) {
    return attribute.map((str) => {
        return {
            title: str.charAt(0).toUpperCase() + str.slice(1),
            dataIndex: str,
        };
    });
}
