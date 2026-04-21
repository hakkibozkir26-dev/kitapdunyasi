/**
 * data.js - 11 SAP tablosu (Hardcoded Data).
 * SRP: Ham veri kaynağı.
 */

export const sap_data = {
    countries: [
        { id: 'TR', name: 'Türkiye' }
    ],
    states: [
        { id: 'ES', name: 'Eskişehir', countryId: 'TR' },
        { id: 'IST', name: 'İstanbul', countryId: 'TR' },
        { id: 'ANK', name: 'Ankara', countryId: 'TR' },
        { id: 'IZM', name: 'İzmir', countryId: 'TR' },
        { id: 'ANT', name: 'Antalya', countryId: 'TR' },
        { id: 'BUR', name: 'Bursa', countryId: 'TR' }
    ],
    cities: [
        { id: 'TEP', name: 'Tepebaşı', stateId: 'ES' },
        { id: 'ODU', name: 'Odunpazarı', stateId: 'ES' },
        { id: 'KAD', name: 'Kadıköy', stateId: 'IST' },
        { id: 'BES', name: 'Beşiktaş', stateId: 'IST' },
        { id: 'CAN', name: 'Çankaya', stateId: 'ANK' },
        { id: 'KON', name: 'Konak', stateId: 'IZM' },
        { id: 'FIN', name: 'Finike', stateId: 'ANT' },
        { id: 'NIL', name: 'Nilüfer', stateId: 'BUR' }
    ],
    streets: [
        { id: 'ST1', name: 'Atatürk Bulv.', cityId: 'TEP' },
        { id: 'ST2', name: 'Cumhuriyet Cad.', cityId: 'ODU' },
        { id: 'ST3', name: 'Bağdat Cad.', cityId: 'KAD' },
        { id: 'ST4', name: 'Barbaros Bulv.', cityId: 'BES' },
        { id: 'ST5', name: 'Tunalı Hilmi', cityId: 'CAN' },
        { id: 'ST6', name: 'Kordon', cityId: 'KON' },
        { id: 'ST7', name: 'Sahil Yolu', cityId: 'FIN' },
        { id: 'ST8', name: 'Fethiye Cad.', cityId: 'NIL' }
    ],
    addresses: [
        { id: 'ADDR1', streetId: 'ST1', houseNo: '12', flatNo: '4' },
        { id: 'ADDR2', streetId: 'ST2', houseNo: '45', flatNo: '1' },
        { id: 'ADDR3', streetId: 'ST3', houseNo: '102', flatNo: '15' },
        { id: 'ADDR4', streetId: 'ST4', houseNo: '5', flatNo: '8' },
        { id: 'ADDR5', streetId: 'ST5', houseNo: '12-A', flatNo: '2' },
        { id: 'ADDR6', streetId: 'ST6', houseNo: '88', flatNo: '1' },
        { id: 'ADDR7', streetId: 'ST7', houseNo: '2', flatNo: '1' },
        { id: 'ADDR8', streetId: 'ST8', houseNo: '11', flatNo: '12' }
    ],
    authors: [
        { id: 'A1', name: 'Orhan Pamuk', bio: 'Nobel ödüllü yazar.', bio_long: '2006 yılında Nobel Edebiyat Ödülü alan ilk Türk yazardır.', image: 'https://picsum.photos/seed/orhan/200/200' },
        { id: 'A2', name: 'Elif Şafak', bio: 'Modern edebiyatın güçlü sesi.', bio_long: 'Eserleri kırktan fazla dile çevrilmiştir.', image: 'https://picsum.photos/seed/elif/200/200' },
        { id: 'A3', name: 'Sabahattin Ali', bio: 'Türk edebiyatı klasiği.', bio_long: 'Toplumcu gerçekçi edebiyatın öncülerindendir.', image: 'https://picsum.photos/seed/ali/200/200' },
        { id: 'A4', name: 'Doğan Cüceloğlu', bio: 'Psikolog ve yazar.', bio_long: 'Kişisel gelişim ve psikoloji alanında pek çok eser vermiştir.', image: 'https://picsum.photos/seed/dogan/200/200' },
        { id: 'A5', name: 'Aziz Nesin', bio: 'Mizah ustası.', bio_long: 'Dünya çapında tanınan Türk mizah yazarıdır.', image: 'https://picsum.photos/seed/aziz/200/200' },
        { id: 'A6', name: 'İlber Ortaylı', bio: 'Tarihçi.', bio_long: 'Önde gelen Türk tarih profesörü ve akademisyendir.', image: 'https://picsum.photos/seed/ilber/200/200' },
        { id: 'A7', name: 'Ahmet Ümit', bio: 'Polisiye yazarı.', bio_long: 'Türk polisiye edebiyatının en önemli isimlerindendir.', image: 'https://picsum.photos/seed/ahmet/200/200' },
        { id: 'A8', name: 'Paulo Coelho', bio: 'Global fenomen.', bio_long: 'Simyacı kitabının efsanevi yazarı.', image: 'https://picsum.photos/seed/paulo/200/200' },
        { id: 'A9', name: 'Fyodor Dostoyevski', bio: 'Rus klasiği.', bio_long: 'Dünya edebiyat tarihinin en büyük romancılarındandır.', image: 'https://picsum.photos/seed/fyodor/200/200' },
        { id: 'A10', name: 'Antoine de Saint-Exupéry', bio: 'Küçük Prens\'in yazarı.', bio_long: 'Fransız pilot ve yazar.', image: 'https://picsum.photos/seed/antoine/200/200' }
    ],
    publishers: [
        { id: 'P1', name: 'Yapı Kredi Yayınları' },
        { id: 'P2', name: 'Can Yayınları' },
        { id: 'P3', name: 'İş Bankası Kültür' },
        { id: 'P4', name: 'Kronik Kitap' },
        { id: 'P5', name: 'Kırmızı Kedi' },
        { id: 'P6', name: 'Doğan Kitap' },
        { id: 'P7', name: 'Epsilon' },
        { id: 'P8', name: 'Remzi Kitabevi' }
    ],
    books: [
        { id: 'B1', title: 'Masumiyet Müzesi', authorId: 'A1', publisherId: 'P1', date: '20080829', price: 125, desc: 'Aşk ve nostalji üzerine bir başyapıt.', emoji: '📖', category: 'Roman', stock: 45, pages: 592 },
        { id: 'B2', title: 'İstanbul Hatıralar', authorId: 'A1', publisherId: 'P1', date: '20030101', price: 95, desc: 'Pamuk\'un kendi şehriyle hesaplaşması.', emoji: '🏙️', category: 'Anı', stock: 12, pages: 440 },
        { id: 'B3', title: 'Benim Adım Kırmızı', authorId: 'A1', publisherId: 'P1', date: '19980101', price: 145, desc: 'Tarihi bir cinayet ve minyatür sanatı.', emoji: '🎨', category: 'Roman', stock: 23, pages: 472 },
        { id: 'B4', title: 'Aşk', authorId: 'A2', publisherId: 'P6', date: '20090307', price: 110, desc: 'Mevlana ve Şems üzerine modern bir hikaye.', emoji: '🌹', category: 'Roman', stock: 100, pages: 420 },
        { id: 'B5', title: '10 Minutes 38 Seconds', authorId: 'A2', publisherId: 'P6', date: '20190606', price: 130, desc: 'İstanbul ufkunda bir hayat hikayesi.', emoji: '⏱️', category: 'Roman', stock: 54, pages: 312 },
        { id: 'B6', title: 'Havada Bulut', authorId: 'A3', publisherId: 'P2', date: '19430101', price: 38, desc: 'Sait Faik tarzı hikayeler.', emoji: '☁️', category: 'Roman', stock: 99, pages: 120 },
        { id: 'B7', title: 'Kürk Mantolu Madonna', authorId: 'A3', publisherId: 'P3', date: '19430101', price: 45, desc: 'Unutulmaz bir imkansız aşk hikayesi.', emoji: '🧥', category: 'Klasik', stock: 210, pages: 160 },
        { id: 'B8', title: 'İçimdeki Ses', authorId: 'A4', publisherId: 'P8', date: '19950101', price: 85, desc: 'Kendini keşfetme rehberi.', emoji: '🧠', category: 'Psikoloji', stock: 33, pages: 320 },
        { id: 'B9', title: 'İçimizdeki Çocuk', authorId: 'A4', publisherId: 'P8', date: '19920101', price: 78, desc: 'Geçmişin yüklerinden kurtulmak.', emoji: '🧒', category: 'Psikoloji', stock: 15, pages: 280 },
        { id: 'B10', title: 'İnsan İnsana', authorId: 'A4', publisherId: 'P8', date: '19910101', price: 82, desc: 'İletişim sanatı üzerine.', emoji: '🤝', category: 'Psikoloji', stock: 40, pages: 250 },
        { id: 'B11', title: 'Simyacı', authorId: 'A8', publisherId: 'P2', date: '19880101', price: 65, desc: 'Kendi efsanesini bulma yolculuğu.', emoji: '⚗️', category: 'Roman', stock: 150, pages: 184 },
        { id: 'B12', title: 'On Bir Dakika', authorId: 'A8', publisherId: 'P2', date: '20030101', price: 92, desc: 'Bedensel ve ruhsal keşif.', emoji: '⌛', category: 'Roman', stock: 42, pages: 350 },
        { id: 'B13', title: 'Türklerin Tarihi', authorId: 'A6', publisherId: 'P4', date: '20150101', price: 115, desc: 'Orta Asya\'dan Avrupa\'ya yolculuk.', emoji: '🏹', category: 'Tarih', stock: 88, pages: 480 },
        { id: 'B14', title: 'Osmanlı\'yı Yeniden Keşfetmek', authorId: 'A6', publisherId: 'P4', date: '20060101', price: 88, desc: 'İmparatorluğun gerçek yüzü.', emoji: '🏺', category: 'Tarih', stock: 12, pages: 240 },
        { id: 'B15', title: 'Suç ve Ceza', authorId: 'A9', publisherId: 'P3', date: '18660101', price: 155, desc: 'Raskolnikov ve vicdan muhasebesi.', emoji: '⚖️', category: 'Klasik', stock: 55, pages: 700 },
        { id: 'B16', title: 'Karamazov Kardeşler', authorId: 'A9', publisherId: 'P3', date: '18800101', price: 165, desc: 'Baba katilliği ve inanç sorgulaması.', emoji: '⛪', category: 'Klasik', stock: 22, pages: 900 },
        { id: 'B17', title: 'Yaşar Ne Yaşar Ne Yaşamaz', authorId: 'A5', publisherId: 'P5', date: '19770101', price: 58, desc: 'Bürokrasi ve toplum eleştirisi.', emoji: '🛂', category: 'Mizah', stock: 74, pages: 330 },
        { id: 'B18', title: 'Beyoğlu Rapsodisi', authorId: 'A7', publisherId: 'P1', date: '20030101', price: 105, desc: 'Üç arkadaşın gizemli hikayesi.', emoji: '🔍', category: 'Polisiye', stock: 19, pages: 400 },
        { id: 'B19', title: 'Sefiller', authorId: 'A10', publisherId: 'P3', date: '18620101', price: 140, desc: 'Jean Valjean ve adalet kavgası.', emoji: '🥖', category: 'Klasik', stock: 10, pages: 800 },
        { id: 'B20', title: 'Küçük Prens', authorId: 'A10', publisherId: 'P2', date: '19430101', price: 42, desc: 'Gözle görülmeyenler üzerine.', emoji: '🤴', category: 'Klasik', stock: 300, pages: 110 }
    ],
    customers: [
        { id: 'C1', name: 'Ayşe Yılmaz', phone: '05321112233', addressId: 'ADDR1' },
        { id: 'C2', name: 'Mehmet Demir', phone: '05334445566', addressId: 'ADDR2' },
        { id: 'C3', name: 'Fatma Kaya', phone: '05427778899', addressId: 'ADDR3' },
        { id: 'C4', name: 'Ali Öztürk', phone: '05051112233', addressId: 'ADDR4' },
        { id: 'C5', name: 'Zeynep Arslan', phone: '05329990011', addressId: 'ADDR5' },
        { id: 'C6', name: 'Emre Şahin', phone: '05332223344', addressId: 'ADDR6' },
        { id: 'C7', name: 'Elif Çelik', phone: '05445556677', addressId: 'ADDR7' },
        { id: 'C8', name: 'Burak Aydın', phone: '05018889900', addressId: 'ADDR8' }
    ],
    orders: [
        { id: 'ORD1', customerId: 'C1', date: '20240410', status: 'T' },
        { id: 'ORD2', customerId: 'C2', date: '20240411', status: 'T' },
        { id: 'ORD3', customerId: 'C3', date: '20240412', status: 'K' },
        { id: 'ORD4', customerId: 'C4', date: '20240413', status: 'H' },
        { id: 'ORD5', customerId: 'C5', date: '20240414', status: 'T' },
        { id: 'ORD6', customerId: 'C6', date: '20240415', status: 'K' },
        { id: 'ORD7', customerId: 'C7', date: '20240416', status: 'H' },
        { id: 'ORD8', customerId: 'C8', date: '20240417', status: 'T' },
        { id: 'ORD9', customerId: 'C1', date: '20240418', status: 'H' }
    ],
    orderItems: [
        { id: 'OI1', orderId: 'ORD1', bookId: 'B1', qty: 1, price: 125 },
        { id: 'OI2', orderId: 'ORD1', bookId: 'B7', qty: 2, price: 45 },
        { id: 'OI3', orderId: 'ORD2', bookId: 'B4', qty: 1, price: 110 },
        { id: 'OI4', orderId: 'ORD3', bookId: 'B15', qty: 1, price: 155 },
        { id: 'OI5', orderId: 'ORD4', bookId: 'B20', qty: 5, price: 42 },
        { id: 'OI6', orderId: 'ORD5', bookId: 'B13', qty: 1, price: 115 },
        { id: 'OI7', orderId: 'ORD5', bookId: 'B8', qty: 1, price: 85 },
        { id: 'OI8', orderId: 'ORD6', bookId: 'B11', qty: 2, price: 65 },
        { id: 'OI9', orderId: 'ORD7', bookId: 'B18', qty: 1, price: 105 },
        { id: 'OI10', orderId: 'ORD8', bookId: 'B19', qty: 1, price: 140 },
        { id: 'OI11', orderId: 'ORD9', bookId: 'B2', qty: 1, price: 95 }
    ]
};
