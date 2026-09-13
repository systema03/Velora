import { Plus } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
  label?: string;
}

export function FloatingAddButton({ onClick, label = 'Añadir' }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-30 w-14 h-14 rounded-2xl bg-petroleum-700 text-white shadow-float flex items-center justify-center hover:bg-petroleum-800 active:scale-95 transition-all touch-target"
    >
      <Plus className="w-6 h-6" strokeWidth={2.5} />
    </button>
  );
}
