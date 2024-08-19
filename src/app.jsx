/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
