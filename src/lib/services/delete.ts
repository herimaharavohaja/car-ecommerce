import { DeleteParams, fetchUtils } from "react-admin";
import apiUrl from "../api";

const baseUrl = apiUrl();
const deleteAction = async (resource: string, params: DeleteParams) => {
    const { json } = await fetchUtils.fetchJson(`${baseUrl}/${resource}/${params.id}`,{method: "DELETE",});
    return {
        data: json,
    };
}

export default deleteAction;

