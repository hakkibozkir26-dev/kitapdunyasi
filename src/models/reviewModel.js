/**
 * reviewModel.js - Yorum işlemleri.
 */
import { safeGet, safeSet } from '../utils/storage.js';

const KEY = 'kd_reviews';

export const getReviews = () => safeGet(KEY, []);

export const getReviewsByBook = (bookId) => {
    return getReviews().filter(r => r.bookId === bookId);
};

export const addReview = (bookId, rating, comment, username = 'Anonim') => {
    const reviews = getReviews();
    reviews.push({
        id: Date.now(),
        bookId,
        rating,
        comment,
        username,
        date: new Date().toISOString()
    });
    safeSet(KEY, reviews);
    return reviews;
};

export const getAvgRating = (bookId) => {
    const bookReviews = getReviewsByBook(bookId);
    if (bookReviews.length === 0) return 0;
    const total = bookReviews.reduce((acc, r) => acc + r.rating, 0);
    return total / bookReviews.length;
};
