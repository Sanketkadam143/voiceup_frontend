import React from 'react';
import { EmotionType } from '../../types';

interface EmotionChartProps {
  data: { [key in EmotionType]: number };
}

const emotionColors: { [key in EmotionType]: string } = {
  happy: '#22c55e',
  satisfied: '#10b981',
  neutral: '#6b7280',
  concerned: '#f59e0b',
  frustrated: '#f97316',
  confused: '#8b5cf6',
  angry: '#ef4444',
  excited: '#06b6d4'
};

export const EmotionChart: React.FC<EmotionChartProps> = ({ data }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  const emotions = Object.entries(data).filter(([_, value]) => value > 0);
  
  let currentAngle = 0;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Emotion Distribution</h3>
      <div className="flex items-center justify-between">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {emotions.map(([emotion, count]) => {
              const percentage = (count / total) * 100;
              const angle = (count / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
              const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
              const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
              const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${startX} ${startY}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={emotion}
                  d={pathData}
                  fill={emotionColors[emotion as EmotionType]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              );
            })}
          </svg>
        </div>
        
        <div className="flex-1 ml-8">
          <div className="space-y-3">
            {emotions.map(([emotion, count]) => {
              const percentage = ((count / total) * 100).toFixed(1);
              return (
                <div key={emotion} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: emotionColors[emotion as EmotionType] }}
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {emotion}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                    <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};