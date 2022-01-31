const baseUrl = process.env.REACT_APP_SERVER_HOST;

export  const getMemoList = async (headers: {[key : string] : string}) => {
    const result : MemoListProps = await fetchFromServer(
        `${baseUrl}/api/memos`,
        {method: "GET", headers: headers});

    return result.memoList.map((part) => {
        return {
            key: part.memoId,
            title: part.title,
            date: part.date
        }
    });
};

export const getMemoDetail = async (id : string) : Promise<MemoDetailProps> => {
    return fetchFromServer(`${baseUrl}/api/memo/${id}`,{method: "GET"});
};

export const postNewMemo = async (body: string) => {
    const result = await fetchFromServer(
        `${baseUrl}/api/memo`,
        {method: "POST",headers: {}, body: body});
    return result;
};

export const updateMemo = async (body: string, id : string) => {
    const result = await fetchFromServer(
        `${baseUrl}/api/${id}`,
        {method: "UPDATE",headers: {}, body: body});
    return result;
};

export const deleteMemo = async (id : string) => {
    const result = await fetchFromServer(
        `${baseUrl}/api/${id}`,
        {method: "DELETE"});
    return result;
}

const fetchFromServer = async (
    url:string,
    config: {
        method: string,
        headers?: {[key : string] : string},
        body?: string
    }) => {
        const response = await fetch(url,config);
        return response.json();
}

interface MemoListProps {
    memoList: {
        memoId: string,
        title: string,
        date: string
    }[]
}

interface MemoDetailProps {
    title: string,
    text: string,
}
