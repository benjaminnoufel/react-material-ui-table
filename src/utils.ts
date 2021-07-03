export const entriesNotIn = (elements: string[]) => ([key]: [string, string]) => !elements.includes(key);
export const reorderFromObject = (object: Record<string, any>, target: Record<string, any>) => Object.fromEntries(Object.keys(object).map((key: string) => [key, target[key]]));
export const objectByString = (searchOnColunns: string | null) => (row: Record<string, any>) => {
    if (!searchOnColunns) {
        return row;
    }
    return Object.values(row).some((column: any) => String(column).toLowerCase().includes(searchOnColunns.toLowerCase()));
};
