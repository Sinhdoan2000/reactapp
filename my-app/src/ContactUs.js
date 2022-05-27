import React, { useCallback, useState } from 'react';


import {
    Button,
    Checkbox,
    Form,
    FormLayout,
    TextField,
    RangeSlider,
    Page
  } from "@shopify/polaris";
  import { useFormik } from "formik";
  import * as Yup from "yup";


  let SignupSchema = Yup.object().shape({
    Subject: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    message: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
  });

function ContactUs(){

    const formik = useFormik({
        initialValues: {
          Subject: "",
          message: "",
          email: ""
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        }
      });
      const handleChange = (value, id) => {
        formik.setFieldValue(id, value);
      };
      const { values, errors, touched } = formik;
      console.log("touched.email", touched);

    return (
        <div>
           <Page title="Contact Us">
              <Form onSubmit={formik.handleSubmit}>
                  <FormLayout>
                      <TextField
                      value={values.email}
                      onChange={handleChange}
                      label="Your email"
                      type="email"
                      autoComplete="email"
                      id="email"
                      error={touched.email && errors.email}
                      />
                      <TextField
                      value={values.Subject}
                      onChange={handleChange}
                      label="Subject"
                      type="text"
                      id="Subject"
                      error={touched.Subject && errors.Subject}
                      />
                      <TextField
                      value={values.message}
                      onChange={handleChange}
                      label="Message"
                      type="text"
                      id="message"
                      multiline={4}
                      error={touched.message && errors.message}
                      />
                      <Button submit>Submit</Button>
                  </FormLayout>
              </Form>
            </Page>
        </div>
    )
}

export default ContactUs;