/**
 * searchController.js - Arama ve filtreleme merkezi yönetimi.
 */
import { searchBooks, filterByCategory, sortBooks } from '../models/bookModel.js';

export const handleSearchChange = (query) => {
    const params = new URLSearchParams(window.location.search);
    if (query) {
        params.set('q', query);
    } else {
        params.delete('q');
    }
    window.router.navigate(`/?${params.toString()}`);
};

export const handleFilterChange = (category) => {
    const params = new URLSearchParams(window.location.search);
    params.set('cat', category);
    window.router.navigate(`/?${params.toString()}`);
};

export const handleSortChange = (sort) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', sort);
    window.router.navigate(`/?${params.toString()}`);
};
