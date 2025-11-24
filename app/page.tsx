import React from 'react';
import ColorLegend from '@/components/ui/ColorLegend';

const Home = () => {
  const sampleData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 15, 25.5, NaN, null, undefined];
  const exampleData = [10, 20, 30, 40, 50];

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-2xl font-bold">Примеры использования ColorLegend</h1>
      <ColorLegend data={sampleData} title="Легенда для полного набора данных" />
      <ColorLegend data={exampleData} title="Легенда для небольшого набора" />
    </div>
  );
};

export default Home;