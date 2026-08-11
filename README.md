# Mama Takip

Mama Takip, bir veya birden fazla evcil hayvanın günlük beslenmesini takip etmek için geliştirilmiş React ve TypeScript tabanlı bir web uygulamasıdır.

Uygulama; gün içerisinde hangi evcil hayvana, hangi mamadan, ne kadar ve ne zaman verildiğinin kaydedilmesini sağlar. Günlük tüketim hedefleri takip edilebilir, geçmiş öğünler görüntülenebilir ve kullanılan mamalar yönetilebilir.

## Özellikler

### Günlük Beslenme Takibi

Her evcil hayvan için günlük beslenme hedefi tanımlanabilir. Bugün ekranında:

* gün içerisinde tüketilen toplam miktar,
* günlük hedef,
* kalan miktar,
* hedefin tamamlanma yüzdesi,
* son öğün,
* gün içerisindeki tüm öğünler

görüntülenebilir.

Günlük hedef aşıldığında uygulama kalan miktar yerine hedefin ne kadar aşıldığını gösterir.

### Öğün Yönetimi

Kullanıcı yeni bir öğün kaydı oluşturabilir.

Her öğünde:

* evcil hayvan,
* kullanılan mama,
* miktar,
* tarih,
* saat,
* isteğe bağlı not

kaydedilebilir.

Mevcut öğünler düzenlenebilir veya silinebilir.

### Birden Fazla Evcil Hayvan

Uygulamaya birden fazla evcil hayvan eklenebilir ve takip edilen hayvanlar arasında geçiş yapılabilir.

Her evcil hayvan için:

* ad,
* tür,
* günlük beslenme hedefi,
* ölçü birimi

tanımlanabilir.

Ölçü birimi olarak `g` ve `ml` desteklenmektedir.

### Mama Yönetimi

Kullanılan mamalar uygulama içerisinde ayrıca yönetilebilir.

Her mama için:

* mama adı,
* marka,
* mama tipi,
* ölçü birimi

tanımlanabilir.

Veri tutarlılığını korumak için daha önce bir öğün kaydında kullanılan mama silinemez ve ölçü birimi değiştirilemez.

### Beslenme Geçmişi

Geçmiş ekranında öğün kayıtları tarihe göre gruplanır.

Her gün için:

* günlük toplam tüketim,
* öğün saatleri,
* tüketilen miktarlar,
* kullanılan mamalar,
* varsa öğün notları

görüntülenebilir.

Geçmiş kayıtlar bu ekran üzerinden de düzenlenebilir.

### Veri Saklama

Uygulama MVP kapsamında herhangi bir backend veya uzak veritabanı kullanmaz.

Veriler tarayıcının `localStorage` alanında saklanır. Bu nedenle sayfa yenilendiğinde eklenen evcil hayvanlar, mamalar ve öğün kayıtları korunur.

## Ekran Görüntüleri

### Bugün

![Mama Takip Dashboard](docs/screenshots/01-dashboard.png)

Günlük beslenme durumu, hedef ilerlemesi, son öğün ve gün içerisindeki öğünler bu ekranda görüntülenir.

### Öğün Ekleme

![Mama Verildi Formu](docs/screenshots/02-feeding-form.png)

Yeni bir öğün kaydı oluşturulurken evcil hayvan, mama, miktar, tarih, saat ve isteğe bağlı not bilgileri girilebilir.

### Beslenme Geçmişi

![Beslenme Geçmişi](docs/screenshots/03-history.png)

Önceki öğünler tarihlere göre gruplanır ve her günün toplam tüketimi gösterilir.

### Evcil Hayvan Yönetimi

![Evcil Hayvan Yönetimi](docs/screenshots/04-pet-management.png)

Birden fazla evcil hayvan eklenebilir ve her hayvan için günlük beslenme hedefi tanımlanabilir.

## Kullanılan Teknolojiler

* React
* TypeScript
* Vite
* CSS
* ESLint
* Browser Local Storage
* Git
* GitHub

Proje mümkün olduğunca basit bir MVP mimarisiyle geliştirilmiştir. Backend, authentication veya harici veritabanı kullanılmamıştır.

## Kurulum

Projeyi bilgisayarınıza klonlayın:

```bash
git clone https://github.com/AlazHamsioglu/mama-takip.git
```

Proje dizinine girin:

```bash
cd mama-takip
```

Bağımlılıkları yükleyin:

```bash
npm install
```

Development server'ı başlatın:

