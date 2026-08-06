import { useEffect } from 'react';

/** Pass the full title, e.g. "Sign In | Job Assistant AI" — not auto-suffixed, so the homepage can read differently from subpages. */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
