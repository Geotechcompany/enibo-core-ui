import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ChartData } from '@/types/global';

interface LineChartProps {
  data: ChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: 'Transaction Volume',
                data: data.values,
                borderColor: 'blue',
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day'
                }
              }
            }
          },
        });
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;