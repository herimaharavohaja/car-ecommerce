import { GetOneParams } from "react-admin";
import { fetchUtils } from "react-admin";
import apiUrl from "../api";
const baseUrl = apiUrl();

const getOne = async (resource: string, params: GetOneParams): Promise<any> => {
    const { json } = await fetchUtils.fetchJson(`${baseUrl}/${resource}/${params.id}`);
    return {
        data: json,
    }
}

export default getOne;

