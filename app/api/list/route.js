import db from '../../../lib/db';
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    let query = `SELECT * FROM mfo WHERE mfo.user_id = 76`;
    const [results] = await db.execute(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