```bash
npm run dev
```

Terminalde gösterilen local development adresini tarayıcıda açarak uygulamayı kullanabilirsiniz.

## Kullanılabilir Komutlar

Development server:

```bash
npm run dev
```

ESLint kontrolü:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Production build'i yerel olarak önizlemek için:

```bash
npm run preview
```

## Temel Veri Modeli

Uygulama üç temel veri modeli üzerine kurulmuştur:

```text
Pet
 │
 ▼
FeedingRecord
 ▲
 │
Food
```

### Pet

Takip edilen evcil hayvanı temsil eder.

Temel bilgiler:

* benzersiz ID
* ad
* tür
* günlük hedef
* ölçü birimi

### Food

Öğünlerde kullanılan mamayı temsil eder.

Temel bilgiler:

* benzersiz ID
* mama adı
* marka
* mama tipi
* ölçü birimi

### FeedingRecord

Bir beslenme olayını temsil eder.

Her kayıt:

* bir evcil hayvana,
* bir mamaya,
* miktara,
* tarih ve saate

bağlıdır.

Evcil hayvan ve mama isimleri FeedingRecord içerisinde kopyalanmaz. Bunun yerine `petId` ve `foodId` kullanılır.

## Temel İş Kuralları

Uygulamada veri tutarlılığını korumak için aşağıdaki kurallar uygulanmaktadır:

* Öğün miktarı sıfırdan büyük olmalıdır.
* Her öğün bir evcil hayvana bağlı olmalıdır.
* Her öğün bir mamaya bağlı olmalıdır.
* Evcil hayvan ve mama aynı ölçü birimini kullanmalıdır.
* `g` hedefli hayvanlarda yalnızca `g` birimli mamalar kullanılabilir.
* `ml` hedefli hayvanlarda yalnızca `ml` birimli mamalar kullanılabilir.
* Kullanılmış bir mamanın ölçü birimi değiştirilemez.
* Öğün kayıtlarında kullanılan mama silinemez.
* Bir evcil hayvan silindiğinde ona ait öğün kayıtları da silinir.
* Günlük tüketim hedefi aşılabilir ancak kalan miktar negatif gösterilmez.

## Proje Yapısı

Temel kaynak kod organizasyonu:

```text
src/
├── components/
│   ├── layout/
│   │   └── BottomNavigation.tsx
│   ├── FeedingForm.tsx
│   ├── FoodForm.tsx
│   └── PetForm.tsx
│
├── pages/
│   ├── TodayPage.tsx
│   ├── HistoryPage.tsx
│   ├── PetsPage.tsx
│   └── FoodsPage.tsx
│
├── data/
│   └── mockData.ts
│
├── types/
│   └── ...
│
├── utils/
│   ├── date.ts
│   ├── feeding.ts
│   └── storage.ts
│
├── App.tsx
├── App.css
└── main.tsx
```

`components` tekrar kullanılabilen arayüz parçalarını ve formları, `pages` ana uygulama ekranlarını, `utils` ise veri saklama, hesaplama ve tarih işlemleri gibi yardımcı fonksiyonları içerir.

## MVP Kapsamı

Bu proje çalışan bir MVP oluşturmak amacıyla geliştirilmiştir.

Bu nedenle aşağıdaki özellikler mevcut kapsamın dışında bırakılmıştır:

* kullanıcı hesabı ve authentication,
* backend API,
* uzak veritabanı,
* farklı cihazlar arasında veri senkronizasyonu,
* push notification,
* beslenme hatırlatmaları,
* cloud backup,
* gelişmiş istatistik ve grafikler.

Bu özellikler uygulamanın gelecekteki sürümlerinde geliştirilebilir.

## Yapay Zekâ Kullanımı

Proje geliştirme sürecinde yapay zekâ; gereksinim analizi, kapsam planlaması, veri modelleme, kod geliştirme desteği, hata çözümü ve test senaryolarının hazırlanması amacıyla kullanılmıştır.

AI kullanımının daha ayrıntılı açıklaması için:

`docs/ai-kullanim-notu.md`

dosyasına bakabilirsiniz.

## Dokümantasyon

Projenin analiz, tasarım ve geliştirme sürecine ilişkin ek dokümanlar `docs/` dizini altında bulunmaktadır.

## Durum

MVP kapsamında planlanan temel özellikler tamamlanmıştır.

Uygulamanın lint ve production build kontrolleri gerçekleştirilmiş ve temel kullanıcı akışları manuel olarak test edilmiştir.