import { DefaultLayout } from '@/components/layouts';
import { List } from '@/components/parts';

export default function Home() {
  return (
    <DefaultLayout title={`Prisma`}>
      <div className='min-h-screen bg-gray-800/90 text-white'>
        <h1 className='p-20 text-center text-3xl'>Prisma</h1>
        <List />
        <div className='absolute inset-x-0 top-0 -z-10 hidden items-center justify-center overflow-hidden md:inset-y-0 md:flex'>
          <svg viewBox='0 0 88 88' className='w-full max-w-screen-xl text-gray-800'>
            <circle fill='currentColor' fillOpacity='0.4' cx='44' cy='44' r='15.5' />
            <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='44' />
            <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='37.5' />
            <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='29.5' />
            <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='22.5' />
          </svg>
        </div>
      </div>
    </DefaultLayout>
  );
}
