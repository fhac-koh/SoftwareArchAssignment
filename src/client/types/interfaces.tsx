export interface MemoDetailProps {
    title: string;
    text: string;
    date: string;
}

export interface MemoSimpleProps {
    _id: string;
    title: string;
    date: string;
}

export interface InputMemoProps {
    title: string;
    text: string;
}

export interface FailedFinishProps {
    values: unknown;
    errorFields: unknown;
    outOfDate: unknown;
}
