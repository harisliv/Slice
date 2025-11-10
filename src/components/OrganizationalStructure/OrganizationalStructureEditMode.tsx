import { Tabs } from '@app/lib/ui';
import { useLoaderData } from 'react-router';
import OrganizationalArrangements from './components/OrganizationalArrangements​';
import InvolvedEntities from './components/InvolvedEntities​';
import RelatedInitiatives from './components/RelatedInitiatives​';

export default function OrganizationalStructureEditMode() {
  const { initialTab } = useLoaderData() || { initialTab: 0 };

  return (
    <Tabs
      initialTab={initialTab}
      tabs={[
        {
          content: <OrganizationalArrangements />,
          label: 'Organizational arrangements'
        },
        {
          content: <InvolvedEntities />,
          label: 'Involved entities'
        },
        {
          content: <RelatedInitiatives />,
          label: 'Related initiatives'
        }
      ]}
    />
  );
}
