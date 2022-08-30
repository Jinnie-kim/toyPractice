import ChartBar from './ChartBar';

import './Chart.css';

const Chart = () => {
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <Chart
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={null}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
