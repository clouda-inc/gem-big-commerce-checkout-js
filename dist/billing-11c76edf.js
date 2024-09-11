"use strict";(self.webpackJsonpCheckout=self.webpackJsonpCheckout||[]).push([[876],{88870:(e,t,n)=>{n.d(t,{Z:()=>a});var s=n(97582),i=n(91074);function a(e,t){return!(!e||!t)&&((0,i.isEqual)(r(e),r(t))&&function(e,t){if(e.stateOrProvince&&e.stateOrProvince===t.stateOrProvince)return!0;if(e.stateOrProvinceCode&&e.stateOrProvinceCode===t.stateOrProvinceCode)return!0;return e.stateOrProvince===t.stateOrProvince&&e.stateOrProvinceCode===t.stateOrProvinceCode}(e,t))}function r(e){return(0,i.omit)((0,s.__assign)((0,s.__assign)({},e),{customFields:(e.customFields||[]).filter((function(e){return!!e.fieldValue}))}),["id","shouldSaveAddress","stateOrProvince","stateOrProvinceCode","type","email","country"])}},95593:(e,t,n)=>{n.d(t,{Z:()=>a});var s=n(97582),i=n(19945);function a(e){var t=e.customFields,n=(0,s.__rest)(e,["customFields"]),a=e.shouldSaveAddress;return(0,s.__assign)((0,s.__assign)({},n),{shouldSaveAddress:a,customFields:(0,i.Z)(t)})}},36115:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U});var s=n(97582),i=n(91074),a=n(67627),r=n(92574),l=n(19053),d=n(95593),o=n(88870),c=n(69638),u=n(55409),m=n(76741),g=n(74161),v=n(98119),p=n(76417),f=n(19686),h=n(56204),_=n(31478),b=n(33497),E=n(46964),y=n(96543),C=n(34323),N=n(17175),A=n(60452),Z=n(16206),S=n(78379),P=n(45855),O=n(77683);const k=(0,h.Z)((0,p.withFormik)({handleSubmit:function(e,t){(0,t.props.onSubmit)(e)},mapPropsToValues:function(e){var t=e.getFields,n=e.customerMessage,i=e.billingAddress;return(0,s.__assign)((0,s.__assign)({},(0,y.Z)(t(i&&i.countryCode),i)),{orderComment:n})},isInitialValid:function(e){var t=e.billingAddress,n=e.getFields,s=e.language;return!!t&&(0,C.Z)({language:s,formFields:n(t.countryCode)}).isValidSync(t)},validationSchema:function(e){var t=e.language,n=e.getFields;return"amazonpay"===e.methodId?(0,f.Vo)((function(e){return(0,N.Z)({translate:(0,C.w)(t),formFields:n(e&&e.countryCode)})})):(0,f.Vo)((function(e){return(0,C.Z)({language:t,formFields:n(e&&e.countryCode)})}))},enableReinitialize:!0})((function(e){var t,n,i,d,c,u,m,g,v,p=e.billingAddress,f=e.countries,h=e.isUpdating,y=e.methodId,C=e.updateAddress,N=e.onUnhandledError,k=e.selectedShippingAddress,F=(0,a.useState)(!1),I=F[0],w=F[1],U=(0,a.useRef)(null),x=(0,_.Z)(),B=x.isPayPalFastlaneEnabled,z=x.paypalFastlaneAddresses,L="amazonpay"===y,M=JSON.parse(localStorage.getItem("billingAddress")||"{}"),V=(0,a.useState)(!1),J=V[0],R=V[1],D=(0,a.useState)((0,s.__assign)((0,s.__assign)({},M),{countryCode:"US"})),K=D[0],W=D[1],q=[(0,s.__assign)({},k),(0,s.__assign)({},K)].filter((function(e){var t,n,s,i;return(0,b.Z)(e,[])&&!!e.firstName&&""!==e.firstName&&!!e.lastName&&""!==e.lastName&&((null===(t=null==e?void 0:e.address1)||void 0===t?void 0:t.length)||0)>0&&((null===(n=null==e?void 0:e.address2)||void 0===n?void 0:n.length)||0)>0&&((null===(s=null==e?void 0:e.city)||void 0===s?void 0:s.length)||0)>0&&((null===(i=null==e?void 0:e.postalCode)||void 0===i?void 0:i.length)||0)>0})),G=!((0,b.Z)(K,[])&&K.firstName&&""!==K.firstName&&K.lastName&&""!==K.lastName&&((null===(t=null==K?void 0:K.address1)||void 0===t?void 0:t.length)||0)>0&&((null===(n=null==K?void 0:K.address2)||void 0===n?void 0:n.length)||0)>0&&((null===(i=null==K?void 0:K.city)||void 0===i?void 0:i.length)||0)>0&&((null===(d=null==K?void 0:K.postalCode)||void 0===d?void 0:d.length)||0)>0),T=B?z:q,j=(null==T?void 0:T.length)>0;(0,a.useEffect)((function(){W((0,s.__assign)((0,s.__assign)({},M),{countryCode:"US",company:"",stateOrProvince:""}))}),[]);var H=function(e){return(0,s.__awaiter)(void 0,void 0,void 0,(function(){var t;return(0,s.__generator)(this,(function(n){switch(n.label){case 0:w(!0),n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,C(e)];case 2:return n.sent(),[3,5];case 3:return(t=n.sent())instanceof Error&&N(t),[3,5];case 4:return w(!1),[7];case 5:return[2]}}))}))};return a.createElement(Z.Z,{autoComplete:"on"},L&&p&&a.createElement("div",{className:"form-fieldset"},a.createElement(O.Z,{address:p})),!!G&&a.createElement("div",null,a.createElement("div",{onClick:function(){return R(!0)}},"Add new Address")),a.createElement(S.Z,{id:"checkoutBillingAddress",ref:U},j&&!L&&!J&&a.createElement(S.Z,{id:"billingAddresses"},a.createElement(P.Z,{isLoading:I},a.createElement("div",{className:"custom-billing-address-list"},q.map((function(e,t){return a.createElement("div",{className:"custom-billing-address-container",key:t,onClick:function(){return H(e)}},a.createElement("div",{className:"custom-billing-address"},a.createElement("input",{checked:(0,o.Z)(e,p),className:"billing-address-input",type:"radio"}),a.createElement("div",{className:"billing-address-container"},a.createElement(E.Z,{address:e}))),(0,o.Z)(e,k)&&a.createElement("div",{className:"billing-addres-same-shipping-label"},"same as shipping address"),(0,o.Z)(e,K)&&a.createElement("div",{className:"billing-addres-edit-label",onClick:function(){return R(!0)}},"edit"))}))))),J&&a.createElement(l.Z,{isLoading:I},a.createElement("div",null,a.createElement("div",{className:"temp-billing-address-container"},a.createElement("div",{className:"temp-billing-address-name-container"},a.createElement("div",{className:"temp-billing-address-firstname"},a.createElement("input",{className:"temp-billing-address-firstname-input",id:"firstName",name:"firstName",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{firstName:e.target.value}))},placeholder:"First Name",type:"text",value:K.firstName})),a.createElement("div",{className:"temp-billing-address-lastname"},a.createElement("input",{className:"temp-billing-address-lastname-input",id:"lastName",name:"lastName",onChange:function(e){W((0,s.__assign)((0,s.__assign)({},K),{lastName:e.target.value}))},placeholder:"Last Name",type:"text",value:K.lastName}))),a.createElement("div",{className:"temp-billing-address1-container"},a.createElement("input",{className:"temp-billing-address1-input",id:"address1",name:"address1",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{address1:e.target.value}))},placeholder:"Address",type:"text",value:K.address1})),a.createElement("div",{className:"temp-billing-address2-container"},a.createElement("input",{className:"temp-billing-address2-input",id:"address2",name:"address2",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{address2:e.target.value}))},placeholder:"Address",type:"text",value:K.address2})),a.createElement("div",{className:"temp-billing-address-country-container"},a.createElement("select",{className:"temp-billing-address-country-select",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{countryCode:e.target.value}))},value:K.countryCode||"US"},f.map((function(e){return a.createElement("option",{key:e.code,value:e.code},e.name)})))),a.createElement("div",{className:"temp-billing-address-state-city-container"},a.createElement("div",{className:"temp-billing-address-state"},(null===(m=null!==(u=null===(c=null==f?void 0:f.find((function(e){return e.code===K.countryCode})))||void 0===c?void 0:c.subdivisions)&&void 0!==u?u:[])||void 0===m?void 0:m.length)>0?a.createElement("div",{className:"temp-billing-address-state-container"},a.createElement("select",{className:"temp-billing-address-state-select",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{stateOrProvince:e.target.value}))},value:K.stateOrProvince},(null!==(v=null===(g=null==f?void 0:f.find((function(e){return e.code===K.countryCode})))||void 0===g?void 0:g.subdivisions)&&void 0!==v?v:[]).map((function(e){return a.createElement("option",{key:e.code,value:e.code},e.name)})))):a.createElement("div",{className:"temp-billing-address-state-container"},a.createElement("input",{className:"temp-billing-address-state-select",id:"stateOrProvince",name:"stateOrProvince",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{stateOrProvince:e.target.value}))},placeholder:"State Or Province",type:"text",value:K.stateOrProvince}))),a.createElement("div",{className:"temp-billing-address-city-container"},a.createElement("input",{className:"temp-billing-address-city-input",id:"city",name:"city",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{city:e.target.value}))},placeholder:"City",type:"text",value:K.city}))),a.createElement("div",{className:"temp-billing-address-postalcode-phone-container"},a.createElement("div",{className:"temp-billing-address-postalcode-container"},a.createElement("input",{className:"temp-billing-address-postalcode-input",id:"postalCode",name:"postalCode",onChange:function(e){return W((0,s.__assign)((0,s.__assign)({},K),{postalCode:e.target.value}))},placeholder:"Postal Code",type:"text",value:K.postalCode})),a.createElement("div",{className:"temp-billing-address-phone-container"},a.createElement("input",{className:"temp-billing-address-phone-input",id:"phone",name:"phone",onChange:function(e){W((0,s.__assign)((0,s.__assign)({},K),{phone:e.target.value}))},placeholder:"Phone",type:"text",value:K.phone}))),a.createElement("div",{className:"temp-billing-address-button-container"},a.createElement("button",{className:"temp-billing-address-cancel-button",onClick:function(){return R(!1)},type:"button"},"Cancel"),a.createElement("button",{className:"temp-billing-address-save-button",onClick:function(e){var t,n,i,a,r,l,d;e.preventDefault();var o=(0,s.__assign)((0,s.__assign)({},K),{country:null===(t=f.find((function(e){return e.code===K.countryCode})))||void 0===t?void 0:t.name,stateOrProvince:null!==(a=null===(i=null===(n=f.find((function(e){return e.code===K.countryCode})))||void 0===n?void 0:n.subdivisions.find((function(e){return e.code===K.stateOrProvince})))||void 0===i?void 0:i.name)&&void 0!==a?a:K.stateOrProvince,stateOrProvinceCode:null!==(d=null===(l=null===(r=f.find((function(e){return e.code===K.countryCode})))||void 0===r?void 0:r.subdivisions.find((function(e){return e.code===K.stateOrProvince})))||void 0===l?void 0:l.code)&&void 0!==d?d:K.stateOrProvinceCode});localStorage.setItem("billingAddress",JSON.stringify(o)),H((0,s.__assign)((0,s.__assign)({},K),{id:null==p?void 0:p.id})),R(!1)},type:"button"},"Save")))))),a.createElement("div",{className:"form-actions"},a.createElement(A.ZP,{disabled:h||I,id:"checkout-billing-continue",isLoading:h||I,type:"submit",variant:A.Wu.Primary},a.createElement(r.Z,{id:"common.continue_action"}))))})));var F=n(41957);function I(e){var t=(0,F.Z)(e);return t&&["amazonpay"].indexOf(t.providerId)>-1?t.providerId:void 0}var w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleSubmit=function(e){return(0,s.__awaiter)(t,void 0,void 0,(function(){var t,n,i,a,r,l,c,u,m,g,v=e.orderComment,p=(0,s.__rest)(e,["orderComment"]);return(0,s.__generator)(this,(function(e){switch(e.label){case 0:t=this.props,n=t.updateAddress,i=t.updateCheckout,a=t.customerMessage,r=t.billingAddress,l=t.navigateNextStep,c=t.onUnhandledError,u=[],(m=(0,d.Z)(p))&&!(0,o.Z)(m,r)&&u.push(n(m)),a!==v&&u.push(i({customerMessage:v})),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,Promise.all(u)];case 2:return e.sent(),l(),[3,4];case 3:return(g=e.sent())instanceof Error&&c(g),[3,4];case 4:return[2]}}))}))},t}return(0,s.__extends)(t,e),t.prototype.componentDidMount=function(){return(0,s.__awaiter)(this,void 0,void 0,(function(){var e,t,n,a,r,l;return(0,s.__generator)(this,(function(s){switch(s.label){case 0:e=this.props,t=e.initialize,n=e.onReady,a=void 0===n?i.noop:n,r=e.onUnhandledError,s.label=1;case 1:return s.trys.push([1,3,,4]),[4,t()];case 2:return s.sent(),a(),[3,4];case 3:return(l=s.sent())instanceof Error&&r(l),[3,4];case 4:return[2]}}))}))},t.prototype.render=function(){var e=this.props,t=e.updateAddress,n=e.isInitializing,i=e.selectedShippingAddress,d=(0,s.__rest)(e,["updateAddress","isInitializing","selectedShippingAddress"]);return console.log("selectedShippingAddress : ",i),console.log("[this.props] billingAddress : ",this.props.billingAddress),a.createElement(l.Z,{isLoading:n},a.createElement("div",{className:"checkout-form"},a.createElement("div",{className:"form-legend-container"},a.createElement(v.Z,{testId:"billing-address-heading"},a.createElement(r.Z,{id:"billing.billing_address_heading"}))),a.createElement(k,(0,s.__assign)({},d,{onSubmit:this.handleSubmit,selectedShippingAddress:i,updateAddress:t}))))},t}(a.Component);const U=(0,c.Z)((function(e){var t=e.checkoutService,n=e.checkoutState,s=n.data,i=s.getCheckout,a=s.getConfig,r=s.getCart,l=s.getCustomer,d=s.getBillingAddress,o=s.getBillingAddressFields,c=s.getBillingCountries,v=s.getShippingAddress,p=n.statuses,f=p.isLoadingBillingCountries,h=p.isUpdatingBillingAddress,_=p.isUpdatingCheckout,b=a(),E=l(),y=i(),C=r();if(!(b&&E&&y&&C))return null;var N=b.checkoutSettings,A=N.enableOrderComments,Z=N.googleMapsApiKey;return{billingAddress:d(),countries:c()||u.L,countriesWithAutocomplete:["US","CA","AU","NZ","GB"],customer:E,customerMessage:y.customerMessage,getFields:o,googleMapsApiKey:Z,initialize:t.loadBillingAddressFields,isInitializing:f(),isUpdating:h()||_(),methodId:I(y),shouldShowOrderComments:A&&(0,g.Z)(C)<1,updateAddress:t.updateBillingAddress,updateCheckout:t.updateCheckout,isFloatingLabelEnabled:(0,m.Z)(b.checkoutSettings),selectedShippingAddress:v()||{}}}))(w)},41957:(e,t,n)=>{n.d(t,{Z:()=>a});var s=n(10631),i=n(56851);function a(e){return(e&&e.payments?e.payments:[]).find((function(e){return!(0,s.Z)(e)&&!(0,i.Z)(e)&&!!e.providerId}))}},74161:(e,t,n)=>{n.d(t,{Z:()=>i});var s=n(92304);function i(e){return(0,s.Z)(e.lineItems.physicalItems.filter((function(e){return!e.addedByPromotion})))}}}]);
//# sourceMappingURL=billing-11c76edf.js.map