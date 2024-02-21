import React from 'react';
import { Bar } from 'react-chartjs-2';

export const ReviewGraph = () => {

  return (
    <div>
      <h2>Review Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

