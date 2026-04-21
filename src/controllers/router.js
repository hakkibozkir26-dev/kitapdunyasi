/**
 * router.js - Basit SPA yönlendirici.
 * SRP: Sayfa geçişleri ve URL parametre yönetimi.
 */

export class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const search = new URLSearchParams(window.location.search);
        
        // Match dynamic routes (e.g., /book/:id)
        let matched = null;
        let params = {};

        for (const [route, handler] of Object.entries(this.routes)) {
            const routeParts = route.split('/');
            const pathParts = path.split('/');

            if (routeParts.length === pathParts.length) {
                let match = true;
                const tempParams = {};
                for (let i = 0; i < routeParts.length; i++) {
                    if (routeParts[i].startsWith(':')) {
                        tempParams[routeParts[i].substring(1)] = pathParts[i];
                    } else if (routeParts[i] !== pathParts[i]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    matched = handler;
                    params = tempParams;
                    break;
                }
            }
        }

        if (matched) {
            matched(params, search);
            window.scrollTo(0, 0);
        } else {
            console.error('Route not found:', path);
            this.navigate('/');
        }
    }
}
