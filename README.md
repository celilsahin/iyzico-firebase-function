## iyzico ile Firebase Cloud Function

İyzico api, firebase ve cloud function kullanarak uygulamalarınıza ödeme sistemi entegre edebilirsiniz.

1. Örnek datayı httpsCallable ile "iyzicoStart" fonksiyonuna gönderiyoruz.
2. iyzicoStart fonksiyonu datayı iyzico api üzerinden "checkoutFormInitialize" göndermektedir.
3. checkoutFormInitialize bize sonuç olarak result değerini gönderiyor.
4. httpsCallable then ile gelen result değerini alıp script kodunu ekrana bastırıyoruz.
5. kullanıcı kart bilgilerini girip ödemeyi tamamlandıktan sonra callbackUrl yönlendiriliyor.
6. iyzicoCallback fonksiyonu ile gelen token,locale,conversationId ile işlemin sonucunu öğreniyoruz.
7. gelen sonucu firestore yazıyoruz (burası size kalmış istediğinizi yapabilirsiniz).
8. firestore yazdıktan sonra redirect ile tekrar sitemize yönlendiriyoruz.
9. redirect url içinde firestore eklenen datanın idside bulunmaktadır. Bu id ile datayı sorgulayıp kullanıcıya detaylı bilgi verebilirsiniz.

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
