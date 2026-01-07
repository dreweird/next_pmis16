import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse JSON body
    const { mfo_id, col_name, value } = await req.json();

    if (!mfo_id || !col_name || value === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build safe query
    const query = `UPDATE mfo SET ${col_name} = ? WHERE mfo_id = ?`;
    const [results] = await db.execute(query, [value, mfo_id]);

    return NextResponse.json({
      success: true,
      affectedRows: results.affectedRows,
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
