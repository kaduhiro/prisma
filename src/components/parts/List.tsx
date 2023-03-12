export const List = () => {
  return (
    <div className='relative mx-auto px-4 pb-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8'>
      <div className='absolute inset-x-0 top-0 hidden items-center justify-center overflow-hidden md:inset-y-0 md:flex'>
        <svg viewBox='0 0 88 88' className='w-full max-w-screen-xl text-gray-800'>
          <circle fill='currentColor' fillOpacity='0.4' cx='44' cy='44' r='15.5' />
          <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='44' />
          <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='37.5' />
          <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='29.5' />
          <circle fillOpacity='0.1' fill='currentColor' cx='44' cy='44' r='22.5' />
        </svg>
      </div>
      <div className='relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {[...Array(20)].map((_, i) => {
          return (
            <div
              key={i}
              className='rounded bg-white/10 px-10 py-20 text-center shadow-2xl transition duration-300 hover:scale-105 hover:shadow-2xl md:shadow-xl'
            >
              <p className='font-semibold text-gray-200'>Block #{i + 1}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
