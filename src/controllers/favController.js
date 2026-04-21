/**
 * favController.js - Favori olaylarını yönetir.
 */
import { toggleFav, isFav } from '../models/favModel.js';
import { renderToast } from '../views/components.js';

export const handleToggle = (e, id) => {
    e.stopPropagation();
    toggleFav(id);
    const active = isFav(id);
    renderToast(active ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı');
    
    // UI'daki ilgili kalbi anlık güncelle (re-render maliyetinden kaçınmak için)
    const btn = e.target.closest('.fav-btn');
    if (btn) btn.classList.toggle('active', active);

    // Header sayacını güncelle
    window.app.updateHeader();
};
