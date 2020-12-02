import * as React from "react";
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
    List,
    minLength,
    ReferenceField,
    ReferenceInput,
    required,
    SaveButton,
    SelectInput,
    SimpleForm,
    SimpleList,
    TextField,
    TextInput,
    Toolbar
} from 'react-admin';
import {useMediaQuery} from '@material-ui/core';
import {useForm} from 'react-final-form'


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


export const PostList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (<List filters={<PostFilter/>} {...props}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.title}
                secondaryText={record => `${record.views} views`}
                tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
            />
        ) : (
            <Datagrid>
                <TextField source="id"/>
                <ReferenceField label="User" source="userId" reference="users">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="title"/>
                <TextField source="body"/>
                <EditButton/>
            </Datagrid>
        )}
    </List>)
};

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

const PostCreateToolbar = props => {
    console.info('PostCreateToolbar.props:', props);
    let formApi = useForm();
    return (
        <Toolbar {...props} >
            <SaveButton
                saving={props.saving}
                handleSubmitWithRedirect={event => {
                    formApi.change('stateId', '1');
                    return props.handleSubmitWithRedirect(event)
                }}
                label="stateId=1 not required"
                redirect="show"
                submitOnEnter={true}
            />
            <SaveButton
                saving={props.saving}
                handleSubmitWithRedirect={event => {
                    formApi.change('stateId', '2');
                    return props.handleSubmitWithRedirect(event)
                }}
                label="stateId=2 required"
                redirect={false}
                submitOnEnter={false}
                variant="text"
            />
        </Toolbar>
    )
};

const requiredInstance = required();
const stateRequired = (value, values) => {
    return values.stateId === '1' ? undefined : requiredInstance(value, values)
};
export const PostCreate = props => {
    return (
        <Create {...props}>
            <SimpleForm toolbar={<PostCreateToolbar/>}>
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="name" validate={[required()]}/>
                </ReferenceInput>
                {/*<TextInput source="stateId" validate={[required()]}/>*/}
                <TextInput source="title" validate={[stateRequired, minLength(2)]}/>
                <TextInput source="body" multiline validate={[stateRequired, minLength(2)]}/>
            </SimpleForm>
        </Create>
    )
};
