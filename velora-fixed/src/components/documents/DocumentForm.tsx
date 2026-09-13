import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { DocItem } from '@/types';

interface DocumentFormProps {
  mode: 'document' | 'receipt' | null;
  onClose: () => void;
  onSubmit: (item: Omit<DocItem, 'id'>) => void;
}

export function DocumentForm({ mode, onClose, onSubmit }: DocumentFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (mode) { setName(''); setDescription(''); setAmount(''); }
  }, [mode]);

  if (!mode) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      category: mode === 'receipt' ? 'receipt' : 'other',
      kind: mode,
      date: new Date().toISOString().slice(0, 10),
      size: 'Registro manual',
      amount: mode === 'receipt' ? Number(amount) : undefined,
      description: description.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 w-full bg-ink/30 backdrop-blur-sm" onClick={onClose} aria-label="Cerrar formulario" />
      <div role="dialog" aria-modal="true" aria-labelledby="document-form-title" className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl shadow-sheet safe-bottom lg:left-auto lg:right-6 lg:bottom-6 lg:w-[480px] lg:rounded-2xl">
        <form onSubmit={submit}>
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <h2 id="document-form-title" className="text-base font-semibold text-ink">{mode === 'receipt' ? 'Registrar recibo' : 'Agregar documento'}</h2>
            <button type="button" onClick={onClose} aria-label="Cerrar" className="touch-target flex items-center justify-center text-ink-subtle"><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-4 px-5 pb-5">
            <label className="block text-sm font-medium text-ink">Nombre
              <input autoFocus required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-ink outline-none focus:border-teal-500" placeholder={mode === 'receipt' ? 'Ej. Compra de materiales' : 'Ej. Informe mensual'} />
            </label>
            {mode === 'receipt' && <label className="block text-sm font-medium text-ink">Monto
              <input type="number" min="0" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1.5 w-full rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-ink outline-none focus:border-teal-500" placeholder="0.00" />
            </label>}
            <label className="block text-sm font-medium text-ink">Descripción <span className="font-normal text-ink-subtle">(opcional)</span>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5 w-full resize-none rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-ink outline-none focus:border-teal-500" />
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="touch-target flex-1 rounded-xl border border-gray-200 font-medium text-ink-muted">Cancelar</button>
              <button type="submit" className="touch-target flex-1 rounded-xl bg-petroleum-700 font-medium text-white">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
