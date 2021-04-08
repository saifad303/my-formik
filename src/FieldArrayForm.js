import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { object, string, array, number } from "yup";

function FieldArrayForm() {
  const initVal = { phone: "" };
  const initialValue = {
    phoneNumber: [initVal],
  };
  const validationSchema = object({
    phoneNumber: array(
      object({
        phone: number().required("Phone number neede."),
      }).test((phone) => {
        console.log("PHONE = ", phone);
        return true;
      })
    ),
  });

  function onSubmit(values, submitProps) {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  }
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="">Phone number</label>
            <FieldArray name="phoneNumber">
              {({ form, remove, push }) => {
                let { values } = form;
                let { phoneNumber } = values;
                return (
                  <div>
                    {phoneNumber.map((num, index) => {
                      return (
                        <div key={index}>
                          <Field
                            name={`phoneNumber[${index}].phone`}
                            className="form-control"
                          />
                          <ErrorMessage name={`phoneNumber[${index}].phone`} />
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => push(initVal)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => remove(index)}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default FieldArrayForm;
