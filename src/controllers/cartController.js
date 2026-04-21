/**
 * cartController.js - Sepet olaylarını yönetir.
 */
import { addToCart, removeFromCart, updateQty, getCart, clearCart } from '../models/cartModel.js';
import { renderToast, renderModal } from '../views/components.js';

export const handleAddToCart = (e, book) => {
    e.stopPropagation();
    addToCart(book);
    renderToast(`${book.title} sepete eklendi.`);
    window.app.updateHeader();
};

export const handleRemove = (id) => {
    removeFromCart(id);
    window.app.render();
    window.app.updateHeader();
};

export const handleUpdateQty = (id, qty) => {
    updateQty(id, qty);
    window.app.render();
    window.app.updateHeader();
};

export const handleCheckout = () => {
    renderModal(
        'Siparişi Onayla',
        `Sepetinizdeki ürünlerin siparişini onaylıyor musunuz?`,
        () => {
            clearCart();
            renderToast('Siparişiniz başarıyla alındı!');
            window.router.navigate('/orders');
            window.app.updateHeader();
        }
    );
};
