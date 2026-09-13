import { useState, useMemo } from 'react';
import { FileText, FilePlus, FileSearch } from 'lucide-react';
import { useVeloraStore } from '@/store/useStore';
import { SearchField } from '@/components/ui/SearchField';
import { FilterChips } from '@/components/ui/FilterChips';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/format';
import type { DocKind } from '@/types';

type Filter = 'all' | DocKind;

const categoryLabels: Record<string, string> = {
  contract: 'Contrato',
  invoice: 'Factura',
  report: 'Informe',
  receipt: 'Recibo',
  other: 'Otro',
};

export function DocumentsPage() {
  const { documents } = useVeloraStore();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchesQuery = doc.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === 'all' || doc.kind === filter;
      return matchesQuery && matchesFilter;
    });
  }, [documents, query, filter]);

  return (
    <div className="animate-fade-in">
      <div className="px-4 sm:px-6 pt-4 space-y-3">
        <h1 className="text-xl font-bold text-ink">Documentos</h1>
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Buscar documento o recibo…"
        />
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'Todos' },
            { value: 'document', label: 'Documentos' },
            { value: 'receipt', label: 'Recibos' },
          ]}
        />
      </div>

      <div className="pt-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={FileSearch}
            title="No se encontraron documentos"
            description="Prueba con otra búsqueda o añade un nuevo documento."
          />
        ) : (
          <ul className="divide-y divide-gray-50">
            {filtered.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center gap-3 px-4 sm:px-6 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <span className="w-10 h-10 rounded-xl bg-petroleum-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-petroleum-700" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-ink truncate">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-ink-muted">
                      {categoryLabels[doc.category]}
                    </span>
                    <span className="text-xs text-ink-subtle">·</span>
                    <span className="text-xs text-ink-subtle tabular-nums">
                      {formatDate(doc.date)}
                    </span>
                    <span className="text-xs text-ink-subtle">·</span>
                    <span className="text-xs text-ink-subtle tabular-nums">
                      {doc.size}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-4 sm:px-6 pt-4 pb-4">
        <button
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-ink-muted hover:border-petroleum-300 hover:text-petroleum-700 transition-colors touch-target"
        >
          <FilePlus className="w-5 h-5" />
          <span className="text-sm font-medium">Agregar documento</span>
        </button>
      </div>
    </div>
  );
}
