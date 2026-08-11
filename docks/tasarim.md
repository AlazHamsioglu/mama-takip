# Tasarım Dokümanı — Mama Takip

## 1. Tasarım Yaklaşımı

Mama Takip uygulamasının arayüzü, günlük kullanım sırasında hızlı ve kolay veri girişi yapılabilmesi amacıyla mobile-first yaklaşımıyla tasarlanmıştır.

Uygulamanın temel kullanım senaryosu, kullanıcının evcil hayvanına mama verdikten sonra bu işlemi hızlı şekilde kaydetmesi ve gün içerisindeki beslenme durumunu kontrol etmesidir.

Bu nedenle ana ekran özellikle aşağıdaki üç soruya hızlı cevap verecek şekilde tasarlanmıştır:

1. Evcil hayvan bugün beslendi mi?
2. Bugün toplam ne kadar tüketti?
3. Günlük beslenme hedefinin ne kadarı tamamlandı?

Arayüz sade, açık renkli ve kolay taranabilir olacak şekilde tasarlanmıştır. Pet-care temasını desteklemek için yumuşak köşeli kartlar, hayvan ikonları ve sıcak renk vurguları kullanılmıştır.

---

## 2. Kullanılan AI Aracı

Ana ekran ve uygulamanın temel arayüz tasarımı AI destekli görsel üretim aracı kullanılarak hazırlanmıştır.

Tasarım oluşturulmadan önce ürün gereksinimleri, kullanıcı senaryoları, veri modeli ve MVP kapsamı belirlenmiş; AI tasarım prompt'u bu analiz sonuçlarına göre hazırlanmıştır.

AI tarafından üretilen tasarım doğrudan rastgele bir UI önerisi olarak kullanılmamış, önceden belirlenen ürün gereksinimlerine göre değerlendirilmiştir.

---

## 3. Kullanılan Tasarım Prompt'u

Aşağıdaki prompt, uygulamanın ana tasarımını oluşturmak için kullanılmıştır:

```text
Design a modern, clean, mobile-first responsive web application called "Mama Takip" for tracking the daily feeding of multiple pets.

PRODUCT PURPOSE

The application helps pet owners record when and how much food they give to their pets during the day.

The main dashboard must allow the user to understand these three things immediately:

1. Has my pet been fed today?
2. How much has my pet consumed today?
3. How much of the daily feeding target has been completed?

The application supports multiple pets.

MAIN DASHBOARD

Design the main dashboard for a selected pet named Mia, a cat.

At the top of the screen, provide a compact pet selector that allows switching between:

- Mia — cat
- Leo — dog

Also provide a clear way to add another pet.

Mia has a daily feeding target of 120 g.

Today Mia has consumed 70 g.

Display a prominent daily feeding summary containing:

- 70 g / 120 g
- 58% completed
- 50 g remaining

Use a clear visual progress indicator.

Do not present the information as medical advice. The daily target is simply a user-defined tracking target.

LAST FEEDING

Include a clear "Last Feeding" section.

Example:

13:30
30 g
Royal Canin Sterilised

The user should immediately understand when the pet was last fed.

TODAY'S FEEDINGS

Include a chronological list of today's feeding records.

Example records:

08:15 — 40 g — Royal Canin Sterilised
13:30 — 30 g — Royal Canin Sterilised

Each record should be visually easy to scan and allow edit/delete actions without making the interface cluttered.

PRIMARY ACTION

The most important action in the application is recording a feeding.

Include a highly visible primary button:

"+ Mama Verildi"

The action should be easily reachable on a mobile device.

NAVIGATION

Provide navigation for:

- Bugün
- Geçmiş
- Evcil Hayvanlar
- Mamalar

Use a mobile-friendly navigation pattern such as bottom navigation where appropriate.

For wider desktop screens, adapt the navigation and content layout responsively without changing the application's information hierarchy.

FEEDING FORM

The feeding form should contain:

- Pet
- Food
- Amount
- Date
- Time
- Optional note

The currently selected pet should be preselected.

Date and time should default to the current date and time.

PET MANAGEMENT

Pet information includes:

- Name
- Pet type: cat, dog, or other
- Daily feeding target
- Measurement unit: g or ml

FOOD MANAGEMENT

Food information includes:

- Food name
- Optional brand
- Food type: dry, wet, or other
- Measurement unit: g or ml

HISTORY

Design a simple feeding history view.

Group previous feeding records by date and show the total consumed amount for each day.

Do not include complex charts or advanced analytics.

VISUAL STYLE

Use a clean, friendly and modern pet-care aesthetic.

The application should feel trustworthy, lightweight and easy to use rather than playful or childish.

Use:

- light backgrounds
- subtle warm accent colors
- rounded cards
- clear spacing
- accessible typography
- simple pet-related icons
- clear visual hierarchy
- strong contrast for important information
- minimal visual clutter

Avoid excessive gradients, excessive illustrations and overly decorative elements.

Use cat, dog and generic paw icons where appropriate instead of requiring uploaded pet photos.

UX PRIORITIES

Prioritize:

1. Quick understanding of today's feeding status
2. Fast feeding entry
3. Easy switching between pets
4. Clear daily progress
5. Easy access to feeding history

The main mobile screen should be usable comfortably with one hand.

EMPTY STATES

Also consider simple empty states for:

- No pets added
- No food added
- No feeding recorded today

Each empty state should provide a clear next action.

Create a polished MVP interface rather than a complex production application.
```

