const generatePieChartData = () => {
  const item = [2482, 925, 920, 450, 270, 20];
  const itemsCount = 3;
  const value = [];
  for (let i = 0; i < item.length; i++) {
    value.push(Math.floor(Math.random() * 60) + 40);
  }
  const total = item.reduce((a, b) => a + b, 0);
  const data = [];
  for (let i = 0; i < item.length; i++) {
    const percent = item[i] / total;
    data.push({
      percent,
      color: getRandomColor(),
    });
  }
  return data;
};
const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export {generatePieChartData};
