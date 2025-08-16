import React, { useState, useEffect } from 'react';
import { Github, GitCommit, Calendar } from 'lucide-react';

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<number[][]>([]);

  useEffect(() => {
    // Generate mock contribution data (7 days x 52 weeks)
    const generateContributions = () => {
      const data: number[][] = [];
      for (let week = 0; week < 52; week++) {
        const weekData: number[] = [];
        for (let day = 0; day < 7; day++) {
          // Random contribution count (0-4 for different intensity levels)
          weekData.push(Math.floor(Math.random() * 5));
        }
        data.push(weekData);
      }
      return data;
    };

    setContributions(generateContributions());
  }, []);

  const getContributionColor = (level: number) => {
    const colors = [
      'bg-gray-200', // 0 contributions
      'bg-green-200', // 1-2 contributions
      'bg-green-300', // 3-4 contributions
      'bg-green-500', // 5-6 contributions
      'bg-green-700'  // 7+ contributions
    ];
    return colors[level] || colors[0];
  };

  const totalContributions = contributions.flat().reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Github className="text-gray-700" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">GitHub Activity</h3>
            <p className="text-sm text-gray-600">{totalContributions} contributions this year</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>2024</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-1 mb-4" style={{ minWidth: '800px' }}>
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm ${getContributionColor(day)} hover:ring-2 hover:ring-green-400 transition-all duration-200 cursor-pointer`}
                  title={`${day} contributions`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <GitCommit size={16} className="text-green-600" />
          <span>Active Developer</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Currently Building</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;