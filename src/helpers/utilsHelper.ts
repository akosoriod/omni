export const getRowsValue = async (arr: any, field: string): Promise<any> => {
    const data = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(arr[0]))));
    return data[0][field];
}

export const getResponseValue = async (arr: any,field: string): Promise<any> => {
    const data = JSON.parse(JSON.stringify(arr));
    return data[0][field];
}