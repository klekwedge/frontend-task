import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import App from './components/App/App';
import './main.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider>
    <AdaptivityProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AdaptivityProvider>
  </ConfigProvider>,
);
