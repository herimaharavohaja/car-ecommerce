import getList from "./services/getList";
import getOne from "./services/getOne";
import create from "./services/create";
import deleteAction from "./services/delete";
import deleteMany from "./services/deleteMany";
import update from "./services/update";

const dataProvider: any= {
    getList,
    getOne,
    create,
    update,
    delete: deleteAction,
    deleteMany,
};

export default dataProvider;
