import { InnerPaths } from "#c/routes/InnerPaths";

interface ListItemProps {
    readonly path: string;
    readonly text: string;
}

export const MenuItemList: ListItemProps[] = [
    {
        path: InnerPaths.home,
        text: "HOME",
    },
    {
        path: InnerPaths.memoList,
        text: "MEMOS",
    },
];
