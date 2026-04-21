/**
 * adminLoginView.js - Admin giriş formu.
 * SRP: Sadece giriş arayüzü.
 */
import { el } from '../utils/dom.js';

export const renderAdminLogin = (onLogin) => {
    const input = el('input', { 
        type: 'password', 
        placeholder: 'Admin Şifresi', 
        style: { width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '1rem' } 
    });

    return el('div', { style: { textAlign: 'center', padding: '2rem' } }, [
        el('h2', { style: { marginBottom: '1rem' } }, ['Yönetici Girişi']),
        el('p', { style: { marginBottom: '1.5rem', color: 'var(--text-muted)' } }, ['Bu bölüme erişmek için yönetici şifresi gereklidir.']),
        input,
        el('button', { 
            className: 'btn btn-primary',
            style: { width: '100%', justifyContent: 'center' },
            onclick: () => onLogin(input.value)
        }, ['Giriş Yap'])
    ]);
};
