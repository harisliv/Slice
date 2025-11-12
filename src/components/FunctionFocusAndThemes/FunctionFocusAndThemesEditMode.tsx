import { Tabs } from '@app/lib/ui';
import { useLoaderData } from 'react-router';
import Functions from './components/Functions';
import Themes from './components/Themes';
import Focus from './components/Focus';

export default function FunctionFocusAndThemesEditMode() {
  const { initialTab } = useLoaderData() || { initialTab: 0 };

  return (
    <Tabs
      initialTab={initialTab}
      tabs={[
        {
          content: <Functions />,
          label: 'Functions​'
        },
        {
          content: <Focus />,
          label: 'Focuses'
        },
        {
          content: <Themes />,
          label: 'Themes'
        }
      ]}
    />
  );
}
