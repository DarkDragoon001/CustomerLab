const db = require('../db');

const receiveData = async (req, res) => {
  const token = req.headers['cl-x-token'];

  if (!token) res.status(401).json({ error: 'UnAuthenticate' });
  const userData = await db.allAsync('select * from accounts WHERE secret_token=?;', [token]);
  console.log('userData: ', userData);

  if (!userData.length) res.status(401).json({ error: 'UnAuthenticate' });
  const destinations = await db.allAsync('select * from destinations WHERE account_id=?;', [userData?.[0]?.id]);
  for (const dest of destinations) {
    let { url, method, headers } = dest;
    headers = JSON.parse(headers);

    try {
      if (method.toUpperCase() === 'GET') {
        if (typeof req.body !== 'object') {
          return res.status(400).json({ message: 'Invalid Data' });
        }

        const params = new URLSearchParams(req.body).toString();
        const fullUrl = `${url}?${params}`;

        await fetch(fullUrl, {
          method: 'GET',
          headers,
        });

      } else {
        await fetch(url, {
          method: method.toUpperCase(),
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
      }
    } catch (err) {
      console.error(`Failed to send to ${url}:`, err.message);
    }
  }
  res.status(200).json(destinations);
}
module.exports = { receiveData }