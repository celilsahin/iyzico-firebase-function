## iyzico ile Firebase Cloud Function

```
return firebase.functions().httpsCallable("iyzicoStart")(data)
.then((success) => {
//success.data.checkoutFormContent -> sonuç başarılı ise kart bilgilerinizi girebileceğiniz script kodunu döndürmektedir.
});
```

```
//örnek data
const data = {
  type: "custom type",
  locale: "tr",
  price: 100.0,
  currency: "TRY",
  user: {
    id: "user id",
    name: "user name",
    surname: "user surname",
    email: "user email",
    phone: "+901234567890",
    tckn: "11111111111",
    address: "user address",
    city: "user city",
    country: "user country",
    ip: "111.111.111",
  },
};
```

Daha fazla bilgi detay için [iyzico Dökümantasyon](https://dev.iyzipay.com/tr/odeme-formu/odeme-formu-baslatma) inceleyebilirsiniz .
