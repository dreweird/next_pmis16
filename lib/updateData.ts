// No "use server" here — this runs in the browser
export async function updateData(mfo_id: number, col_name: string, value: any) {
  const response = await fetch("/api/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mfo_id, col_name, value }),
  });

  return response.json(); // { success: true/false, ... }
}
