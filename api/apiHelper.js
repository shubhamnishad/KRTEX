export const apiRequest = async (method, url, data = {}, header = {}) => {
  const body = {
    method,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...header,
    },
    data: JSON.stringify({...data}),
  };

  try {
    const data = await fetch(url, body);
    let json = await data.json();
    return json;
  } catch (err) {
    console.log('failed', err);
  }
};
