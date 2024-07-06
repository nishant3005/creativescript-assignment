// src/api/mockSearchApi.ts

const mockData = [
  'Result 1',
  'Result 2',
  'Result 3',
  'Result 4',
  'Result 5',
  'Result 6',
  'Result 7',
  'Result 8',
  'Result 9',
  'Result 10',
];

export const mockSearchApi = (query: string) => {
  return new Promise<{ results: string[] }>((resolve) => {
    setTimeout(() => {
      const filteredData = mockData.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      resolve({ results: filteredData });
    }, 1000); // Simulate 1 second latency
  });
};
