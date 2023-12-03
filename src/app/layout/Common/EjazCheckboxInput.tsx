import React from 'react';
import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    id:string
    name: string;
    label: string;
}

export default function EjazCheckboxInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <div className='form-check form-switch form-check-custom form-check-solid'>
                <input className='form-check-input' type="checkbox" checked={field.value} {...field} {...props}/>
                <label className="form-check-label" htmlFor={props.id}>
                    {props.label}
                </label>
            </div>
            {meta.touched && meta.error ? (
                <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{meta.error}</div>
            </div>
            ) : null}
        </Form.Field>
    )
}
