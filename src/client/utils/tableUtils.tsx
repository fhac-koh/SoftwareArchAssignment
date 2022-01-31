export const resolveHeader = (...attribute: [string, number][]) => {
    return attribute.map((str) => {
        const [name, width] = str;
        return {
            title: name.charAt(0).toUpperCase() + name.slice(1),
            dataIndex: name,
            width: `${width}%`,
        };
    });
};
