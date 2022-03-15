


export const getValue = async (arr: any, column: string): Promise<any> => {

    const data = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(arr[0]))));
    return data[0].column;
}

export const affectedRows = async (arr: any): Promise<boolean> => {
    const data = JSON.parse(JSON.stringify(arr));
    return (data[0].affectedRows == 1)
}