"use strict";(self.webpackJsonpCheckout=self.webpackJsonpCheckout||[]).push([[876],{88870:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(97582),a=n(91074);function s(e,t){return!(!e||!t)&&((0,a.isEqual)(r(e),r(t))&&function(e,t){if(e.stateOrProvince&&e.stateOrProvince===t.stateOrProvince)return!0;if(e.stateOrProvinceCode&&e.stateOrProvinceCode===t.stateOrProvinceCode)return!0;return e.stateOrProvince===t.stateOrProvince&&e.stateOrProvinceCode===t.stateOrProvinceCode}(e,t))}function r(e){return(0,a.omit)((0,i.__assign)((0,i.__assign)({},e),{customFields:(e.customFields||[]).filter((function(e){return!!e.fieldValue}))}),["id","shouldSaveAddress","stateOrProvince","stateOrProvinceCode","type","email","country"])}},95593:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(97582),a=n(19945);function s(e){var t=e.customFields,n=(0,i.__rest)(e,["customFields"]),s=e.shouldSaveAddress;return(0,i.__assign)((0,i.__assign)({},n),{shouldSaveAddress:s,customFields:(0,a.Z)(t)})}},36115:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var i=n(97582),a=n(91074),s=n(67627),r=n(92574),l=n(19053),d=n(95593),o=n(88870),c=n(69638),u=n(55409),m=n(76741),g=n(74161),v=n(98119),p=n(76417),f=n(19686),_=n(56204),h=n(31478),b=n(33497),C=n(46964),E=n(96543),y=n(34323),N=n(82100),A=n(17175),P=n(60452),O=n(16206),S=n(78379),Z=n(45855),k=n(58643);const U=(0,_.Z)((0,p.withFormik)({handleSubmit:function(e,t){(0,t.props.onSubmit)(e)},mapPropsToValues:function(e){var t=e.getFields,n=e.customerMessage,a=e.billingAddress;return(0,i.__assign)((0,i.__assign)({},(0,E.Z)(t(a&&a.countryCode),a)),{orderComment:n})},isInitialValid:function(e){var t=e.billingAddress,n=e.getFields,i=e.language;return!!t&&(0,y.Z)({language:i,formFields:n(t.countryCode)}).isValidSync(t)},validationSchema:function(e){var t=e.language,n=e.getFields;return"amazonpay"===e.methodId?(0,f.Vo)((function(e){return(0,A.Z)({translate:(0,y.w)(t),formFields:n(e&&e.countryCode)})})):(0,f.Vo)((function(e){return(0,y.Z)({language:t,formFields:n(e&&e.countryCode)})}))},enableReinitialize:!0})((function(e){var t,n,a,d,c,u=e.billingAddress,m=e.countries,g=e.isUpdating,v=e.methodId,p=e.updateAddress,f=e.onUnhandledError,_=e.selectedShippingAddress,E=e.navigateNextStep,y=(0,s.useState)(!1),A=y[0],U=y[1],F=(0,s.useRef)(null),I=(0,h.Z)(),w=I.isPayPalFastlaneEnabled,L=I.paypalFastlaneAddresses,B="amazonpay"===v,z=JSON.parse(localStorage.getItem("billingAddress")||"{}"),M=(0,s.useState)(!1),V=M[0],x=M[1],J=(0,s.useState)((0,i.__assign)((0,i.__assign)({},z),{countryCode:"US",stateOrProvince:(null==z?void 0:z.stateOrProvince)||"Alabama",stateOrProvinceCode:(null==z?void 0:z.stateOrProvinceCode)||"AL"})),D=J[0],R=J[1],K=(0,s.useState)(u),W=K[0],q=K[1],G=[(0,i.__assign)({},_),(0,i.__assign)({},D)].filter((function(e){var t,n,i,a;return(0,b.Z)(e,[])&&!!e.firstName&&""!==e.firstName&&!!e.lastName&&""!==e.lastName&&((null===(t=null==e?void 0:e.address1)||void 0===t?void 0:t.length)||0)>0&&((null===(n=null==e?void 0:e.address2)||void 0===n?void 0:n.length)||0)>0&&((null===(i=null==e?void 0:e.city)||void 0===i?void 0:i.length)||0)>0&&((null===(a=null==e?void 0:e.postalCode)||void 0===a?void 0:a.length)||0)>0})),T=w?L:G,j=(null==T?void 0:T.length)>0;(0,s.useEffect)((function(){R((0,i.__assign)((0,i.__assign)({},z),{countryCode:"US",company:"",stateOrProvince:(null==z?void 0:z.stateOrProvince)||"Alabama",stateOrProvinceCode:(null==z?void 0:z.stateOrProvinceCode)||"AL"}))}),[]),(0,s.useEffect)((function(){q(u)}),[u]);var H=function(e){return(0,i.__awaiter)(void 0,void 0,void 0,(function(){var t;return(0,i.__generator)(this,(function(n){switch(n.label){case 0:U(!0),n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,p(e)];case 2:return n.sent(),E(),[3,5];case 3:return(t=n.sent())instanceof Error&&f(t),[3,5];case 4:return U(!1),[7];case 5:return[2]}}))}))};return s.createElement(O.Z,{autoComplete:"on",className:"billing-address-form"},B&&u&&s.createElement("div",{className:"form-fieldset"},s.createElement(k.Z,{address:u})),s.createElement("div",{className:"billing-address-add-new-container"},s.createElement("div",{className:"billing-address-add-new",onClick:function(e){e.preventDefault(),x(!0),R((0,i.__assign)((0,i.__assign)({},D),{firstName:"",lastName:"",address1:"",address2:"",city:"",postalCode:"",countryCode:"US",stateOrProvince:"Alabama",stateOrProvinceCode:"AL"}))}},"Add new Address")),s.createElement(S.Z,{id:"checkoutBillingAddress",ref:F},j&&!B&&!V&&s.createElement(S.Z,{id:"billingAddresses"},s.createElement(Z.Z,{isLoading:A},s.createElement("div",{className:"custom-billing-address-list"},G.map((function(e,t){return s.createElement("div",{className:"custom-billing-address-container",key:t,onClick:function(){H((0,i.__assign)((0,i.__assign)({},e),{id:null==u?void 0:u.id}))}},s.createElement("div",{className:"custom-billing-address"},s.createElement("input",{checked:(0,o.Z)(e,W),className:"billing-address-input",type:"radio"}),s.createElement("div",{className:"billing-address-container"},s.createElement(C.Z,{address:e}))),(0,o.Z)(e,_)&&s.createElement("div",{className:"billing-addres-same-shipping-label"},"same as shipping address"),(0,o.Z)(e,D)&&s.createElement("div",{className:"billing-addres-edit-label",onClick:function(){return x(!0)}},"edit"))}))))),V&&s.createElement(l.Z,{isLoading:A},s.createElement("div",null,s.createElement("div",{className:"temp-billing-address-container"},s.createElement("div",{className:"temp-billing-address-name-container"},s.createElement("div",{className:"temp-billing-address-firstname"},s.createElement(N.U,{id:"firstName",name:"firstName",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{firstName:e.target.value}))},title:"First Name",value:D.firstName})),s.createElement("div",{className:"temp-billing-address-lastname"},s.createElement(N.U,{id:"lastName",name:"lastName",onChange:function(e){R((0,i.__assign)((0,i.__assign)({},D),{lastName:e.target.value}))},title:"Last Name",value:D.lastName}))),s.createElement("div",{className:"temp-billing-address1-container"},s.createElement(N.U,{id:"address1",name:"address1",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{address1:e.target.value}))},title:"Address",value:D.address1})),s.createElement("div",{className:"temp-billing-address2-container"},s.createElement(N.U,{id:"address2",name:"address2",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{address2:e.target.value}))},title:"Address",value:D.address2})),s.createElement("div",{className:"temp-billing-address-country-container"},s.createElement("select",{className:"temp-billing-address-country-select",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{countryCode:e.target.value}))},value:D.countryCode||"US"},m.map((function(e){return s.createElement("option",{key:e.code,value:e.code},e.name)})))),s.createElement("div",{className:"temp-billing-address-state-city-container"},s.createElement("div",{className:"temp-billing-address-state"},(null===(a=null!==(n=null===(t=null==m?void 0:m.find((function(e){return e.code===D.countryCode})))||void 0===t?void 0:t.subdivisions)&&void 0!==n?n:[])||void 0===a?void 0:a.length)>0?s.createElement("div",{className:"temp-billing-address-state-container"},s.createElement("select",{className:"temp-billing-address-state-select",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{stateOrProvince:e.target.value}))},value:D.stateOrProvinceCode},(null!==(c=null===(d=null==m?void 0:m.find((function(e){return e.code===D.countryCode})))||void 0===d?void 0:d.subdivisions)&&void 0!==c?c:[]).map((function(e){return s.createElement("option",{key:e.code,value:e.code},e.name)})))):s.createElement("div",{className:"temp-billing-address-state-container"},s.createElement(N.U,{id:"stateOrProvince",name:"stateOrProvince",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{stateOrProvince:e.target.value}))},title:"State Or Province",value:D.stateOrProvince}))),s.createElement("div",{className:"temp-billing-address-city-container"},s.createElement(N.U,{id:"city",name:"city",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{city:e.target.value}))},title:"City",value:D.city}))),s.createElement("div",{className:"temp-billing-address-postalcode-phone-container"},s.createElement("div",{className:"temp-billing-address-postalcode-container"},s.createElement(N.U,{id:"postalCode",name:"postalCode",onChange:function(e){return R((0,i.__assign)((0,i.__assign)({},D),{postalCode:e.target.value}))},title:"Postal Code",value:D.postalCode})),s.createElement("div",{className:"temp-billing-address-phone-container"},s.createElement(N.U,{id:"phone",name:"phone",onChange:function(e){R((0,i.__assign)((0,i.__assign)({},D),{phone:e.target.value}))},title:"Phone",value:D.phone}))),s.createElement("div",{className:"temp-billing-address-button-container"},s.createElement("button",{className:"temp-billing-address-cancel-button",onClick:function(){return x(!1)},type:"button"},"Cancel"),s.createElement("button",{className:"temp-billing-address-save-button",onClick:function(e){var t,n,a,s,r,l,d;e.preventDefault();var o=(0,i.__assign)((0,i.__assign)({},D),{country:null===(t=m.find((function(e){return e.code===D.countryCode})))||void 0===t?void 0:t.name,stateOrProvince:null!==(s=null===(a=null===(n=m.find((function(e){return e.code===D.countryCode})))||void 0===n?void 0:n.subdivisions.find((function(e){return e.code===D.stateOrProvince})))||void 0===a?void 0:a.name)&&void 0!==s?s:D.stateOrProvince,stateOrProvinceCode:null!==(d=null===(l=null===(r=m.find((function(e){return e.code===D.countryCode})))||void 0===r?void 0:r.subdivisions.find((function(e){return e.code===D.stateOrProvince})))||void 0===l?void 0:l.code)&&void 0!==d?d:D.stateOrProvinceCode});localStorage.setItem("billingAddress",JSON.stringify(o)),H((0,i.__assign)((0,i.__assign)({},D),{id:null==u?void 0:u.id})),x(!1)},type:"button"},"Save")))))),s.createElement("div",{className:"form-actions"},s.createElement(P.ZP,{disabled:g||A,id:"checkout-billing-continue",isLoading:g||A,type:"submit",variant:P.Wu.Primary},s.createElement(r.Z,{id:"common.continue_action"}))))})));var F=n(41957);function I(e){var t=(0,F.Z)(e);return t&&["amazonpay"].indexOf(t.providerId)>-1?t.providerId:void 0}var w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleSubmit=function(e){return(0,i.__awaiter)(t,void 0,void 0,(function(){var t,n,a,s,r,l,c,u,m,g,v=e.orderComment,p=(0,i.__rest)(e,["orderComment"]);return(0,i.__generator)(this,(function(e){switch(e.label){case 0:t=this.props,n=t.updateAddress,a=t.updateCheckout,s=t.customerMessage,r=t.billingAddress,l=t.navigateNextStep,c=t.onUnhandledError,u=[],(m=(0,d.Z)(p))&&!(0,o.Z)(m,r)&&u.push(n(m)),s!==v&&u.push(a({customerMessage:v})),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,Promise.all(u)];case 2:return e.sent(),l(),[3,4];case 3:return(g=e.sent())instanceof Error&&c(g),[3,4];case 4:return[2]}}))}))},t}return(0,i.__extends)(t,e),t.prototype.componentDidMount=function(){return(0,i.__awaiter)(this,void 0,void 0,(function(){var e,t,n,s,r,l;return(0,i.__generator)(this,(function(i){switch(i.label){case 0:e=this.props,t=e.initialize,n=e.onReady,s=void 0===n?a.noop:n,r=e.onUnhandledError,i.label=1;case 1:return i.trys.push([1,3,,4]),[4,t()];case 2:return i.sent(),s(),[3,4];case 3:return(l=i.sent())instanceof Error&&r(l),[3,4];case 4:return[2]}}))}))},t.prototype.render=function(){var e=this.props,t=e.updateAddress,n=e.isInitializing,a=e.selectedShippingAddress,d=(0,i.__rest)(e,["updateAddress","isInitializing","selectedShippingAddress"]);return console.log("selectedShippingAddress : ",a),console.log("[this.props] billingAddress : ",this.props.billingAddress),s.createElement(l.Z,{isLoading:n},s.createElement("div",{className:"checkout-form"},s.createElement("div",{className:"form-legend-container"},s.createElement(v.Z,{testId:"billing-address-heading"},s.createElement(r.Z,{id:"billing.billing_address_heading"}))),s.createElement(U,(0,i.__assign)({},d,{onSubmit:this.handleSubmit,selectedShippingAddress:a,updateAddress:t}))))},t}(s.Component);const L=(0,c.Z)((function(e){var t=e.checkoutService,n=e.checkoutState,i=n.data,a=i.getCheckout,s=i.getConfig,r=i.getCart,l=i.getCustomer,d=i.getBillingAddress,o=i.getBillingAddressFields,c=i.getBillingCountries,v=i.getShippingAddress,p=n.statuses,f=p.isLoadingBillingCountries,_=p.isUpdatingBillingAddress,h=p.isUpdatingCheckout,b=s(),C=l(),E=a(),y=r();if(!(b&&C&&E&&y))return null;var N=b.checkoutSettings,A=N.enableOrderComments,P=N.googleMapsApiKey;return{billingAddress:d(),countries:c()||u.L,countriesWithAutocomplete:["US","CA","AU","NZ","GB"],customer:C,customerMessage:E.customerMessage,getFields:o,googleMapsApiKey:P,initialize:t.loadBillingAddressFields,isInitializing:f(),isUpdating:_()||h(),methodId:I(E),shouldShowOrderComments:A&&(0,g.Z)(y)<1,updateAddress:t.updateBillingAddress,updateCheckout:t.updateCheckout,isFloatingLabelEnabled:(0,m.Z)(b.checkoutSettings),selectedShippingAddress:v()||{}}}))(w)},82100:(e,t,n)=>{n.d(t,{U:()=>s});var i=n(97582),a=n(67627),s=function(e){var t=e.id,n=e.name,s=e.title,r=e.value,l=e.onChange,d=(0,i.__rest)(e,["id","name","title","value","onChange"]);return a.createElement("div",null,a.createElement("div",{className:"input-field-container"},a.createElement("div",{className:"input-field-title"},s),a.createElement("input",(0,i.__assign)({},d,{className:"input-field-input",id:t,name:n,onChange:l,placeholder:s,type:"text",value:r}))))}},41957:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(10631),a=n(56851);function s(e){return(e&&e.payments?e.payments:[]).find((function(e){return!(0,i.Z)(e)&&!(0,a.Z)(e)&&!!e.providerId}))}},74161:(e,t,n)=>{n.d(t,{Z:()=>a});var i=n(92304);function a(e){return(0,i.Z)(e.lineItems.physicalItems.filter((function(e){return!e.addedByPromotion})))}}}]);
//# sourceMappingURL=billing-1e414bb6.js.map