const fetch = require('node-fetch');

const baseUrl = 'https://flag-gilt.vercel.app/api/challenge';
const token = 'uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA=';

async function getNextCursor(cursor) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cursor })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

async function challenge() {
  let cursor = null;
  while (true) {
    try {
      const data = await getNextCursor(cursor);
      console.log('Response:', data);
      cursor = data.nextCursor;
      if (!cursor) {
        console.log('there is no more cursors');
        break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      break;
    }
  }
}
challenge();
