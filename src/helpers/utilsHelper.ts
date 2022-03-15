


export const getvalue = async (arr:Array[], key:string) : Promise<any> => {

    return (arr: any[],key: string) => (arr.find((x: {}) => Object.keys(x)[0] === key) || {})[key]
     

}