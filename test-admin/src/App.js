import * as React from "react";
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserList} from './users';
import {PostCreate, PostEdit, PostList} from './posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
    <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={UserList}  icon={UserIcon}/>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}  icon={PostIcon}/>
    </Admin>
);

export default App;
