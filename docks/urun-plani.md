# Ürün Planı — Mama Takip Mini Uygulaması

## 1. Ürün Özeti

Mama Takip, bir veya birden fazla evcil hayvanın günlük beslenme kayıtlarını takip etmek için geliştirilen basit bir uygulamadır.

Uygulamanın temel amacı, kullanıcıların evcil hayvanlarına ne zaman ve ne kadar mama verdiklerini kolayca kaydetmesini ve gün içerisindeki toplam beslenme miktarını takip etmesini sağlamaktır.

Kullanıcı, uygulama üzerinden farklı evcil hayvanlar ekleyebilir, bu hayvanlar için günlük beslenme hedefleri belirleyebilir, kullandığı mamaları tanımlayabilir ve her mama verme işlemini ayrı bir öğün kaydı olarak sisteme ekleyebilir.

---

## 2. Hedef Kullanıcı

Uygulamanın hedef kullanıcısı, bir veya birden fazla evcil hayvan sahibi olan ve hayvanlarının günlük beslenmesini düzenli olarak takip etmek isteyen kişilerdir.

Özellikle aşağıdaki ihtiyaçlara sahip kullanıcılar hedeflenmektedir:

* Gün içerisinde evcil hayvanına ne zaman mama verdiğini takip etmek isteyen kişiler.
* Verilen mama miktarlarını kayıt altında tutmak isteyen kişiler.
* Evcil hayvanının günlük beslenme hedefinin ne kadarını tamamladığını görmek isteyen kişiler.
* Birden fazla evcil hayvanın beslenmesini birbirinden bağımsız olarak takip etmek isteyen kişiler.
* Farklı mama türlerini tanımlayıp hangi öğünde hangi mamanın kullanıldığını görmek isteyen kişiler.

Uygulama yalnızca kedi ve köpek sahipleriyle sınırlı değildir. Kullanıcı, farklı türde evcil hayvanları da sisteme ekleyebilir.

---

## 3. Çözülmek İstenen Problem

Evcil hayvan sahipleri gün içerisinde hayvanlarına ne zaman ve ne kadar mama verdiklerini unutabilir veya günlük beslenme miktarını takip etmekte zorlanabilir.

Bu problem özellikle birden fazla evcil hayvan bulunduğunda daha belirgin hale gelir. Kullanıcı, hangi hayvanın ne zaman beslendiğini veya günlük hedefinin ne kadarını tamamladığını hatırlamakta zorlanabilir.

Uygulamanın cevap vermeyi amaçladığı temel sorular şunlardır:

* Evcil hayvanım bugün mama yedi mi?
* En son ne zaman mama verdim?
* Bugün toplam ne kadar mama yedi?
* Günlük beslenme hedefinin ne kadarı tamamlandı?
* Günlük hedefe ulaşmak için ne kadar daha mama verilmesi gerekiyor?
* Hangi mama kullanıldı?

Mama Takip uygulaması, bu bilgileri tek bir yerde göstererek günlük beslenme takibini kolaylaştırmayı amaçlamaktadır.

---

## 4. Temel Kullanıcı Senaryosu

Kullanıcı uygulamayı ilk kez açtığında bir evcil hayvan ekler.

Örneğin:

* İsim: Mia
* Tür: Kedi
* Günlük beslenme hedefi: 120 g

Kullanıcı daha sonra kullandığı mamayı sisteme tanımlar.

Örneğin:

* Mama adı: Sterilised 37
* Marka: Royal Canin
* Mama tipi: Kuru mama
* Birim: g

Kullanıcı Mia'ya sabah 40 g mama verdiğinde uygulamadaki "Mama Verildi" aksiyonunu kullanarak yeni bir öğün kaydı oluşturur.

Bu kayıtta:

* Evcil hayvan
* Kullanılan mama
* Miktar
* Tarih
* Saat
* İsteğe bağlı not

bilgileri saklanır.

Kayıt oluşturulduktan sonra ana ekran güncellenir ve kullanıcı Mia'nın günlük beslenme durumunu görüntüleyebilir.

Örneğin:

* Günlük hedef: 120 g
* Bugün tüketilen: 40 g
* Kalan: 80 g
* Tamamlanma oranı: %33
* Son öğün: 08:15

Kullanıcı gün içerisinde yeni öğünler ekledikçe günlük toplam otomatik olarak güncellenir.

Birden fazla evcil hayvan bulunması durumunda kullanıcı ana ekrandan aktif evcil hayvanı değiştirebilir ve her hayvanın beslenme bilgilerini ayrı ayrı görüntüleyebilir.

---

## 5. MVP Ekranları

### 5.1 Bugün / Ana Ekran

