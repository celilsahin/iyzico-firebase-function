const functions = require("firebase-functions");
const IyziPay = require("iyzipay");
const admin = require("firebase-admin");
admin.initializeApp();

exports.iyzicoStart = functions.https.onCall(async (data, context) => {
 var iyzipay = new IyziPay({
  apiKey: "iyzico-api-key",
  secretKey: "iyzico-secret-key",
  uri: "https://api.iyzipay.com",
 });

 const request = {
  locale: data.lang,
  price: data.price,
  paidPrice: data.price,
  currency: data.currency,
  basketId: data.type,
  callbackUrl: "https://<your-callback-function-address>.cloudfunctions.net/iyzicoCallback",
  enabledInstallments: [2, 3, 6, 9],
  buyer: {
   id: data.user.id,
   name: data.user.name,
   surname: data.user.surname,
   gsmNumber: data.user.phone,
   email: data.user.email,
   identityNumber: data.user.tckn,
   registrationAddress: data.user.address,
   ip: data.user.ip,
   city: data.user.city,
   country: data.user.country,
  },
  shippingAddress: {
   contactName: data.user.name + " " + data.user.surname,
   city: data.user.city,
   country: data.user.country,
   address: data.user.address,
  },
  billingAddress: {
   contactName: data.user.name + " " + data.user.surname,
   city: data.user.city,
   country: data.user.country,
   address: data.user.address,
  },
  basketItems: [
   {
    id: data.type,
    name: data.type,
    category1: "categoryName",
    itemType: "VIRTUAL",
    price: data.price,
   },
  ],
 };

 return new Promise(function (resolve, reject) {
  iyzipay.checkoutFormInitialize.create(request, function (err, result) {
   resolve(result);
  });
 });
});

exports.iyzicoCallback = functions.https.onRequest(async (req, res) => {
 var iyzipay = new IyziPay({
  apiKey: "iyzico-api-key",
  secretKey: "iyzico-secret-key",
  uri: "https://api.iyzipay.com",
 });

 return iyzipay.checkoutForm.retrieve(
  {
   locale: req.body.locale,
   conversationId: req.body.conversationId,
   token: req.body.token,
  },
  async function (err, result) {
   const url = "http://your-site.com";
   const db = admin.firestore();
   if (result.status == "success" && result.paymentStatus == "SUCCESS") {
    return db
     .collection("shoppingList")
     .add(result)
     .then((success) => {
      res.redirect(url + "/payment?status=success&id=" + success.id);
     });
   } else {
    return db
     .collection("shoppingList")
     .add(result)
     .then((success) => {
      res.redirect(url + "/payment?status=error&id=" + success.id);
     });
   }
  }
 );
});
