import { UpdateParams, fetchUtils } from "react-admin";
import apiUrl from "../api";
const baseUrl = apiUrl();

const update = async (resource: string, params: UpdateParams) => {
    const { json } = await fetchUtils.fetchJson(
        `${baseUrl}/${resource}/${params.id}`, { method: "PUT", body: JSON.stringify(params.data), });
    return {
        data: json,
    };
}

export default update;