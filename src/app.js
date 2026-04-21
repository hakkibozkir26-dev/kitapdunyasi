/**
 * app.js - Uygulama Başlatıcı.
 */
import { Router } from './controllers/router.js';
import { renderHeader } from './views/headerView.js';
import { renderSidebar } from './views/sidebarView.js';
import { renderHome } from './views/homeView.js';
import { renderBookDetail } from './views/bookDetailView.js';
import { renderAuthorsList } from './views/authorsListView.js';
import { renderAuthor } from './views/authorView.js';
import { renderPublishersList } from './views/publishersListView.js';
import { renderPublisher } from './views/publisherView.js';
import { renderCart } from './views/cartView.js';
import { renderFavs } from './views/favView.js';
import { renderOrders } from './views/ordersView.js';
import { renderCustomers } from './views/customersView.js';
import { renderAdmin } from './views/adminView.js';
import { handleLogin } from './controllers/adminController.js';

import { BookCrudController } from './controllers/admin/bookCrudController.js';
import { AuthorCrudController } from './controllers/admin/authorCrudController.js';
import { PublisherCrudController } from './controllers/admin/publisherCrudController.js';
import { CustomerCrudController } from './controllers/admin/customerCrudController.js';
import { OrderStatusController } from './controllers/admin/orderStatusController.js';
import { renderAdminTabs } from './views/admin/adminTabsView.js';

import * as cartController from './controllers/cartController.js';
import * as favController from './controllers/favController.js';
import * as reviewController from './controllers/reviewController.js';

import * as customerModel from './models/customerModel.js';
import { getCart } from './models/cartModel.js';
import { getFavs } from './models/favModel.js';

class App {
    constructor() {
        this.root = document.getElementById('root');
        this.init();
    }

    init() {
        // Global namespace'e bağla (View'lar ve Controller'lar arası iletişim için)
        window.controllers = {
            cart: cartController,
            fav: favController,
            review: reviewController,
            admin: { 
                handleLogin,
                books: new BookCrudController(),
                authors: new AuthorCrudController(),
                publishers: new PublisherCrudController(),
                customers: new CustomerCrudController(),
                orders: new OrderStatusController()
            }
        };
        window.models = { customer: customerModel };
        window.app = this;

        // Router'ı başlat
        window.router = new Router({
            '/': (p, s) => this.mount(renderHome({ query: s.get('q'), category: s.get('cat'), sort: s.get('sort') })),
            '/book/:id': (p) => this.mount(renderBookDetail(p.id)),
            '/authors': () => this.mount(renderAuthorsList()),
            '/author/:id': (p) => this.mount(renderAuthor(p.id)),
            '/publishers': () => this.mount(renderPublishersList()),
            '/publisher/:id': (p) => this.mount(renderPublisher(p.id)),
            '/cart': () => this.mount(renderCart()),
            '/favs': () => this.mount(renderFavs()),
            '/orders': () => this.mount(renderOrders()),
            '/customers': () => this.mount(renderCustomers()),
            '/admin': () => {
                if (sessionStorage.getItem('kd_admin') === 'true') {
                    this.mount([renderAdminTabs('dashboard'), renderAdmin()]);
                } else {
                    handleLogin();
                }
            },
            '/admin/books': () => this.checkAdmin(() => this.mount([renderAdminTabs('books'), window.controllers.admin.books.render()])),
            '/admin/authors': () => this.checkAdmin(() => this.mount([renderAdminTabs('authors'), window.controllers.admin.authors.render()])),
            '/admin/publishers': () => this.checkAdmin(() => this.mount([renderAdminTabs('publishers'), window.controllers.admin.publishers.render()])),
            '/admin/customers': () => this.checkAdmin(() => this.mount([renderAdminTabs('customers'), window.controllers.admin.customers.render()])),
            '/admin/orders': () => this.checkAdmin(() => this.mount([renderAdminTabs('orders'), window.controllers.admin.orders.render()]))
        }, this.root);

        // Tema yükle
        const savedTheme = localStorage.getItem('kd_theme') || 'light';
        document.documentElement.dataset.theme = savedTheme;
    }

    checkAdmin(callback) {
        if (sessionStorage.getItem('kd_admin') === 'true') {
            callback();
        } else {
            handleLogin();
        }
    }

    updateHeader() {
        const headerContainer = document.getElementById('header-container');
        if (!headerContainer) return;
        
        headerContainer.innerHTML = '';
        const headerElems = renderHeader({
            cartCount: getCart().length,
            favCount: getFavs().length,
            theme: document.documentElement.dataset.theme
        });
        
        headerElems.forEach(el => headerContainer.appendChild(el));

        // Sidebar'ı da güncelle (aktif link takibi için)
        const sidebarContainer = document.getElementById('sidebar-container');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = '';
            sidebarContainer.appendChild(renderSidebar());
        }
    }

    mount(view) {
        this.updateHeader();
        const main = document.querySelector('main');
        main.innerHTML = '';
        if (Array.isArray(view)) {
            view.forEach(v => main.appendChild(v));
        } else if (view instanceof HTMLElement) {
            main.appendChild(view);
        }
    }

    render() {
        window.router.handleRoute();
    }
}

document.addEventListener('DOMContentLoaded', () => new App());
