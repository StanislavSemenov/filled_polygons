import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

/**
 * Функция интерполяции цвета от зеленого (min) до красного (max)
 * @param {number} value - Значение от 0 (зеленый) до 1 (красный).
 * @returns {string} Цвет в формате RGB.
 */
const interpolateColor = (value: number): string => {
  const r = Math.floor(value * 255);
  const g = Math.floor((1 - value) * 255);
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
};

interface ColorLegendProps {
  data: (number | null | undefined)[];
  title?: string;
}

const ColorLegend: React.FC<ColorLegendProps> = ({ data, title = 'Цветовая Легенда' }) => {
  const validAndUniqueValues = useMemo(() => {
    const numbers = data.filter((item): item is number => typeof item === 'number' && !isNaN(item));
    const uniqueSorted = Array.from(new Set(numbers)).sort((a, b) => a - b);

    return uniqueSorted;
  }, [data]);

  if (validAndUniqueValues.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Нет валидных данных для отображения легенды.</p>
        </CardContent>
      </Card>
    );
  }

  const minValue = Math.min(...validAndUniqueValues);
  const maxValue = Math.max(...validAndUniqueValues);
  const range = maxValue - minValue;

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <Label className="text-sm font-normal text-gray-500">
            {minValue.toFixed(2)} (Мин)
          </Label>

          <div className="flex h-6 flex-1 overflow-hidden rounded-md shadow-inner">
            {validAndUniqueValues.map((value, index) => {
              const normalizedValue = range === 0 ? 0.5 : (value - minValue) / range;
              const color = interpolateColor(normalizedValue);

              return (
                <div
                  key={index}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                  title={`Значение: ${value.toFixed(2)}`}
                />
              );
            })}
          </div>

          <Label className="text-sm font-normal text-gray-500">
            {maxValue.toFixed(2)} (Макс)
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorLegend;