export function resolveHeader(...attribute: string[]) {
    return attribute.map((str) => {
        return {
            title: str.charAt(0).toUpperCase() + str.slice(1),
            dataIndex: str,
        };
    });
}
