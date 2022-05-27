import React, {useCallback, useRef, useState, useRouteMatch, useParams, useHref} from 'react';
import {AppProvider, ActionList, Avatar, Card, ContextualSaveBar, FormLayout, Frame, Layout, Loading, Modal, Navigation, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer, TextField, Toast, TopBar, Button, Form} from '@shopify/polaris';
import {ProductsMajor, CirclePlusMinor, StoreMinor, CustomersMajor, AnalyticsMinor, MarketingMinor, DiscountsMinor, AppsMajor, ArrowLeftMinor, ConversationMinor, HomeMajor, OrdersMajor, CalendarMinor, BlogMajor} from '@shopify/polaris-icons';
import './Container.css';
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import ContactUs from './ContactUs'
import Products from './Products';
import AddProduct from './AddProduct'
function Container(){

   
  const defaultState = useRef({
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: '',
  });
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue,
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue,
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );
  
 
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;

    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue('');
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  );
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    [],
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Đoàn Xuân Sinh"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
   const [selectHome, setSelectHome] = useState(true);
   const [selectOrders, setSelectOrders] = useState(false);
   const [selectProducts, setSectProducts] = useState(false);
   const [selectCustomers, setSelectCustomers] = useState(false);
   const [selectAnalytics, setSelectAnalytics] = useState(false);
   const [selectMarketing, setSelectMarketing] = useState(false);
   const [selectDiscounts, setSelectDiscounts] = useState(false);
   const [selectApps, setSelectApps] = useState(false);
   const [selectOnlineStore, setSelectOnlineStore] = useState(false);
   const [selectContact, setSelectContact] = useState(false);

 function homeClick(){
    setSelectHome(true);
    setSelectOrders(false);
    setSectProducts(false);
    setSelectCustomers(false);
    setSelectAnalytics(false);
    setSelectMarketing(false);
    setSelectDiscounts(false);
    setSelectApps(false);
    setSelectOnlineStore(false);
    setSelectContact(false);
 }
 function ordersClick(){
  setSelectHome(false);
  setSelectOrders(true);
  setSectProducts(false);
  setSelectCustomers(false);
  setSelectAnalytics(false);
  setSelectMarketing(false);
  setSelectDiscounts(false);
  setSelectApps(false);
  setSelectOnlineStore(false);
  setSelectContact(false);
}
function productsClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(true);
  setSelectCustomers(false);
  setSelectAnalytics(false);
  setSelectMarketing(false);
  setSelectDiscounts(false);
  setSelectApps(false);
  setSelectOnlineStore(false);
  setSelectContact(false);
}
function customersClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(false);
  setSelectCustomers(true);
  setSelectAnalytics(false);
  setSelectMarketing(false);
  setSelectDiscounts(false);
  setSelectApps(false);
  setSelectOnlineStore(false);
  setSelectContact(false);
}
function analyticsClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(false);
  setSelectCustomers(false);
  setSelectAnalytics(true);
  setSelectMarketing(false);
  setSelectDiscounts(false);
  setSelectApps(false);
  setSelectOnlineStore(false);
  setSelectContact(false);
}
function marketingClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(false);
  setSelectCustomers(false);
  setSelectAnalytics(false);
  setSelectMarketing(true);
  setSelectDiscounts(false);
  setSelectApps(false);
  setSelectOnlineStore(false);
  setSelectContact(false);
}
function discountClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(false);
  setSelectCustomers(false);
  setSelectAnalytics(false);
  setSelectMarketing(false);
  setSelectDiscounts(true);
  setSelectApps(false);
  setSelectOnlineStore(false);
  setSelectContact(false);
}
function appClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(false);
  setSelectCustomers(false);
  setSelectAnalytics(false);
  setSelectMarketing(false);
  setSelectDiscounts(false);
  setSelectApps(true);
  setSelectOnlineStore(false);
  setSelectContact(false);
}
function OnlineStoreClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(false);
  setSelectCustomers(false);
  setSelectAnalytics(false);
  setSelectMarketing(false);
  setSelectDiscounts(false);
  setSelectApps(false);
  setSelectOnlineStore(true);
  setSelectContact(false);
}
function ContactClick(){
  setSelectHome(false);
  setSelectOrders(false);
  setSectProducts(false);
  setSelectCustomers(false);
  setSelectAnalytics(false);
  setSelectMarketing(false);
  setSelectDiscounts(false);
  setSelectApps(false);
  setSelectOnlineStore(false);
  setSelectContact(true);
}
  const navigationMarkup = (
        <BrowserRouter>
            <Navigation location="/">
                <Link to="/">
                        <Navigation.Section 
                          items={[
                            {
                              label: 'Home',
                              icon: HomeMajor,
                              selected: selectHome,
                              onClick: homeClick,
                            },
                          ]}
                          action={{
                            icon: ConversationMinor,
                            accessibilityLabel: 'Contact support',
                            onClick: toggleModalActive,
                          }}
                        />
                </Link>
                <Link to="/Orders">
                    <Navigation.Section 
                          items={[
                            {
                              label: 'Orders',
                              icon: OrdersMajor,
                              selected: selectOrders,
                              onClick: ordersClick,
                            },
                          ]}
                          action={{
                            icon: ConversationMinor,
                            accessibilityLabel: 'Contact support',
                            onClick: toggleModalActive,
                          }}
                        />
                </Link>
                <Link to="/Products">
                    <Navigation.Section 
                    duplicateRootItem
                          items={[
                            {
                              label: 'Products',
                              icon: ProductsMajor,
                              selected: selectProducts,
                              subNavigationItems: [
                                {
                                  url: '/admin/products/collections',
                                  disabled: false,
                                  selected: false,
                                  label: 'Collections',
                                },
                                {
                                  url: '/admin/products/inventory',
                                  disabled: false,
                                  label: 'Inventory',
                                },
                              ],
                              onClick: productsClick,
                            },
                          ]}
                          action={{
                            icon: ConversationMinor,
                            accessibilityLabel: 'Contact support',
                            onClick: toggleModalActive,
                          }}
                        />
                </Link>
                <Link to="/Customers">
                    <Navigation.Section 
                      items={[
                        {
                          label: 'Customers',
                          icon: CustomersMajor,
                          selected: selectCustomers,
                          onClick: customersClick,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                      }}
                    />
                </Link>
                <Link to="/Analytics">
                    <Navigation.Section 
                      items={[
                        {
                          label: 'Analytics',
                          icon: AnalyticsMinor,
                          selected: selectAnalytics,
                          onClick: analyticsClick,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                      }}
                    />
                </Link>
                <Link to="/Marketing">
                    <Navigation.Section 
                      items={[
                        {
                          label: 'Marketing',
                          icon: MarketingMinor,
                          selected: selectMarketing,
                          onClick: marketingClick,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                      }}
                    />
                </Link>
                <Link to="/Discounts">
                    <Navigation.Section 
                      items={[
                        {
                          label: 'Discounts',
                          icon: DiscountsMinor,
                          selected: selectDiscounts,
                          onClick: discountClick,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                      }}
                    />
                </Link>
                <Link to="/Apps">
                    <Navigation.Section 
                      items={[
                        {
                          label: 'Apps',
                          icon: AppsMajor,
                          selected: selectApps,
                          onClick: appClick,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                      }}
                    />
                </Link>
                <Navigation.Section 
                      items={[
                        {
                          label: 'Sales channels',
                          icon: CirclePlusMinor,
                          selected: false,
                          onClick: toggleIsLoading,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: OnlineStoreClick,
                      }}
                    />
                <Link to="/OnlineStore">
                    <Navigation.Section 
                      items={[
                        {
                          label: 'Online Store',
                          icon: StoreMinor,
                          selected: selectOnlineStore,
                          onClick: toggleIsLoading,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                      }}
                    />
                </Link>
                <Link to="/ContactUs">
                    <Navigation.Section 
                      items={[
                        {
                          label: 'Contact us',
                          icon: BlogMajor,
                          selected: selectContact,
                          onClick: ContactClick,
                        },
                      ]}
                      action={{
                        icon: ConversationMinor,
                        accessibilityLabel: 'Contact support',
                        onClick: toggleModalActive,
                      }}
                    />
                </Link>
            </Navigation>

              <Routes>
                <Route path="/AddProduct/*" element={<AddProduct />} />
                <Route path="/" element={<Dashbroad />} />
                <Route path="/Calendar/*" element={<Calendar />} />
                <Route path="/ContactUs/*" element={<ContactUs />} />
                <Route path="/Products/*" element={<Products />} />
              
              </Routes>
        </BrowserRouter>  
  );
  function Dashbroad(){
    return <div>Dashbroad</div>
  }
  function Calendar(){
    return <div>Calendar</div>
  }
  
  const loadingMarkup = isLoading ? <Loading /> : null;


  const logo = {
    width: 55,
    topBarSource:
      'https://y6j2i5b7.stackpathcdn.com/images/logo.png',
    contextualSaveBarSource:
      'https://y6j2i5b7.stackpathcdn.com/images/logo.png',
    url: 'http://jadedpixel.com',
    accessibilityLabel: 'Tipo booking',
  };
  

    return (
        <div className="appContainer">
            <AppProvider
              i18n={{
                Polaris: {
                  Avatar: {
                    label: 'Avatar',
                    labelWithInitials: 'Avatar with initials {initials}',
                  },
                  ContextualSaveBar: {
                    save: 'Save',
                    discard: 'Discard',
                  },
                  TextField: {
                    characterCount: '{count} characters',
                  },
                  TopBar: {
                    toggleMenuLabel: 'Toggle menu',

                    SearchField: {
                      clearButtonLabel: 'Clear',
                      search: 'Search',
                    },
                  },
                  Modal: {
                    iFrameTitle: 'body markup',
                  },
                  Frame: {
                    skipToContent: 'Skip to content',
                    navigationLabel: 'Navigation',
                    Navigation: {
                      closeMobileNavigationLabel: 'Close navigation',
                    },
                  },
                },
              }}
            >
            <Frame
              logo={logo}
              topBar={topBarMarkup}
              navigation={navigationMarkup}
              showMobileNavigation={mobileNavigationActive}
              onNavigationDismiss={toggleMobileNavigationActive}
              skipToContentTarget={skipToContentRef.current}
            >
              {contextualSaveBarMarkup}
              {loadingMarkup}
              
              {toastMarkup}
            
            </Frame>
      </AppProvider>
        </div>
    )
}


export default Container;