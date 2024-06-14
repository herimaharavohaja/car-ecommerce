import { GetListParams, fetchUtils } from "react-admin";
import apiUrl from "../api";

const baseUrl = apiUrl();

 const getList = async (resource: string, params: GetListParams) => {
    const { json } = await fetchUtils.fetchJson(
        `${baseUrl}/${resource}?page=${params.pagination.page}&perPage=${params.pagination.perPage}`
    );    
    return {
        data: json.data,
        total: json.total,
    };
}

export default getList;