---

## 4. Tasarım Görseli

AI tarafından oluşturulan tasarım görseli proje içerisinde saklanacaktır.

Önerilen konum:

```text
docs/design/mama-takip-ui.png
```

Tasarım görseli aşağıdaki temel ekranları göstermektedir:

* Bugün / Ana Ekran
* Yeni Öğün Ekleme
* Geçmiş
* Evcil Hayvanlar
* Mamalar
* Boş durum örnekleri

Bu görsel geliştirme sırasında ana görsel referans olarak kullanılacaktır.

---

## 5. Ana Ekran Tasarım Kararları

### Evcil Hayvan Seçimi

Ana ekranın üst kısmında evcil hayvan seçimi bulunmaktadır.

Kullanıcı Mia ve Leo gibi farklı hayvanlar arasında hızlı şekilde geçiş yapabilir.

Bu yaklaşım, her hayvan için ayrı bir sayfa oluşturmak yerine tek dashboard üzerinden farklı hayvanların beslenme bilgilerinin görüntülenmesini sağlar.

### Günlük Beslenme Özeti

Seçili hayvanın günlük beslenme bilgisi ana ekranın en görünür bölümlerinden biridir.

Örneğin:

```text
70 / 120 g
%58 tamamlandı
50 g kaldı
```

bilgileri progress göstergesi ile birlikte sunulur.

Amaç, kullanıcının günlük durumu herhangi bir hesaplama yapmadan anlayabilmesidir.

### Son Öğün

"Son Öğün" bölümü kullanıcının en son ne zaman mama verdiğini hızlı şekilde görmesini sağlar.

Bu alan:

* Saat
* Miktar
* Kullanılan mama

bilgilerini gösterir.

Bu özellik özellikle "Bugün mama vermiş miydim?" kullanım senaryosunu desteklemektedir.

### Bugünkü Öğünler

Gün içerisinde oluşturulan kayıtlar kronolojik olarak listelenmektedir.

Her öğün:

* Saat
* Miktar
* Mama

bilgilerini gösterir.

Kullanıcı ayrıca yanlış oluşturulan kayıtları düzenleyebilir veya silebilir.

### Mama Verildi Aksiyonu

"+ Mama Verildi" butonu uygulamanın temel aksiyonudur.

Bu nedenle diğer aksiyonlardan daha belirgin şekilde tasarlanmıştır.

Mobil kullanımda kolay erişilebilir bir konumda bulunması hedeflenmiştir.

---

## 6. Navigasyon

Mobil arayüzde dört ana navigasyon alanı bulunmaktadır:

* Bugün
* Geçmiş
* Evcil Hayvanlar
* Mamalar

Bottom navigation yaklaşımı, uygulamanın temel bölümlerine tek elle kolay erişim sağlamak amacıyla tercih edilmiştir.

Daha geniş ekranlarda aynı bilgi mimarisi responsive şekilde uyarlanacaktır.

---

## 7. Yeni Öğün Formu

Yeni öğün formu mümkün olduğunca hızlı veri girişi yapılacak şekilde tasarlanmıştır.

Form alanları:

* Evcil Hayvan
* Mama
* Miktar
* Birim
* Tarih
* Saat
* İsteğe bağlı not

Ana ekranda seçilmiş olan evcil hayvan form açıldığında otomatik olarak seçili olacaktır.

Tarih ve saat alanları mevcut tarih ve saate varsayılan olarak ayarlanacaktır.

Bu yaklaşım kullanıcının mama verdikten sonra minimum işlemle kayıt oluşturabilmesini sağlar.

---

## 8. Geçmiş Tasarımı

Geçmiş ekranında öğün kayıtları tarih bazında gruplanmaktadır.

Her tarih için:

* Günlük toplam tüketim
* Öğün saatleri
* Öğün miktarları
* Kullanılan mamalar

