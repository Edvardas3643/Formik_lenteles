import {Form, Formik} from "formik";
import React from "react";
import {Button, Paper} from "@material-ui/core";
import {FormikDocumentSelect} from "./FormikInputs/FormikSelectInput";
import * as Yup from "yup";
import {FormikDateInput} from "./FormikInputs/FormikDateField";
import moment from "moment";

export const AdvancedForm: React.FC = () => {

    const maxValidFrom = 'pradžios data negali buti vėlesne negu gimimo data'
    const minAge = 'Nuo data negali buti anksčiau negu 18 gimtadienis'

    const initialValues = {
        birthday: '',
        documentType: '',
        validFrom: '',
        validTo: '',
    }

    const advancedValidationSchema = Yup.object().shape({
        birthday: Yup.date().required(),
        documentType: Yup.string().required(),
        validFrom: Yup.date().when(['birthday', 'documentType'], {
            is: (birthday: Date, documentType: string) => (
                birthday && documentType === 'Gimimo sertifikatas'
            ),
            then: Yup.date()
                .max(Yup.ref('birthdate'), maxValidFrom),
            otherwise: Yup.date().when(['validFrom', 'birthday', 'documentType'], {
                is: (validFrom: Date, birthday: Date, documentType: string) => (
                    validFrom && birthday && documentType === 'Pasas'
                ),
                then: Yup.date().test({
                    name: 'validFromDate',
                    message: minAge,
                    test: (validFrom, {parent: {birthday}}) => {
                        return moment(validFrom) >= moment(birthday).add(18, 'year')
                    }
                }),
                otherwise: Yup.date().required()
            }),
        }),
        validTo: Yup.date().required(),
    }, [['birthday', 'validFrom'], ['birthday', 'documentType'], ['validFrom', 'documentType']])

    return (
        <Paper style={{padding: '16px', margin: '8px'}}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => console.log(values)}
                validationSchema={advancedValidationSchema}
            >
                {(formikProps) => (
                    <Form style={{display: "flex", flexDirection: "column", alignContent: "space-between"}}>
                        <FormikDateInput
                            label="Gimimo data"
                            field="birthday"
                            formikProps={formikProps}
                        />
                        <FormikDocumentSelect
                            field="documentType"
                            formikProps={formikProps}
                        />
                        <FormikDateInput
                            label="Galioja Nuo"
                            field="validFrom"
                            formikProps={formikProps}
                        />
                        <FormikDateInput
                            label="Galioja Iki"
                            field="validTo"
                            formikProps={formikProps}
                        />
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Button variant={"contained"} color="secondary" onClick={() => formikProps.resetForm()}>
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