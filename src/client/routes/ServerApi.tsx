const baseUrl = process.env.REACT_APP_SERVER_HOST;

export const getMemoList = async (headers: { [key: string]: string }) => {
    const result: MemoListProps = await fetchFromServer(
        `${baseUrl}/api/memos`,
        { method: "GET", headers: headers }
    );

    return result.memoList.map((part) => {
        return {
            key: part._id,
            title: part.title,
            date: part.date,
        };
    });
};

export const getMemoDetail = async (id: string): Promise<MemoDetailProps> => {
    return fetchFromServer(`${baseUrl}/api/memos/${id}`, { method: "GET" });
};

export const postNewMemo = async (body: InputProps) => {
    const memo = JSON.stringify(body);
    const result = await fetchFromServer(`${baseUrl}/api/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: memo,
    });
    return result;
};

export const updateMemo = async (body: InputProps, id: string) => {
    const memo = JSON.stringify(body);
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
    const response = await fetch(url, config);
    return response.json();
};

interface MemoProps {
    _id: string;
    title: string;
    date: string;
}

interface MemoListProps {
    memoList: MemoProps[];
}

interface InputProps {
    title: string;
    text: string;
}

interface MemoDetailProps {
    title: string;
    text: string;
}
