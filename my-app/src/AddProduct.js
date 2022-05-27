import React, {useCallback, useState} from 'react';
import './index.css'
import { useFormik } from "formik";
    import {
        Button,
        Checkbox,
        Form,
        FormLayout,
        TextField,
        RangeSlider,
        ContextualSaveBar,
        Frame,
        DisplayText,
        Page,
        Layout,
        Select
      } from "@shopify/polaris";
    
      import * as Yup from "yup";

      let SignupSchema = Yup.object().shape({
        title: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        description: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        vendor: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        urlImage: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required")
      });

function AddProduct(){
    const [valueInventory, setValueInventory] = useState('1');
    const handleChangeInventory = useCallback((newValue) => setValueInventory(newValue), []);

    const [selected, setSelected] = useState('Active');
    const handleSelectChange = useCallback(function (value){
        setDisabledSave(false)
        return setSelected(value)
        }, []);
    const options = [
        {label: 'Active', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
      ];
    

    const formik = useFormik({
        initialValues: {
          title: "",
          description: "",
          vendor: "",
          urlImage: "",
          inventory: valueInventory
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        }
    });
    const handleChange = (value, id) => {
        setDisabledSave(false)
        formik.setFieldValue(id, value);
    };
    const { values, errors, touched } = formik;
    const [disabledSave, setDisabledSave] = useState(true);
 

    return (
        <div style={{height: '250px'}}>
                <Frame
                    logo={{
                    width: 124,
                    contextualSaveBarSource:
                        'https://cdn.shopify.com/shopifycloud/web/assets/v1/1aaef98f90a64eeea0277cb2ed71e9210dd0f7ed8dc612b5ba3cbdfba98d684a.svg',
                    }}
                >
                <ContextualSaveBar
                    message="Unsaved changes"
                    saveAction={{
                        onAction: () => console.log('add form submit logic'),
                        loading: false,
                        disabled: true,
                    }}
                    discardAction={{
                        onAction: () => console.log('add clear form logic'),
                    }}
                />
               
                <Page fullWidth>
                <div className="row">
                    <Button title="Back"><i className="fa-solid fa-arrow-left-long"></i></Button>
                    <DisplayText size="small">Add product.</DisplayText>
                </div>
                  
                    <Form onSubmit={formik.handleSubmit}>
                        <FormLayout>
                        <div className="container-addproduct row">
                    <div className="addProduct-item col-7">
                            <TextField
                            value={values.title}
                            onChange={handleChange}
                            label="Title"
                            type="text"
                            id="title"
                            error={touched.title && errors.title}
                            />

                            <TextField
                            value={values.description}
                            onChange={handleChange}
                            label="Description"
                            type="text"
                            id="description"
                            multiline={4}
                            error={touched.description && errors.description}
                            />
                             <TextField
                            label="Inventory"
                            type="number"
                            id="inventory"
                            value={valueInventory}
                            onChange={handleChangeInventory}
                            autoComplete="off"
                            />
                           
                            <Button submit disabled={disabledSave}>Save</Button>
                            </div>
                            <div className="addProduct-item col-2">                     
                                <Select
                                    label="Product status"
                                    options={options}
                                    onChange={handleSelectChange}
                                    value={selected}
                                />
                                  <TextField
                                    value={values.vendor}
                                    onChange={handleChange}
                                    label="Vendor"
                                    type="text"
                                    id="vendor"
                                    error={touched.vendor && errors.vendor}
                                    />
                                    <TextField
                                    value={values.urlImage}
                                    onChange={handleChange}
                                    label="Url image"
                                    type="text"
                                    id="urlImage"
                                    error={touched.urlImage && errors.urlImage}
                                    />
                            </div>
                            </div>
                        </FormLayout>
                      
                    </Form>
                    
                    
                    
                </Page>
            </Frame>
        </div>
    )
}

export default AddProduct;
export {AddProduct};