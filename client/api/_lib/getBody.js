async function getJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const raw = Buffer.concat(buffers).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}

module.exports = getJsonBody;

