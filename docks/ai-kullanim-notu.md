# AI Kullanım Notu

Bu proje geliştirilirken yapay zekâ, analiz, planlama, teknik kararların değerlendirilmesi, kod geliştirme desteği ve hata çözümü amacıyla kullanılmıştır. Projenin kapsamı, uygulanacak özellikler ve nihai ürün kararları geliştirici tarafından değerlendirilmiş ve onaylanmıştır.

## 1. Gereksinim Analizi ve Planlama

Proje başlangıcında verilen gereksinimler yapay zekâ desteğiyle analiz edilmiştir. Gereksinimler işlevsel parçalara ayrılmış ve geliştirme sürecinin adım adım ilerleyebilmesi için bir uygulama planı hazırlanmıştır.

Bu aşamada özellikle MVP kapsamının belirlenmesi üzerinde çalışılmıştır. Projenin temel amacı, yalnızca kullanılan mamaların kaydedildiği bir sistem yerine evcil hayvanların günlük beslenmesinin takip edilebildiği bir uygulama olarak ele alınmıştır.

Kullanıcının şu sorulara cevap alabilmesi temel hedef olarak belirlenmiştir:

* Evcil hayvan bugün ne kadar mama yedi?
* En son ne zaman mama verildi?
* Günlük beslenme hedefinin ne kadarı tamamlandı?
* Günlük hedefe ulaşmak için ne kadar mama kaldı?
* Hangi mama kullanıldı?
* Geçmiş günlerde ne kadar ve hangi saatlerde mama verildi?

Ayrıca birden fazla evcil hayvanın aynı uygulama içerisinde takip edilebilmesi MVP kapsamına dahil edilmiştir.

## 2. Ürün ve Kapsam Kararları

Yapay zekâ, farklı uygulama seçeneklerinin avantaj ve dezavantajlarını değerlendirmek amacıyla kullanılmıştır. Nihai kapsam kararları geliştirici tarafından verilmiştir.

Projenin gereksiz şekilde büyümemesi için kullanıcı hesabı, authentication, backend servisleri, uzak veritabanı, bildirim sistemi ve benzeri production seviyesindeki özellikler MVP kapsamı dışında bırakılmıştır.

Verilerin tarayıcı üzerinde localStorage kullanılarak saklanmasına karar verilmiştir. Böylece uygulamanın temel kullanım senaryoları backend gerektirmeden gerçekleştirilebilmiştir.

Evcil hayvanların günlük tüketim hedeflerinde hem `g` hem de `ml` ölçü birimleri desteklenmiştir. Böylece yalnızca katı gıda ile beslenen hayvanlarla sınırlı olmayan bir veri modeli oluşturulmuştur.

## 3. Veri Modeli ve İş Kuralları

Pet, Food ve FeedingRecord modellerinin oluşturulmasında yapay zekâdan veri modelleme desteği alınmıştır.

Temel ilişki aşağıdaki şekilde tasarlanmıştır:

Pet → FeedingRecord ← Food

Bir FeedingRecord kaydı, hangi evcil hayvanın hangi mamadan ne kadar ve ne zaman tükettiğini temsil etmektedir.

Öğün kayıtlarında evcil hayvan veya mama isimlerini doğrudan saklamak yerine `petId` ve `foodId` kullanılmıştır. Böylece evcil hayvan veya mama bilgileri sonradan güncellendiğinde mevcut öğün kayıtlarının ilişkileri korunmuştur.

Veri tutarlılığını korumak amacıyla bazı ek iş kuralları belirlenmiştir:

* Mama miktarı sıfırdan büyük olmalıdır.
* Bir öğün bir evcil hayvana ve bir mamaya bağlı olmalıdır.
* Evcil hayvanın ölçü birimi ile mamanın ölçü birimi uyumlu olmalıdır.
* `g` hedefli bir hayvan için yalnızca `g` birimli mamalar kullanılabilir.
* `ml` hedefli bir hayvan için yalnızca `ml` birimli mamalar kullanılabilir.
* Kullanılmış bir mamanın ölçü birimi sonradan değiştirilemez.
* Öğün kayıtlarında kullanılan bir mama doğrudan silinemez.
* Bir evcil hayvan silindiğinde o hayvana ait öğün kayıtları da silinir.

## 4. Arayüz ve Kullanıcı Akışı

Uygulamanın ekran yapısının ve temel kullanıcı akışlarının oluşturulmasında yapay zekâdan fikir ve uygulama desteği alınmıştır.

