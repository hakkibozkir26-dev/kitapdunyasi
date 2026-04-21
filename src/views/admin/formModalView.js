/**
 * formModalView.js - Reusable form modal structure.
 */
import { el } from '../../utils/dom.js';

export const renderFormModal = ({ title, fields, onSave, onCancel }) => {
    const overlay = el('div', { 
        className: 'modal-overlay',
        onclick: (e) => { if (e.target === overlay) { overlay.remove(); if(onCancel) onCancel(); } }
    }, [
        el('div', { className: 'modal-content', style: { width: '500px' } }, [
            el('button', { 
                className: 'modal-close', 
                onclick: () => { overlay.remove(); if(onCancel) onCancel(); } 
            }, ['×']),
            el('h2', { style: { marginBottom: '1.5rem' } }, [title]),
            el('form', {
                onsubmit: (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    // Checkboxes handling
                    e.target.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                        data[cb.name] = cb.checked;
                    });
                    onSave(data, overlay);
                }
            }, [
                ...fields,
                el('div', { style: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' } }, [
                    el('button', { 
                        type: 'button',
                        className: 'btn', 
                        style: { background: '#eee' },
                        onclick: () => { overlay.remove(); if(onCancel) onCancel(); }
                    }, ['İptal']),
                    el('button', { 
                        type: 'submit',
                        className: 'btn btn-primary'
                    }, ['💾 Kaydet'])
                ])
            ])
        ])
    ]);

    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);

    document.body.appendChild(overlay);
};
