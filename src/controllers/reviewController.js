/**
 * reviewController.js - Yorum olayları.
 */
import { addReview } from '../models/reviewModel.js';
import { renderToast } from '../views/components.js';

export const handleAdd = (bookId, rating, comment) => {
    if (!comment) return renderToast('Lütfen bir yorum yazın.');
    addReview(bookId, rating, comment, 'Değerli Okur');
    renderToast('Yorumunuz için teşekkürler!');
    window.app.render(); // Detay sayfasını yenile
};
