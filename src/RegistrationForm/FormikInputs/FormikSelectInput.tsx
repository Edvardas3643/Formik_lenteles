import React from "react";
import {FormikProps} from "formik";
import {FormControl, FormHelperText, Select} from "@material-ui/core";

interface TextFieldProps {
    formikProps: FormikProps<any>,
    field: string,
}

export const FormikDocumentSelect: React.FC<TextFieldProps> = ({
    formikProps,
    field,
    }) => {
    const {errors, values, setFieldValue} = formikProps
    return (
        <FormControl variant="outlined" style={{margin: '16px'}}>
            <Select
                native
                value={values[field]}
                onChange={(event) => setFieldValue(field, event.target.value)}
                inputProps={{
                    name: field,
                    id: 'outlined-age-native-simple',
                }}
            >
                <option value={'Pasas'}>Pasas</option>
                <option value={'Gimimo sertifikatas'}>Gimimo sertifikatas</option>
            </Select>
            { errors[field] && <FormHelperText error>{errors[field]}</FormHelperText> }
        </FormControl>
    )
}