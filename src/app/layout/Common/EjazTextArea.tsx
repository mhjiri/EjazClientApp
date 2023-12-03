import React from 'react';
import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
    disabled?: boolean;
}

export default function MyTextAreaInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <textarea {...field} {...props} className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'/>
            {meta.touched && meta.error ? (
            <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{meta.error}</div>
            </div>
            ) : null}
        </Form.Field>
    )
}