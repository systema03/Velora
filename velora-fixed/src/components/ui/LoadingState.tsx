import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Cargando…' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-8 h-8 text-teal-500 animate-spin-slow mb-3" />
      <p className="text-sm text-ink-muted">{message}</p>
    </div>
  );
}

export function ErrorState({ message = 'Algo salió mal' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-danger-50 flex items-center justify-center mb-4">
        <span className="text-2xl" aria-hidden="true">!</span>
      </div>
      <h3 className="text-base font-semibold text-ink mb-1">Error</h3>
      <p className="text-sm text-ink-muted max-w-xs">{message}</p>
    </div>
  );
}
