// pages/api/geocode.js
import fetch from 'node-fetch';

export default async (req, res) => {
  const { query } = req.query;

  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=ff4fc925c0014e88868ddc44fd23e0e0`);
  const data = await response.json();

  res.status(200).json(data.results);
};