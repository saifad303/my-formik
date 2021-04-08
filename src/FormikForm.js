import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { object, string, array } from "yup";

function FormikForm() {
  const emptyObject = { phoneObject: "" };
  const initialValues = {
    name: "",
    description: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumber: ["", ""],
    phNumbers: [emptyObject],
  };

  let validationSchema = object({
    name: string().required("Required"),
    description: string().required("Required"),
    address: string().required("Required"),
  });

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };
  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        // validateOnChange={false}
        // validateOnBlur={false}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Product Name</label>
            <Field
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="name"
            />
            <ErrorMessage name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Category</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>Dairy</option>
              <option>Sweets</option>
              <option>Fruits</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Tags</label>
            <select
              multiple
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option>Sweet Friuits</option>
              <option>Saour</option>
              <option>Dairy</option>
              <option>Milk</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <Field
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              as="textarea"
              name="description"
            ></Field>
            <ErrorMessage name="description" />
          </div>
          <div className="form-group">
            <label htmlFor="">Address</label>
            <Field name="address">
              {(props) => {
                // console.log(props);
                let { form, field, meta } = props;
                // console.log(meta);
                return (
                  <div>
                    <input type="text" className="form-control" {...field} />
                  </div>
                );
              }}
            </Field>
          </div>
          <div className="form-group">
            <label htmlFor="">facebook</label>
            <Field
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="social.facebook"
            ></Field>
          </div>
          <div className="form-group">
            <label htmlFor="">Twitter</label>
            <Field
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="social.twitter"
            ></Field>
          </div>
          <div className="form-group">
            <label htmlFor="">Phone Number 1</label>
            <Field
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="phoneNumber[0]"
            ></Field>
          </div>
          <div className="form-group">
            <label htmlFor="">Phone Number 2</label>
            <Field
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="phoneNumber[1]"
            ></Field>
          </div>
          <div className="form-group">
            <label htmlFor="">Ph numbers: </label>
            <FieldArray name="phNumbers">
              {(fieldArrayProps) => {
                // console.log(fieldArrayProps);
                let { push, remove, form } = fieldArrayProps;
                let { values } = form;
                let { phNumbers } = values;

                return (
                  <div>
                    {phNumbers.map((phNumber, index) => {
                      return (
                        <div key={index}>
                          <Field
                            name={`phNumbers[${index}].phoneObject`}
                            className="form-control"
                          />
                          <button
                            onClick={() => push(emptyObject)}
                            type="button"
                          >
                            +
                          </button>
                          <button onClick={() => remove(index)} type="button">
                            -
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
            <ErrorMessage name="phNumbers" />
          </div>
          <div className="form-group">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default FormikForm;
