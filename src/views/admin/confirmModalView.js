/**
 * confirmModalView.js - Onay modalı.
 */
import { el } from '../../utils/dom.js';

export const renderConfirmModal = ({ title, message, onConfirm, onCancel }) => {
    const overlay = el('div', { 
        className: 'modal-overlay',
        onclick: (e) => { if (e.target === overlay) { overlay.remove(); if(onCancel) onCancel(); } }
    }, [
        el('div', { className: 'modal-content', style: { maxWidth: '400px', textAlign: 'center' } }, [
            el('div', { className: 'confirm-icon' }, ['⚠️']),
            el('h2', { style: { marginBottom: '0.5rem' } }, [title]),
            el('p', { style: { marginBottom: '2rem', color: 'var(--text-muted)' } }, [message]),
            el('div', { style: { display: 'flex', gap: '1rem', justifyContent: 'center' } }, [
                el('button', { 
                    className: 'btn', 
                    style: { background: '#eee' },
                    onclick: () => { overlay.remove(); if(onCancel) onCancel(); }
                }, ['İptal']),
                el('button', { 
                    className: 'btn btn-danger',
                    onclick: () => { overlay.remove(); onConfirm(); }
                }, ['🗑️ Evet, Sil'])
            ])
        ])
    ]);

    // ESC key closes modal
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);

    document.body.appendChild(overlay);
};
