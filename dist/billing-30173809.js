"use strict";(self.webpackJsonpCheckout=self.webpackJsonpCheckout||[]).push([[876],{48574:(e,t,n)=>{n.r(t),n.d(t,{default:()=>N});var r=n(97582),s=n(91074),i=n(67627),a=n(92574),o=n(19053),d=n(95593),l=n(88870),u=n(69638),c=n(55409),g=n(76741),m=n(74161),p=n(98119),h=n(76417),f=n(19686),v=n(56204),b=n(31478),A=n(97204),y=n(86582),C=n(75667),E=n(78500),Z=n(96543),_=n(34323),F=n(17175),S=n(60452),k=n(16206),w=n(78379),B=n(45855),I=n(77683);const M=(0,v.Z)((0,h.withFormik)({handleSubmit:function(e,t){(0,t.props.onSubmit)(e)},mapPropsToValues:function(e){var t=e.getFields,n=e.customerMessage,s=e.billingAddress;return(0,r.__assign)((0,r.__assign)({},(0,Z.Z)(t(s&&s.countryCode),s)),{orderComment:n})},isInitialValid:function(e){var t=e.billingAddress,n=e.getFields,r=e.language;return!!t&&(0,_.Z)({language:r,formFields:n(t.countryCode)}).isValidSync(t)},validationSchema:function(e){var t=e.language,n=e.getFields;return"amazonpay"===e.methodId?(0,f.Vo)((function(e){return(0,F.Z)({translate:(0,_.w)(t),formFields:n(e&&e.countryCode)})})):(0,f.Vo)((function(e){return(0,_.Z)({language:t,formFields:n(e&&e.countryCode)})}))},enableReinitialize:!0})((function(e){var t=e.googleMapsApiKey,n=e.billingAddress,s=e.countriesWithAutocomplete,d=e.customer,l=d.addresses,u=d.isGuest,c=e.getFields,g=e.countries,m=e.isUpdating,p=e.setFieldValue,h=e.values,f=e.methodId,v=e.isFloatingLabelEnabled,Z=e.updateAddress,_=e.onUnhandledError,F=(0,i.useState)(!1),M=F[0],U=F[1],z=(0,i.useRef)(null),L=(0,b.Z)(),N=L.isPayPalFastlaneEnabled,V=L.paypalFastlaneAddresses,P="amazonpay"===f,K=c(h.countryCode),W=K.filter((function(e){return e.custom})),x=W.length>0,O=P&&x?W:K,R=N?V:l,G=(null==R?void 0:R.length)>0,J=n&&(0,A.Z)(n,R,c(n.countryCode)),D=function(e){return(0,r.__awaiter)(void 0,void 0,void 0,(function(){var t;return(0,r.__generator)(this,(function(n){switch(n.label){case 0:U(!0),n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,Z(e)];case 2:return n.sent(),[3,5];case 3:return(t=n.sent())instanceof Error&&_(t),[3,5];case 4:return U(!1),[7];case 5:return[2]}}))}))};return i.createElement(k.Z,{autoComplete:"on"},P&&n&&i.createElement("div",{className:"form-fieldset"},i.createElement(I.Z,{address:n})),i.createElement(w.Z,{id:"checkoutBillingAddress",ref:z},G&&!P&&i.createElement(w.Z,{id:"billingAddresses"},i.createElement(B.Z,{isLoading:M},i.createElement(y.Z,{addresses:R,onSelectAddress:D,onUseNewAddress:function(){D({})},selectedAddress:J?n:void 0,type:C.Z.Billing}))),!J&&i.createElement(o.Z,{isLoading:M},i.createElement(E.Z,{countries:g,countriesWithAutocomplete:s,countryCode:h.countryCode,formFields:O,googleMapsApiKey:t,isFloatingLabelEnabled:v,setFieldValue:p,shouldShowSaveAddress:!u}))),i.createElement("div",{className:"form-actions"},i.createElement(S.ZP,{disabled:m||M,id:"checkout-billing-continue",isLoading:m||M,type:"submit",variant:S.Wu.Primary},i.createElement(a.Z,{id:"common.continue_action"}))))})));var U=n(41957);function z(e){var t=(0,U.Z)(e);return t&&["amazonpay"].indexOf(t.providerId)>-1?t.providerId:void 0}var L=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleSubmit=function(e){return(0,r.__awaiter)(t,void 0,void 0,(function(){var t,n,s,i,a,o,u,c,g,m,p=e.orderComment,h=(0,r.__rest)(e,["orderComment"]);return(0,r.__generator)(this,(function(e){switch(e.label){case 0:t=this.props,n=t.updateAddress,s=t.updateCheckout,i=t.customerMessage,a=t.billingAddress,o=t.navigateNextStep,u=t.onUnhandledError,c=[],(g=(0,d.Z)(h))&&!(0,l.Z)(g,a)&&c.push(n(g)),i!==p&&c.push(s({customerMessage:p})),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,Promise.all(c)];case 2:return e.sent(),o(),[3,4];case 3:return(m=e.sent())instanceof Error&&u(m),[3,4];case 4:return[2]}}))}))},t}return(0,r.__extends)(t,e),t.prototype.componentDidMount=function(){return(0,r.__awaiter)(this,void 0,void 0,(function(){var e,t,n,i,a,o;return(0,r.__generator)(this,(function(r){switch(r.label){case 0:e=this.props,t=e.initialize,n=e.onReady,i=void 0===n?s.noop:n,a=e.onUnhandledError,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,t()];case 2:return r.sent(),i(),[3,4];case 3:return(o=r.sent())instanceof Error&&a(o),[3,4];case 4:return[2]}}))}))},t.prototype.render=function(){var e=this.props,t=e.updateAddress,n=e.isInitializing,s=(0,r.__rest)(e,["updateAddress","isInitializing"]);return i.createElement(o.Z,{isLoading:n},i.createElement("div",{className:"checkout-form"},i.createElement("div",{className:"form-legend-container"},i.createElement(p.Z,{testId:"billing-address-heading"},i.createElement(a.Z,{id:"billing.billing_address_heading"}))),i.createElement(M,(0,r.__assign)({},s,{onSubmit:this.handleSubmit,updateAddress:t}))))},t}(i.Component);const N=(0,u.Z)((function(e){var t=e.checkoutService,n=e.checkoutState,r=n.data,s=r.getCheckout,i=r.getConfig,a=r.getCart,o=r.getCustomer,d=r.getBillingAddress,l=r.getBillingAddressFields,u=r.getBillingCountries,p=n.statuses,h=p.isLoadingBillingCountries,f=p.isUpdatingBillingAddress,v=p.isUpdatingCheckout,b=i(),A=o(),y=s(),C=a();if(!(b&&A&&y&&C))return null;var E=b.checkoutSettings,Z=E.enableOrderComments,_=E.googleMapsApiKey;return{billingAddress:d(),countries:u()||c.L,countriesWithAutocomplete:["US","CA","AU","NZ","GB"],customer:A,customerMessage:y.customerMessage,getFields:l,googleMapsApiKey:_,initialize:t.loadBillingAddressFields,isInitializing:h(),isUpdating:f()||v(),methodId:z(y),shouldShowOrderComments:Z&&(0,m.Z)(C)<1,updateAddress:t.updateBillingAddress,updateCheckout:t.updateCheckout,isFloatingLabelEnabled:(0,g.Z)(b.checkoutSettings)}}))(L)}}]);
//# sourceMappingURL=billing-30173809.js.map