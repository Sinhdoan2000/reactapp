import React, {useCallback, useState, useEffect, useRef} from 'react'
import {EmptySearchResult, TextContainer, Caption, Stack, Link, DropZone, ResourceList, Avatar, ResourceItem, ButtonGroup, Layout, EmptyStateMarkup, Modal, DisplayText, Form, FormLayout, Select, useIndexResourceState, IndexTable,TextStyle,  Badge, FooterHelp, Thumbnail, TextField, ContextualSaveBar, Frame, Page, Toast, InlineError, Button, Heading, Card, DataTable, Checkbox, ChoiceList, Filters, Tabs} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';
import './index.css';
import * as Yup from "yup";
import { useFormik } from "formik";


function Products(){
  /*-----------------Begin filters and table-------------- */
  const products = [
    {
      id: '0',
      url: 'products/0',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" size="small"  alt="Black choker necklace" />,
      product: 'Mae Jemison',
      status: <Badge status="success">Active</Badge>,
      Inventory: <TextStyle variation="negative">0 in stock</TextStyle>,
      type: '',
      vendor: 'globo-doan-sinh-dev',
    },
    {
      id: '1',
      url: 'products/1',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" size="small"  alt="Black choker necklace" />,
      product: 'Ellen Ochoa',
      status: <Badge status="info">Draft</Badge>,
      Inventory: <TextStyle>30 in stock</TextStyle>,
      type: '',
      vendor: 'globo-doan-sinh-dev',
    },
  ];
  const resourceName = {
    singular: 'product',
    plural: 'products',
  };
  const [DataTable, setDataTable] = useState(products);
  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(DataTable);
    
  const [taggedWith, setTaggedWith] = useState('');
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState('today');
  const [loadingTable, setLoadingTable] = useState(false);
  const handleFiltersQueryChange = useCallback(
    function(value){
      renderFilterSearch(value);
   
      return setQueryValue(value)
    } ,[]);
  function renderFilterSearch(value){
    setLoadingTable(true)
    setTimeout(function(){
      setLoadingTable(false)
    }, 400)
    const newFilterData = DataTable.filter(function(item){
      return item.product.toUpperCase().indexOf(value.toUpperCase()) != -1;
    })
    setDataTable(newFilterData)
  }
  
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(function(){
    setQueryValue("");
    setDataTable(DataTable)
    
  }, []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);
  
  const filters = [
    {
      key: '',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: '',
          label: disambiguateLabel('taggedWith', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];
  
  const sortOptions = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];
  const emptyStateMarkup = (
    <EmptySearchResult
      title={'No customers yet'}
      description={'Try changing the filters or search term'}
      withIllustration
    />
  );
  /*-----------------End filters and table---------------- */
 /*-----------------Begin Polaris Tabs--------------------- */
 const [selected, setSelected] = useState(0);
 const tabs = [
  {
    id: 'All',
    content: 'All',
    accessibilityLabel: 'All customers',
    panelID: 'All',
  },
  {
    id: 'Active',
    content: 'Active',
    panelID: 'Active',
  },
  {
    id: 'Draft',
    content: 'Draft',
    panelID: 'Draft',
  },
  {
    id: 'Archived',
    content: 'Archived',
    panelID: 'Archived',
  },
];

  //handle change tabs & filter data table render front end
 const handleTabChange = useCallback(
   function(selectedTabIndex){
     var timeRenderFilter = 400;
          setLoadingTable(true)
          setTimeout(function(){
            setLoadingTable(false)
          }, timeRenderFilter)
          setTimeout(function(){
              if(tabs[selectedTabIndex].id == 'Active'){
                  const activeData = DataTable.filter(function(data){
                    return data.status.props.children === 'Active';
                  })
                  setDataTable(activeData);
              }else if(tabs[selectedTabIndex].id == 'Draft'){
                  const draftData = DataTable.filter(function(data){
                    return data.status.props.children === 'Draft';
                  })
                  setDataTable(draftData);
              }else if(tabs[selectedTabIndex].id == 'All'){
                  setDataTable(DataTable);
              }else if(tabs[selectedTabIndex].id == 'Archived'){
                  setDataTable([]);
              }
          }, timeRenderFilter + 50)
   return setSelected(selectedTabIndex)
   },
   [],
 );

 /*-----------------End Polaris Tabs--------------------- */
  /*-----------------Begin modal-------------------------- */
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(function(){
    formik.handleSubmit();
  }, []);
  const cancelModal = useCallback(function(){
    setActive(false)
  },[]);
  const openModal = useCallback(function(){
    setActive(true);
  },[]);
  const activator = <Button onClick={openModal} primary>Add product</Button>;
  /*-----------------End modal---------------------------- */

  /*----------------Validate form modal------------------- */
  
  
  const rowMarkup = DataTable.map(
    ({id, media, product, status, Inventory, type, vendor}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        media ={media}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{media}</IndexTable.Cell>
        <IndexTable.Cell>
          <TextStyle variation="strong">{product}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{Inventory}</IndexTable.Cell>
        <IndexTable.Cell>{type}</IndexTable.Cell>
        <IndexTable.Cell>{vendor}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  
  let SignupSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
    type: Yup.string()
      .required("Required"),
    vendor: Yup.string()
      .required("Required")
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "",
      vendor: "",
      status: "Active",
      media: "",
      inventory: ""
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const data = JSON.stringify(values);
      const parseData = JSON.parse(data);
      
      if(DataTable.length > 0){
        var newIndex = Number(DataTable[DataTable.length - 1].id) + 1;
      }else{
        newIndex = 0;
      }
      if(parseData){
        if(!parseData.media){
          var noMedia = <i className="fa-solid fa-image imageTableIcon"></i>;
        }
        const fileImage = files.length > 0 && (
          <Stack vertical>
            {files.map((file, index) => (
              <Stack alignment="center" key={index}>
                <Thumbnail
                  size="small"
                  alt={file.name}
                  source={
                    validImageTypes.includes(file.type)
                      ? window.URL.createObjectURL(file)
                      : NoteMinor
                  }
                />
              </Stack>
            ))}
          </Stack>
        );
        const newMedia = fileImage ? fileImage : noMedia;
        const inventoryData = Number(valueInventory) > 0 ? valueInventory + " in stock" : <TextStyle variation="negative">{valueInventory} in stock</TextStyle>;
        const statusData = selectedStatus == 'Active' ? <Badge status="success">{selectedStatus}</Badge> : <Badge status="info">{selectedStatus}</Badge>;
       
        //new data
        const currentCustomers = {
          id: newIndex.toString(),
          url: "customers/" + newIndex,
          media: newMedia,
          product: parseData.title,
          status: statusData,
          Inventory: inventoryData,
          type: parseData.type,
          vendor: parseData.vendor
        }
        DataTable.push(currentCustomers)
        setDataTable(DataTable)
        setActive(false)
      }
    }
  });

  const handleChange = (value, id) => {
    formik.setFieldValue(id, value);
  };
  const { values, errors, touched } = formik;
  /*----------------End validate form modal--------------- */

  /*----------------Begin upload file modal--------------- */
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
  );

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  /*----------------End upload file modal----------------- */
  /*----------------Begin status modal-------------------- */
  const [selectedStatus, setSelectedStatus] = useState('Active');

  const handleSelectChangeStatus = useCallback((value) => setSelectedStatus(value), []);

  const optionsStatus = [
    {label: 'Active', value: 'Active'},
    {label: 'Draft', value: 'Draft'},
  ];
  /*----------------End status modal---------------------- */

  /*----------------Begin inventory modal---------------- */
  const [valueInventory, setValueInventory] = useState('1');

  const handleChangeInventory = useCallback((newValue) => setValueInventory(newValue), []);
  /*---------------End inventory modal------------------ */
  /*---------------Modal delete------------------------ */
  const [activeDelete, setActiveDelete] = useState(false);

  const buttonRef = useRef(null);

  const handleOpen = useCallback(() => setActiveDelete(true), []);

  const handleClose = useCallback(() => {
    setActiveDelete(false);
  }, []);

  //Handle delete table when click button 
  const handleDeleteModal = function(ids){
    const dataDelete = DataTable.filter(function(item){
      return !ids.includes(item.id)
    }) 
    if(dataDelete == []){
      setDataTable([]);
    }else{
      setDataTable(dataDelete);
    }
    setTimeout(function(){
      setActiveDelete(false);
    }, 300)
  };
  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: handleOpen,
    },
  ];
  const titleDelete = "Remove " + selectedResources.length + " products";
  const modalDelete = (
    <div style={{height: '500px'}}>
      <Modal
        activator={buttonRef}
        open={activeDelete}
        onClose={handleClose}
        title= {titleDelete}
        primaryAction={{
          content: 'Delete',
          destructive: "true",
          onAction: ()=> handleDeleteModal(selectedResources),
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              This can't be undone.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  )
  /*-----------------Return export Component-------------- */
    return (   
    <Page
      title="Products"
      secondaryActions={
        <ButtonGroup>
          <p>Export</p>
          <p>Import</p>
          {activator}
        </ButtonGroup>
      }
    > 
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
              <Card>
                <div style={{padding: '16px', display: 'flex'}}>
                  <div style={{flex: 1}}>
                    <Filters
                      queryValue={queryValue}
                      filters={filters}
                      appliedFilters={appliedFilters}
                      onQueryChange={handleFiltersQueryChange}
                      onQueryClear={handleQueryValueRemove}
                      onClearAll={handleClearAll}
                     
                    />
                  </div>
                  <div style={{paddingLeft: '0.25rem'}}>
                    <Select
                      labelInline
                      label="Sort by"
                      options={sortOptions}
                      value={sortValue}
                      onChange={handleSortChange}
                    />
                  </div>
                </div>
                    <IndexTable
                     loading = {loadingTable}
                      resourceName={resourceName}
                      itemCount={DataTable.length}
                      selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                      }
                      emptyState={emptyStateMarkup}
                      onSelectionChange={handleSelectionChange}
                      hasMoreItems
                      bulkActions={bulkActions}
                      promotedBulkActions={promotedBulkActions}
                      lastColumnSticky
                      headings={[
                        {title: 'Avatar', hidden: true},
                        {title: 'Product'},
                        {title: 'Status'},
                        {title: 'Inventory'},
                        {title: 'Type', hidden: false},
                        {title: 'Vendor', hidden: false},
                      ]}
                    >
                      {rowMarkup}
                    </IndexTable>
              </Card>
          </Card.Section>
        </Tabs>       
      </Card>
      <FooterHelp>
        Learn more about{' '}
        <Link url="https://help.shopify.com/en/manual/products?st_source=admin&st_campaign=products_footer&utm_source=admin&utm_campaign=products_footer">
        products
        </Link>
      </FooterHelp>
      {/*Modal add product*/}
        <div style={{minHeight: '500px'}}>        
          <Modal
            large
            open={active}
            onClose={cancelModal}
            title="Add product"
            primaryAction={{
              content: 'Save',
              onAction: toggleActive,
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: cancelModal,
              },
            ]}
          >
            <Modal.Section>
              <Layout>
                <Layout.Section>
                  <Card sectioned>
                    {/*Form left */}
                    <Form onSubmit={formik.handleSubmit}>
                      <FormLayout>                         
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
                          abel="Description"
                          type="text"
                          multiline={4}
                          id="description"
                          error={touched.description && errors.description}
                        />
                        <DropZone onDrop={handleDropZoneDrop} variableHeight  label="Media">
                          {uploadedFiles}
                          {fileUpload}
                        </DropZone>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={valueInventory}
                          onChange={handleChangeInventory}
                          autoComplete="off"
                        /> 
                      </FormLayout>
                    </Form>                           
                  </Card>
                </Layout.Section>
                    <Layout.Section secondary>
                        {/*Form right */}
                      <Card sectioned>
                        <Form onSubmit={formik.handleSubmit}>
                          <FormLayout> 
                            <Select
                              label="Product status"
                              options={optionsStatus}
                              onChange={handleSelectChangeStatus}
                              value={selectedStatus}
                            />
                            <TextField
                              value={values.type}
                              onChange={handleChange}
                              label="Type"
                              type="text"
                              id="type"
                              error={touched.type && errors.type}
                            />
                            <TextField
                              value={values.vendor}
                              onChange={handleChange}
                              label="Vendor"
                              type="text"
                              id="vendor"
                              error={touched.vendor && errors.vendor}
                            />
                          </FormLayout>
                        </Form>
                      </Card>
                    </Layout.Section>
              </Layout>     
            </Modal.Section>
          </Modal>
          {modalDelete}
        </div>
    </Page>
    )
}

function disambiguateLabel(key, value) {
  switch (key) {
    case 'taggedWith':
      return `Tagged with ${value}`;
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
export default Products;