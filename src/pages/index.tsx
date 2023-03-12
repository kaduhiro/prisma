import { DefaultLayout } from '@/components/layouts';
import { List } from '@/components/parts';

export default function Home() {
  return (
    <DefaultLayout title={`Prisma`}>
      <div className='bg-gray-900 text-white'>
        <h1 className='p-8 text-center text-3xl'>Prisma</h1>
        <List />
      </div>
    </DefaultLayout>
  );
}
