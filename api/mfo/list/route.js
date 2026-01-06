// pages/api/users.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const [rows] = await pool.query(`
      SELECT * FROM mfo
      LEFT JOIN users ON mfo.user_id = users.user_id
      WHERE mfo.user_id =  1
     `);
     console.log(rows);
      return res.status(200).json({ success: true, data: rows });
    }

    if (req.method === 'POST') {
      const { name, email } = req.body;

      // Basic validation
      if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
      }

      const [result] = await pool.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );

      return res.status(201).json({ success: true, insertedId: result.insertId });
    }

    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}