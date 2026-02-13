import { useCountdown } from '@/hooks/useCountdown';

const EVENT_DATE = new Date('2026-02-14T09:00:00');

export const CountdownTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

  const timeBlocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      {timeBlocks.map((block) => (
        <div
          key={block.label}
          className="bg-white rounded-lg shadow-md p-4 text-center"
        >
          <div className="text-3xl md:text-4xl font-bold text-red-600">
            {block.value.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-600 mt-1">{block.label}</div>
        </div>
      ))}
    </div>
  );
};