Uygulama dört temel bölüme ayrılmıştır:

* Bugün
* Geçmiş
* Evcil Hayvanlar
* Mamalar

Bugün ekranı, uygulamanın ana kullanım ekranı olarak tasarlanmıştır. Kullanıcı burada seçili evcil hayvanın günlük tüketimini, hedefini, kalan miktarı, ilerleme oranını, son öğününü ve gün içerisindeki öğünlerini görüntüleyebilir.

Geçmiş ekranında öğün kayıtları günlere göre gruplanmış ve her günün toplam tüketimi gösterilmiştir.

Evcil Hayvanlar ve Mamalar ekranlarında ilgili kayıtların ekleme, görüntüleme, düzenleme ve uygun durumlarda silme işlemleri gerçekleştirilmiştir.

## 5. Kod Geliştirme Desteği

React ve TypeScript implementasyonu sırasında yapay zekâdan kod üretimi ve mevcut kodun geliştirilmesi için destek alınmıştır.

Özellikle aşağıdaki alanlarda yapay zekâ desteği kullanılmıştır:

* React component yapılarının oluşturulması
* TypeScript type tanımları
* localStorage yardımcı fonksiyonları
* öğün ekleme ve düzenleme formları
* evcil hayvan yönetimi
* mama yönetimi
* günlük tüketim hesaplamaları
* progress hesaplamaları
* tarih ve saat formatlama
* geçmiş kayıtların tarihe göre gruplanması
* responsive arayüz düzenlemeleri
* form validation
* empty state yönetimi

Üretilen kod doğrudan nihai kabul edilmemiş; proje içerisinde çalıştırılarak kontrol edilmiş ve gerekli durumlarda değiştirilmiştir.

## 6. Hata Çözümü ve Refactoring

Geliştirme sırasında karşılaşılan teknik problemlerin analizinde de yapay zekâ desteği kullanılmıştır.

Örneğin ESLint tarafından bildirilen React `setState` kullanım problemi değerlendirilmiştir. State'in `useEffect` içerisinde senkron şekilde oluşturulması yerine localStorage verilerinin `useState` lazy initializer kullanılarak başlangıç state'i olarak yüklenmesi tercih edilmiştir.

Ayrıca geliştirme ilerledikçe component içerisindeki bazı hesaplamalar utility fonksiyonlarına taşınmıştır. Günlük toplam, kalan miktar, hedef aşımı, ilerleme yüzdesi, tarih bazlı gruplama ve sıralama gibi işlemler tekrar kullanılabilir yardımcı fonksiyonlar haline getirilmiştir.

## 7. Test ve Doğrulama

Yapay zekâ desteğiyle uygulamanın temel kullanıcı akışlarını kapsayan manuel bir test planı hazırlanmıştır.

Kontrol edilen başlıca senaryolar şunlardır:

* yeni öğün oluşturma
* öğün düzenleme
* öğün silme
* evcil hayvan değiştirme
* evcil hayvan ekleme, düzenleme ve silme
* mama ekleme, düzenleme ve silme
* kullanılan mamanın silinmesinin engellenmesi
* `g` ve `ml` uyumluluğu
* günlük hedefin aşılması
* geçmiş kayıtların gruplanması
* boş veri durumları
* localStorage persistence
* responsive görünüm
* lint ve production build kontrolleri

Testler sonucunda uygulamanın temel MVP fonksiyonlarının beklendiği şekilde çalıştığı doğrulanmıştır.

## 8. Geliştiricinin Rolü

Yapay zekâ bu projede bir geliştirme ve karar destek aracı olarak kullanılmıştır.

Projenin kapsamının belirlenmesi, önerilerin değerlendirilmesi, hangi özelliklerin MVP'ye dahil edileceği, hangi özelliklerin kapsam dışında bırakılacağı ve teknik önerilerin uygulanıp uygulanmayacağı geliştirici tarafından kararlaştırılmıştır.

Geliştirme süreci adım adım yürütülmüş ve her önemli aşamadan sonra sonuç değerlendirilerek bir sonraki aşamaya geçilmiştir. Yapay zekâ tarafından önerilen çözümler uygulama içerisinde çalıştırılmış, lint ve build kontrollerinden geçirilmiş ve manuel kullanıcı senaryolarıyla test edilmiştir.

Bu nedenle yapay zekâ proje boyunca aktif olarak kullanılmış olsa da ürün kapsamı, stratejik kararlar, doğrulama ve nihai uygulama sorumluluğu geliştiricide kalmıştır.