Ana ekran, seçili evcil hayvanın güncel beslenme durumunu gösterir.

Bu ekranda:

* Aktif evcil hayvan seçimi
* Günlük beslenme hedefi
* Bugün tüketilen toplam miktar
* Kalan miktar
* Günlük tamamlanma oranı
* Son öğün bilgisi
* Bugünkü öğünlerin listesi
* Yeni öğün ekleme aksiyonu

yer alır.

Ana ekranın temel amacı, kullanıcı uygulamayı açtığında mevcut durumu birkaç saniye içerisinde anlayabilmesini sağlamaktır.

### 5.2 Öğün Ekleme

Kullanıcı yeni bir mama verme işlemini bu ekran veya form üzerinden kaydeder.

Form alanları:

* Evcil hayvan
* Mama
* Miktar
* Tarih
* Saat
* Not

Evcil hayvan alanı varsayılan olarak ana ekranda seçili olan hayvanı kullanır.

Tarih ve saat alanları varsayılan olarak mevcut tarih ve saate ayarlanır.

### 5.3 Geçmiş

Geçmiş ekranında daha önce oluşturulan öğün kayıtları tarih bazında görüntülenir.

Kayıtlar en yeni tarihten eskiye doğru sıralanır.

Her gün için o gün yapılan öğün kayıtları ve toplam tüketilen miktar gösterilir.

MVP kapsamında gelişmiş filtreleme veya grafik bulunmaz.

### 5.4 Evcil Hayvanlar

Bu ekranda kullanıcı:

* Yeni evcil hayvan ekleyebilir.
* Mevcut evcil hayvanları görüntüleyebilir.
* Evcil hayvan bilgilerini düzenleyebilir.
* Evcil hayvanı silebilir.

Evcil hayvan silindiğinde bu hayvana ait öğün kayıtları da silinir.

### 5.5 Mamalar

Bu ekranda kullanıcı kullandığı mamaları yönetebilir.

Kullanıcı:

* Yeni mama ekleyebilir.
* Mama listesini görüntüleyebilir.
* Mama bilgilerini düzenleyebilir.
* Kullanılmamış bir mamayı silebilir.

Geçmiş öğün kayıtlarında kullanılmış olan bir mama silinemez. Bu kural geçmiş kayıtların veri bütünlüğünü korumak amacıyla uygulanır.

---

## 6. MVP Özellikleri

MVP kapsamında aşağıdaki özellikler bulunacaktır:

* Birden fazla evcil hayvan ekleme.
* Evcil hayvan bilgilerini düzenleme.
* Evcil hayvan silme.
* Aktif evcil hayvanı seçme.
* Her evcil hayvan için günlük beslenme hedefi belirleme.
* Kullanılan mamaları sisteme ekleme.
* Mama bilgilerini düzenleme.
* Kullanılmamış mamaları silme.
* Yeni öğün kaydı oluşturma.
* Öğün kaydını düzenleme.
* Öğün kaydını silme.
* Seçili hayvanın bugünkü öğünlerini görüntüleme.
* Bugün tüketilen toplam miktarı hesaplama.
* Günlük hedeften kalan miktarı hesaplama.
* Günlük tamamlanma oranını gösterme.
* Son öğün bilgisini gösterme.
* Geçmiş öğün kayıtlarını tarih bazında görüntüleme.
* Verileri tarayıcı localStorage alanında saklama.
* Verileri sayfa yenilendikten sonra koruma.
* Boş durumlar için yönlendirici kullanıcı mesajları gösterme.
* Mobil ve masaüstü ekranlarda kullanılabilecek responsive arayüz.

---

## 7. Veri Modeli

Uygulamanın veri modeli üç temel yapıdan oluşur:

* Pet
* Food
* FeedingRecord

### 7.1 Pet

Evcil hayvan bilgilerini tutar.

```ts
type PetType = "cat" | "dog" | "other";

type MeasurementUnit = "g" | "ml";

interface Pet {
  id: string;
  name: string;
  type: PetType;
  dailyTarget: number;
  targetUnit: MeasurementUnit;
  createdAt: string;
}
```

Alanlar:

* `id`: Evcil hayvanın benzersiz kimliği.
* `name`: Evcil hayvanın adı.
* `type`: Hayvan türü.
* `dailyTarget`: Kullanıcı tarafından belirlenen günlük beslenme hedefi.
* `targetUnit`: Günlük hedefin ölçü birimi.
* `createdAt`: Kaydın oluşturulma zamanı.

### 7.2 Food

Kullanıcının sisteme eklediği mama bilgilerini tutar.

```ts
type FoodType = "dry" | "wet" | "other";

interface Food {
  id: string;
  name: string;
  brand?: string;
  type: FoodType;
  unit: MeasurementUnit;
  createdAt: string;
}
```

