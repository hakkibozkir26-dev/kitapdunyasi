/**
 * adminView.js - Dashboard ve SAP eşleştirme.
 */
import { el } from '../utils/dom.js';
import { getStats } from '../models/orderModel.js';
import { getReviews } from '../models/reviewModel.js';
import { getFavs } from '../models/favModel.js';
import { formatPrice } from '../utils/format.js';
import { sap_data } from '../models/data.js';
import { renderConfirmModal } from './admin/confirmModalView.js';

export const renderAdmin = () => {
    const stats = getStats();
    const reviews = getReviews();
    const favs = getFavs();

    const statCards = [
        { label: 'Toplam Kitap', value: stats.bookCount, icon: '📚' },
        { label: 'Toplam Yazar', value: stats.authorCount, icon: '✍️' },
        { label: 'Sipariş Sayısı', value: stats.orderCount, icon: '📦' },
        { label: 'Toplam Ciro', value: formatPrice(stats.ciro), icon: '💰' },
        { label: 'Müşteri Sayısı', value: stats.customerCount, icon: '👥' },
        { label: 'Yayınevi Sayısı', value: stats.publisherCount, icon: '🏢' },
        { label: 'Yorum Sayısı', value: reviews.length, icon: '💬' },
        { label: 'Favori Etkileşimi', value: favs.length, icon: '❤' },
        { label: 'Şehir Sayısı', value: sap_data.cities.length, icon: '🌆' },
        { label: 'Ort. Puan', value: reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : 0, icon: '⭐' },
        { label: 'Stok Durumu', value: 'Kritik (5)', icon: '⚠️' },
        { label: 'Aktif Kullanıcı', value: 1, icon: '⚡' }
    ];

    return el('div', { className: 'admin-panel' }, [
        el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' } }, [
            el('h1', {}, ['Yönetim Paneli']),
            el('button', { 
                className: 'btn btn-primary',
                onclick: () => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sap_data));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    downloadAnchorNode.setAttribute("download", "kitap_dunyasi_sap_export.json");
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                }
            }, ['JSON Veriyi Dışa Aktar'])
        ]),
        
        el('div', { 
            className: 'admin-stats'
        }, statCards.map(s => el('div', {
            className: 'book-card',
            style: { textAlign: 'center', height: 'auto', padding: '1.5rem' }
        }, [
            el('div', { style: { fontSize: '2rem', marginBottom: '0.5rem' } }, [s.icon]),
            el('div', { style: { fontSize: '1.5rem', fontWeight: '800' } }, [s.value]),
            el('div', { style: { color: 'var(--text-muted)', fontSize: '0.8rem' } }, [s.label])
        ]))),

        el('h2', { style: { marginBottom: '1rem' } }, ['SAP Tablo Eşleştirme (Entity Mapping)']),
        el('div', { style: { overflowX: 'auto' } }, [
            el('table', { style: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'var(--bg-white)', borderRadius: '8px', overflow: 'hidden' } }, [
                el('thead', {}, [
                    el('tr', { style: { background: 'var(--primary)', color: 'white' } }, [
                        el('th', { style: { padding: '12px' } }, ['Tablo Adı']),
                        el('th', { style: { padding: '12px' } }, ['Entity TIpi']),
                        el('th', { style: { padding: '12px' } }, ['Kayıt']),
                        el('th', { style: { padding: '12px' } }, ['FK Bağımlılıkları'])
                    ])
                ]),
                el('tbody', {}, Object.entries(sap_data).map(([key, value]) => el('tr', { style: { borderBottom: '1px solid var(--border)' } }, [
                    el('td', { style: { padding: '12px', fontWeight: 'bold' } }, [key.toUpperCase()]),
                    el('td', { style: { padding: '12px' } }, [Array.isArray(value) ? 'Master/Trans' : 'Object']),
                    el('td', { style: { padding: '12px' } }, [value.length || 0]),
                    el('td', { style: { padding: '12px' } }, [
                        key === 'addresses' ? 'StreetId' : 
                        key === 'streets' ? 'CityId' : 
                        key === 'books' ? 'AuthorId, PublisherId' :
                        key === 'orders' ? 'CustomerId' : 'None'
                    ])
                ])))
            ])
        ]),
        el('div', { className: 'admin-actions', style: { marginTop: '2rem', display: 'flex', gap: '1rem' } }, [
            el('button', { 
                className: 'btn', 
                style: { background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' },
                onclick: () => {
                    renderConfirmModal({
                        title: 'Tüm Verileri Sıfırla',
                        message: 'Tüm yaptığınız değişiklikler (kitaplar, yazarlar, siparişler vb.) silinecek ve orijinal verilere dönülecek. Emin misiniz?',
                        onConfirm: () => {
                            ['kd_books', 'kd_authors', 'kd_publishers', 'kd_customers', 'kd_orders'].forEach(key => localStorage.removeItem(key));
                            location.reload(); // Sıfırlama sonrası tam yenileme kabul edilebilir (genel sıfırlama)
                        }
                    });
                }
            }, ['🚨 Tüm Verileri Sıfırla'])
        ])
    ]);
};
