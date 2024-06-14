import { CreateParams, fetchUtils } from "react-admin";
import apiUrl from "../api";

const baseUrl = apiUrl();

const create = async (resource: string, params: CreateParams): Promise<any> => {
    let requestBody: FormData | string;
    const headers: HeadersInit = new Headers();

    if (resource === "cars") {
        const formData = new FormData();
        Object.keys(params.data).forEach(key => {
            if (key === 'images') {
                params.data[key].forEach((fileObj: any) => {
                    formData.append('images', fileObj.rawFile);
                });
            } else {
                formData.append(key, `${params.data[key]}`);
            }
        });
        requestBody = formData;
    } else {
        requestBody = JSON.stringify(params.data);
        headers.append('Content-Type', 'application/json');
    }

    const { json } = await fetchUtils.fetchJson(`${baseUrl}/${resource}`, {
        method: "POST",
        body: requestBody != undefined ? requestBody : undefined,
        headers: headers,
    });

    const createdResource = json;

    return {
        data: {
            ...createdResource,
            id: createdResource.id,
        },
    };

}
export default create;