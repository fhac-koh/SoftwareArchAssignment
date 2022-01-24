import { InnerPaths } from "#c/routes/InnerPaths";

interface ListItemProps {
    readonly path: string;
    readonly text: string;
}

export const MenuItemList: ListItemProps[] = [
    {
        path: InnerPaths.top,
        text: "TOP",
    },
    {
        path: InnerPaths.memoList,
        text: "MEMOS",
    },
];
