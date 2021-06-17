import React from "react";
import TextField from '@material-ui/core/TextField';
import {FormikProps} from "formik";

interface TextFieldProps{
    formikProps: FormikProps<any>,
    field: string,
    label: string
}

export const FormikDateInput: React.FC<TextFieldProps> = ({
    formikProps,
    field,
    label
}) => {
    const {errors, setFieldValue, values} = formikProps
    return (
        <TextField
            style={{margin: '16px'}}
            variant={"outlined"}
            id={field}
            label={label}
            type="date"
            defaultValue={null}
            value={values[field]}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(value) => setFieldValue(field, value.target.value)}
            error={!!errors[field]}
            helperText={errors[field]}
        />
    )
}