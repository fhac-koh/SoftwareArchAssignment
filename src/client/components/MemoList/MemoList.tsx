import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Select, Table } from "antd";

import { resolveHeader } from "#c/utils/tableUtils";
import { getMemoList } from "#c/routes/ServerApi";
import { InnerPaths } from "#c/routes/InnerPaths";

import "#c/components/MemoList/MemoList.css";

const { Option } = Select;

const headerData = resolveHeader(["title", 80], ["date", 20]);
interface DataProps {
    key: string;
    title: string;
    date: string;
}

export const MemoList: React.FC = () => {
    const redirect = useNavigate();
    const [tableData, setTableData] = useState<DataProps[]>([]);
    const [formStatus, setFormStatus] = useState({
        SortOrder: "DESC",
        SortVal: "date",
    });
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (load) {
            setLoading(true);
            setLoad(false);
            getMemoList(formStatus)
                .then((result) => {
                    setTableData(result);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [load]);

    return (
        <div id="MemoList--Base">
            <div id="MemoList--Component">
                <div id="MemoList--Header">
                    <div id="MemoList--Title">Memo List</div>
                    <div id="MemoList--RightSide">
                        <div id="MemoList--SortTitle">Sort</div>
                        <div id="MemoList--SortForm">
                            <Select
                                id="MemoList--Value"
                                onChange={updateValue}
                                defaultValue="date"
                                size="large"
                            >
                                <Option value="date">Date</Option>
                                <Option value="title">Title</Option>
                            </Select>
                            <Button
                                id="MemoList--Order"
                                value={formStatus.SortOrder}
                                onClick={switchOrder}
                                size="large"
                            >
                                {formStatus.SortOrder}
                            </Button>
                        </div>
                    </div>
                </div>
                <Table
                    id="MemoList--Table"
                    columns={headerData}
                    dataSource={tableData}
                    loading={loading}
                    showHeader={false}
                    pagination={{
                        total: tableData.length,
                        showTotal: (total, range) => {
                            return `${range[0]}~${range[1]} / ${total}`;
                        },
                        showSizeChanger: true,
                        pageSizeOptions: [10, 20, 30],
                        position: ["bottomCenter"],
                    }}
                    size="middle"
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                onClick(record);
                            },
                        };
                    }}
                ></Table>
            </div>
        </div>
    );

    function updateValue(value: string) {
        setFormStatus({
            ...formStatus,
            SortVal: value,
        });
        setLoad(true);
    }

    function switchOrder() {
        setFormStatus({
            ...formStatus,
            SortOrder: formStatus.SortOrder === "ASC" ? "DESC" : "ASC",
        });
        setLoad(true);
    }

    function onClick(record: DataProps) {
        redirect(InnerPaths.memoDetail(record.key));
    }
};
