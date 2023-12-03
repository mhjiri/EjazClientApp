import React from 'react';
import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    disabled?:boolean;
    value?:string;
    format?:string;
}

export default function EjazTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <input className='form-control form-control-lg form-control-solid mb-3 mb-lg-0' {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{meta.error}</div>
            </div>
            ) : null}
        </Form.Field>
    )
}
