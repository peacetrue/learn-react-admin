import * as React from "react";
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name"/>
        </ReferenceInput>
    </Filter>
);
const PostTitle = ({record}) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};


export const PostList = props => (
    <List filters={<PostFilter/>} {...props}>
        <Datagrid>
            <TextField source="id"/>
            <ReferenceField source="userId" reference="users">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="title"/>
            <TextField source="body"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const PostEdit = props => (
    <Edit title={<PostTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput source="body" multiline/>
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput source="body" multiline/>
        </SimpleForm>
    </Create>
);
