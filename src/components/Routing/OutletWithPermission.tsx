import { useInitiatives } from '@app/hooks';
import { Outlet } from 'react-router';
import { SkeletonComponent } from '@app/lib/ui';
import Unauthorized from './Unauthorized';

export default function OutletWithPermission() {
  const { data: initiatives, isPending } = useInitiatives();

  if (isPending) {
    return <SkeletonComponent />;
  }

  if (!initiatives || initiatives.length === 0) {
    return <Unauthorized />;
  }

  return <Outlet />;
}
