import { Search, X } from 'lucide-react';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function SearchField({ value, onChange, placeholder = 'Buscar…', label = 'Buscar' }: SearchFieldProps) {
  return (
    <div className="relative">
      <label htmlFor="search-field" className="sr-only">
        {label}
      </label>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-subtle pointer-events-none" />
      <input
        id="search-field"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm text-ink placeholder:text-ink-subtle focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-ink-subtle hover:text-ink hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
