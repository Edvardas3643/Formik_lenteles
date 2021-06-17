import React from "react";
import TextField from '@material-ui/core/TextField';
import {FormikProps} from "formik";

interface TextFieldProps{
    formikProps: FormikProps<any>,
    field: string,
    label: string,
    type?: string
}

export const FormikTextField: React.FC<TextFieldProps> = ({

    formikProps,
    field,
    label,
    type
   }) => {
    const {errors, setFieldValue, values} = formikProps
    return (
        <TextField
            value={values[field]}
            type={type}
            variant={"outlined"}
            id={field}
            label={label}
            defaultValue={null}
            onChange={(event) => setFieldValue(field, event.target.value)}
            helperText={errors[field]}
            error={!!errors[field]}
            style={{background: "white", margin: '16px'}}
        />
    )
}