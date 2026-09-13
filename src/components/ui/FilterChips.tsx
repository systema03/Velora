interface FilterChipsProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
}

export function FilterChips<T extends string>({ options, value, onChange, label = 'Filtrar' }: FilterChipsProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-2 overflow-x-auto scrollbar-hide">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all touch-target ${
              active
                ? 'bg-petroleum-700 text-white shadow-soft'
                : 'bg-surface text-ink-muted border border-gray-200 hover:border-petroleum-300 hover:text-petroleum-700'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