görüntülenmektedir.

MVP kapsamında grafik veya gelişmiş analiz kullanılmamıştır.

Bu karar, ekranın sade kalmasını ve ürün kapsamının gereksiz şekilde büyümemesini sağlar.

---

## 9. Evcil Hayvan Yönetimi

Evcil Hayvanlar ekranında sisteme eklenen hayvanlar basit kartlar halinde gösterilmektedir.

Her kart:

* Hayvan adı
* Hayvan türü
* Günlük beslenme hedefi
* Ölçü birimi

bilgilerini içerir.

Yeni evcil hayvan eklemek için belirgin bir ekleme aksiyonu bulunmaktadır.

Profil fotoğrafı MVP kapsamına alınmamıştır. Hayvanları görsel olarak ayırt etmek için basit hayvan ikonları kullanılacaktır.

---

## 10. Mama Yönetimi

Mamaların ayrı bir yönetim ekranında gösterilmesi tercih edilmiştir.

Mama kartlarında:

* Mama adı
* Marka
* Mama tipi
* Ölçü birimi

gösterilmektedir.

Bu yapı sayesinde kullanıcı yeni öğün oluştururken aynı mama bilgilerini tekrar tekrar girmek yerine daha önce tanımladığı mamayı seçebilir.

---

## 11. Boş Durumlar

Tasarımda üç önemli empty state dikkate alınmıştır.

### Evcil Hayvan Bulunmaması

Henüz evcil hayvan bulunmuyorsa kullanıcıya ilk hayvanını eklemesi için doğrudan bir aksiyon sunulur.

### Mama Bulunmaması

Henüz mama tanımlanmamışsa kullanıcı mama ekleme ekranına yönlendirilir.

### Bugün Öğün Bulunmaması

Seçili hayvan için bugün öğün kaydı bulunmuyorsa kullanıcıya henüz mama verilmediği belirtilir ve "+ Mama Verildi" aksiyonu gösterilir.

Empty state'lerin amacı yalnızca boş ekran göstermek yerine kullanıcıya bir sonraki işlemi açık şekilde anlatmaktır.

---

## 12. Görsel Stil Kararları

Tasarımda açık renkli bir arayüz tercih edilmiştir.

Ana görsel özellikler:

* Açık arka plan
* Yumuşak yeşil vurgu renkleri
* Ana aksiyonlarda sıcak turuncu vurgu
* Yuvarlatılmış kartlar
* Yeterli beyaz alan
* Sade ikonografi
* Yüksek okunabilirlik
* Belirgin bilgi hiyerarşisi

Pet-care teması kullanılmasına rağmen tasarımın fazla çocukça veya dekoratif görünmemesine dikkat edilmiştir.

Gereksiz gradient, büyük illüstrasyon ve karmaşık grafiklerden kaçınılmıştır.

---

## 13. Tasarımın Ürün Analiziyle Uyumu

Oluşturulan tasarım ürün analizinde belirlenen temel gereksinimleri karşılamaktadır.

Tasarımda:

* Birden fazla evcil hayvan arasında geçiş yapılabilmektedir.
* Günlük tüketim ilk bakışta görülebilmektedir.
* Günlük hedef ve kalan miktar açık şekilde gösterilmektedir.
* Son öğün saati belirgindir.
* "+ Mama Verildi" aksiyonu öne çıkarılmıştır.
* Günlük öğün listesi kolay taranabilir yapıdadır.
* Geçmiş kayıtlarına erişim bulunmaktadır.
* Evcil hayvan ve mama yönetimi ayrı bölümlerde sunulmaktadır.
* Empty state'ler kullanıcıyı sonraki aksiyona yönlendirmektedir.
* Mobil kullanım ana tasarım önceliği olarak korunmaktadır.

Bu nedenle oluşturulan tasarım MVP'nin geliştirme aşamasında ana UI/UX referansı olarak kullanılacaktır.

---

## 14. Geliştirme Sırasında Uygulanacak Tasarım Sınırları

AI tarafından üretilen tasarım bir UI/UX referansı olarak kullanılacaktır ve görselin her detayı birebir kopyalanmayacaktır.

Özellikle mama paketi veya gerçekçi hayvan görselleri gibi özel görsel asset'ler MVP için zorunlu değildir.

Geliştirme sırasında:

* Basit hayvan ikonları
* Basit mama ikonları
* CSS tabanlı kartlar
* CSS tabanlı progress göstergesi
* Responsive layout

kullanılması yeterlidir.

Öncelik görseli birebir kopyalamak değil, tasarımda belirlenen bilgi mimarisini, kullanıcı akışını ve görsel hiyerarşiyi korumaktır.
