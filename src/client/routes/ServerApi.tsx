import {
    InputMemoProps,
    MemoDetailProps,
    MemoSimpleProps,
} from "#c/types/interfaces";
import { utcToJapanTime } from "#c/utils/formatUtils";

const baseUrl = process.env.REACT_APP_SERVER_HOST;

export const getMemoList = async (headers: { [key: string]: string }) => {
    const result = await fetchFromServer(`${baseUrl}/api/memos`, {
        method: "GET",
        headers: headers,
    });
    const json: MemoListProps = await result.json();
    if (json.memoList !== undefined) {
        return json.memoList.map((memo) => {
            return {
                key: memo._id,
                title: memo.title,
                date: utcToJapanTime(memo.date),
            };
        });
    } else return [];
};

export const getMemoDetail = async (id: string): Promise<MemoDetailProps> => {
    const result = await fetchFromServer(`${baseUrl}/api/memos/${id}`, {
        method: "GET",
    });
    const json: MemoDetailProps = await result.json();
    return {
        ...json,
        date: utcToJapanTime(json.date),
    };
};

export const postNewMemo = async (body: InputMemoProps) => {
    const memo = JSON.stringify(body, null, 2);
    const result = await fetchFromServer(`${baseUrl}/api/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: memo,
    });
    return result;
};

export const updateMemo = async (body: InputMemoProps, id: string) => {
    const memo = JSON.stringify(body, null, 2);
    const result = await fetchFromServer(`${baseUrl}/api/memos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: memo,
    });
    return result;
};

export const deleteMemo = async (id: string) => {
    const result = await fetchFromServer(`${baseUrl}/api/memos/${id}`, {
        method: "DELETE",
    });
    return result;
};

const fetchFromServer = async (
    url: string,
    config: {
        method: string;
        headers?: { [key: string]: string };
        body?: string;
    }
) => {
    const result = await fetch(url, config);
    if (result.ok) return result;
    throw new Error(`bad responce: ${result.status}`);
};

interface MemoListProps {
    memoList: MemoSimpleProps[];
}