Alanlar:

* `id`: Mamanın benzersiz kimliği.
* `name`: Mama adı.
* `brand`: İsteğe bağlı marka bilgisi.
* `type`: Mama tipi.
* `unit`: Ölçü birimi.
* `createdAt`: Kaydın oluşturulma zamanı.

### 7.3 FeedingRecord

Bir evcil hayvana gerçekleştirilen mama verme işlemini temsil eder.

```ts
interface FeedingRecord {
  id: string;
  petId: string;
  foodId: string;
  amount: number;
  dateTime: string;
  note?: string;
  createdAt: string;
}
```

Alanlar:

* `id`: Öğün kaydının benzersiz kimliği.
* `petId`: Öğünün hangi evcil hayvana ait olduğunu belirtir.
* `foodId`: Hangi mamanın kullanıldığını belirtir.
* `amount`: Verilen miktar.
* `dateTime`: Mamanın verildiği tarih ve saat.
* `note`: İsteğe bağlı kullanıcı notu.
* `createdAt`: Kaydın oluşturulma zamanı.

---

## 8. Veri İlişkileri

Bir evcil hayvanın birden fazla öğün kaydı olabilir.

Bir mama da birden fazla öğün kaydında kullanılabilir.

Temel veri ilişkisi:

```text
Pet 1 ----- N FeedingRecord N ----- 1 Food
```

Her öğün kaydı mutlaka bir evcil hayvana ve bir mamaya bağlıdır.

Evcil hayvan silindiğinde ona ait öğün kayıtları da silinir.

Bir mama geçmiş bir öğün kaydında kullanılmışsa silinmesine izin verilmez.

---

## 9. Ölçü Birimleri

Uygulama iki temel ölçü birimini destekler:

* g
* ml

Bu karar, yalnızca katı mama ile beslenen hayvanlarla sınırlı kalmamak amacıyla alınmıştır.

MVP kapsamında gram ve mililitre arasında otomatik dönüşüm yapılmaz.

Evcil hayvanın günlük hedef birimi ile öğünlerde kullanılan mamanın birimi uyumlu olmalıdır.

---

## 10. Günlük Beslenme Hesapları

Seçili evcil hayvanın bugün tükettiği toplam miktar, bugüne ait tüm öğün kayıtlarının miktarlarının toplamıdır.

Örneğin:

* 08:15 — 40 g
* 13:30 — 30 g
* 18:00 — 20 g

Bugünkü toplam tüketim:

90 g

Günlük hedef 120 g ise kalan miktar:

30 g

olarak gösterilir.

Günlük tamamlanma oranı, tüketilen toplam miktarın günlük hedefe oranıyla hesaplanır.

Günlük hedef aşılırsa negatif kalan miktar gösterilmez.

Örneğin:

* Günlük hedef: 120 g
* Tüketilen: 140 g

durumunda uygulama:

"20 g kaldı" veya "-20 g kaldı"

gibi bir değer göstermez.

Bunun yerine:

"Belirlenen günlük hedef 20 g aşıldı."

bilgisi gösterilir.

Bu yalnızca kullanıcının belirlediği hedefe göre yapılan sayısal bir karşılaştırmadır ve herhangi bir sağlık veya veterinerlik değerlendirmesi içermez.

---

## 11. Veri Saklama

MVP kapsamında backend veya gerçek bir veritabanı kullanılmayacaktır.

Veriler tarayıcıdaki localStorage alanında saklanacaktır.

Önerilen storage alanları:

```text
mama-tracker:pets
mama-tracker:foods
mama-tracker:feeding-records
mama-tracker:selected-pet-id
```

Bu yapı sayesinde kullanıcı sayfayı yenilediğinde oluşturduğu kayıtlar korunur.

---

## 12. MVP Dışında Bırakılan Özellikler

### Kullanıcı hesabı ve authentication

Login, register, şifre sıfırlama veya sosyal hesaplarla giriş özellikleri MVP kapsamında bulunmayacaktır.

Bu özellikler backend, kullanıcı yönetimi ve ek güvenlik gereksinimleri oluşturacağı için kapsam dışında bırakılmıştır.

### Backend ve gerçek veritabanı

Proje localStorage tabanlı çalışacaktır.

MVP'nin veri miktarı ve kullanım senaryosu için gerçek bir backend veya veritabanı gerekli görülmemiştir.

### Cloud senkronizasyonu

Farklı cihazlar arasında veri senkronizasyonu bulunmayacaktır.

Bu özellik kullanıcı hesabı ve backend altyapısı gerektirdiği için kapsam dışıdır.

### Birden fazla kullanıcı ve aile paylaşımı

