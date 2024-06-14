import { DeleteManyParams, fetchUtils } from "react-admin";
import apiUrl from "../api";
const baseUrl = apiUrl();

const deleteMany = async (resource: string, params: DeleteManyParams) => {
    const { ids } = params;
    const deletePromises = ids.map(async (id: any) => {
        const { json } = await fetchUtils.fetchJson(
            `${baseUrl}/${resource}/${id}`, { method: "DELETE", }
        );
        return json;
    });
    const deletedResources = await Promise.all(deletePromises);
    return {
        data: deletedResources,
    };
}

export default deleteMany;