// pages/api/users.js
import db from '../../../lib/db';

// export default async function handler(req, res) {
//   try {
//     if (req.method === 'GET') {
//       const [rows] = await db.query(`
//       SELECT * FROM mfo
//       LEFT JOIN users ON mfo.user_id = users.user_id
//       WHERE mfo.user_id =  1
//      `);
//      console.log(rows);
//       return res.status(200).json({ success: true, data: rows });
//     }

//     if (req.method === 'POST') {
//       const { name, email } = req.body;

//       // Basic validation
//       if (!name || !email) {
//         return res.status(400).json({ success: false, message: 'Name and email are required' });
//       }

//       const [result] = await db.query(
//         'INSERT INTO users (name, email) VALUES (?, ?)',
//         [name, email]
//       );

//       return res.status(201).json({ success: true, insertedId: result.insertId });
//     }

//     // Method not allowed
//     res.setHeader('Allow', ['GET', 'POST']);
//     return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });

//   } catch (error) {
//     console.error('Database error:', error);
//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// }

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    let query = `
    SELECT * FROM mfo LEFT JOIN users ON mfo.user_id = 76
      WHERE mfo.user_id = 76`;
    const [results] = await db.execute(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