Birden fazla kişinin aynı evcil hayvan profilini ortak kullanması MVP kapsamında bulunmayacaktır.

Uygulama tek kullanıcı ve tek cihaz üzerinde birden fazla evcil hayvanı takip edecek şekilde tasarlanacaktır.

### Push notification ve hatırlatıcılar

Öğün saatlerini hatırlatan bildirimler bulunmayacaktır.

Bildirim sistemi cihaz ve tarayıcı izinleri ile ek teknik altyapı gerektirdiği için sonraki geliştirmelere bırakılmıştır.

### Öğün planlama

Gelecekte yapılacak öğünleri önceden planlama özelliği bulunmayacaktır.

MVP, planlanan öğünlerden ziyade gerçekleşmiş beslenme işlemlerini takip etmeye odaklanır.

### Mama stok takibi

Paket içerisinde ne kadar mama kaldığı veya mamanın ne zaman biteceği takip edilmeyecektir.

Stok yönetimi, günlük beslenme takibinden farklı bir ürün problemi olduğu için kapsam dışında bırakılmıştır.

### Barkod veya QR kod okuma

Mama paketlerini kamera ile tarayarak otomatik ürün ekleme özelliği bulunmayacaktır.

Bu özellik kamera entegrasyonu ve ürün veritabanı gerektirdiği için MVP için gereksiz karmaşıklık oluşturur.

### AI ile mama önerisi

Uygulama kullanıcıya yapay zekâ ile mama önerisi sunmayacaktır.

Bu projenin amacı, AI özellikli bir ürün geliştirmekten ziyade AI araçlarını analiz, tasarım ve geliştirme sürecinde kullanmaktır.

### Otomatik porsiyon önerisi

Hayvanın yaşına, kilosuna veya türüne göre günlük mama miktarı önerilmeyecektir.

Günlük hedef kullanıcı tarafından manuel olarak belirlenecektir.

### Kalori ve besin değerleri

Kalori, protein, yağ veya diğer besin değerleri takip edilmeyecektir.

Bu özellik her mama için ek besin verisi gerektirdiği için MVP kapsamının dışında bırakılmıştır.

### Veteriner ve sağlık özellikleri

Uygulama sağlık değerlendirmesi, veteriner önerisi, hastalık takibi veya ilaç yönetimi yapmayacaktır.

### Kilo takibi

Evcil hayvanların kilo geçmişi tutulmayacaktır.

Kilo bilgisi mevcut MVP özellikleri içerisinde kullanılmadığı için veri modeline dahil edilmemiştir.

### Profil fotoğrafı

Evcil hayvanlar için fotoğraf yükleme özelliği bulunmayacaktır.

MVP'de hayvan türüne göre basit görsel veya ikon kullanılması yeterli görülmüştür.

### Gelişmiş analytics

Haftalık veya aylık grafikler, ortalama tüketim ve benzeri gelişmiş analiz özellikleri bulunmayacaktır.

MVP'nin önceliği bugünkü beslenme durumunu hızlı şekilde göstermek ve basit geçmiş takibi sağlamaktır.

### Gelişmiş tarih filtreleme

Özel tarih aralıkları, son 7 gün veya son 30 gün gibi gelişmiş filtreleme seçenekleri bulunmayacaktır.

Geçmiş kayıtlar tarih bazında basit bir liste olarak gösterilecektir.

---

## 13. MVP Başarı Kriterleri

MVP aşağıdaki koşulları sağladığında temel ürün hedefini gerçekleştirmiş kabul edilecektir:

1. Kullanıcı bir veya birden fazla evcil hayvan ekleyebilmelidir.
2. Kullanıcı kullandığı mamaları tanımlayabilmelidir.
3. Kullanıcı yeni bir öğün kaydını hızlı şekilde oluşturabilmelidir.
4. Kullanıcı seçili hayvanın bugün mama yiyip yemediğini görebilmelidir.
5. Kullanıcı hayvanın bugün toplam ne kadar tükettiğini görebilmelidir.
6. Kullanıcı günlük hedefe kalan miktarı veya hedefin aşılma miktarını görebilmelidir.
7. Kullanıcı en son ne zaman ve hangi mamayla besleme yapıldığını görebilmelidir.
8. Kullanıcı geçmiş öğün kayıtlarını görüntüleyebilmelidir.
9. Veriler sayfa yenilendikten sonra korunmalıdır.
10. Uygulama mobil ve masaüstü ekranlarda kullanılabilir olmalıdır.

Ana ekran kullanıcıya özellikle şu üç sorunun cevabını hızlı şekilde vermelidir:

* Bugün mama verildi mi?
* Bugün ne kadar tüketildi?
* Günlük hedefin ne kadarı tamamlandı?
