module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  return res.status(200).json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
};

