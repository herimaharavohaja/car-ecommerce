"use client";

import authProvider from "@/lib/authProvider";
import dataProvider from "@/lib/dataProvider";
import { Admin, Resource } from "react-admin";
import LoginPage from "./LoginPage";
import UserList from "./users/UserList";
import Loading from "../(front-page)/Loading";
import CartList from "./cars/CarList";
import CarCreate from "./cars/CreateCar";
import CarShow from "./cars/CarShow";
import UserCreate from "./users/CreateUser";
import AppointmentList from "./appointments/AppointmentList";
import UserEdit from "./users/UserEdit";
import UserShow from "./users/UserShow";
import CarEdit from "./cars/CarEdit";

const AdminApp = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loading={Loading} loginPage={LoginPage}>
    <Resource
      name="users"
      create={UserCreate}
      list={UserList}
      edit={UserEdit}
      show={UserShow}
    />
    <Resource
      name="cars"
      create={CarCreate}
      list={CartList}
      show={CarShow}
      edit={CarEdit}
    />
    <Resource
      name="appointments"
      list={AppointmentList}
    />
  </Admin>
);

export default AdminApp;