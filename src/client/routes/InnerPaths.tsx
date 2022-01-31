export const InnerPaths = {
    home: "/home",
    memoList: "/memos",
    memoDetail: (id: string) => {
        return `/memo/${id}`;
    },
} as const;
