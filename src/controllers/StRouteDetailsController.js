import { fe_data } from './fe_data';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchData = () => {
  return wait(100).then(() => {
    const response = { status: 'ok', status_code: 200, data: fe_data };
    if (response.status_code !== 200) {
      const reason = 'Problem retrieving FE data';
      console.error(`${reason}`, response);
      Promise.reject(reason);
    }
    // debug_log console.log('fetchData before return', response.data);
    return response.data;
  });
};
