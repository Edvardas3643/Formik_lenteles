import {Form, Formik} from "formik";
import React from "react";
import {FormikTextField} from "./FormikInputs/FormikTextField";
import {Button, Paper} from "@material-ui/core";
import * as Yup from 'yup'

export const SimpleForm: React.FC = () => {

    const schema = {
        firstName: {
            label: 'Vardas',
            field: 'firstName'
        },
        lastName: {
            label: 'Pavardė',
            field: 'lastName'
        },
        email: {
            label: 'Paštas',
            field: 'email'
        },
        password: {
            label: 'Slaptažodis',
            field: 'password'
        },
        confirmationPassword: {
            label: 'Slaptožodis patvirtinimui',
            field: 'confirmationPassword'
        },
    }

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmationPassword: ''
    }

    const fieldRequired = 'Šis laukas privalomas'
    const requireLowerCase = 'Privaloma bent viena mažoji raidė'
    const requireUpperCase = 'Privaloma bent viena didžioji raidė'
    const requireNumber = 'Privalomas bent vienas skaičius'
    const minLength = 'Minimalus ilgis 8 simboliai'
    const emailFormat = 'Neteisingas pašto formatas'
    const passwordMismatch = 'Slaptažodžiai nesutampa'

    const requireUpperCaseRegex = /.*[A-Z]/
    const requireLowerCaseRegex = /.*[a-z]/
    const requireNumberRegex = /.*[0-9]/

    const handlePasswordValidation = Yup.string()
        .required(fieldRequired)
        .matches(requireUpperCaseRegex, requireUpperCase)
        .matches(requireLowerCaseRegex, requireLowerCase)
        .matches(requireNumberRegex, requireNumber)
        .min(8, minLength)

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required(fieldRequired),
        lastName: Yup.string()
            .required(fieldRequired),
        email: Yup.string()
            .email(emailFormat)
            .required(fieldRequired),
        password: handlePasswordValidation,
        confirmationPassword: handlePasswordValidation
            .oneOf([Yup.ref('password')], passwordMismatch)
    })

    return (
        <Paper style={{padding: '16px', margin: '8px'}}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
            >
                {(formikProps) => (
                    <Form style={{display: "flex", flexDirection: "column"}}>
                        {Object.values(schema).map(field => (
                            <FormikTextField formikProps={formikProps} {...field}/>
                        ))}
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Button variant={"contained"} color="secondary" type="reset">
                                Reset
                            </Button>
                            <Button variant={"contained"} color="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}