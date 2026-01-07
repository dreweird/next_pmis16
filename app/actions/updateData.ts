"use server";

export async function updateData(mfo_id: number, col_name: string, value: number) {

    const apiURL = process.env.NEXTAUTH_URL;
    const response = await fetch(`${apiURL}/api/mfo/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mfo_id, col_name, value }),
      });
      const res = await response.json();
      console.log("Update Data Response:", res);
      return res;
}

export async function updateDataDistrict(id: number, col_name: string, value: number) {

  const apiURL = process.env.NEXTAUTH_URL;
  const response = await fetch(`${apiURL}/api/byDistrict/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, col_name, value }),
    });
    const res = await response.json();
    return res;
}

export async function updateDataMFOfromDistrict(id: number, col_name: string, value: number) {

  const apiURL = process.env.NEXTAUTH_URL;
  const response = await fetch(`${apiURL}/api/byDistrict/updateMFO`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, col_name, value }),
    });
    const res = await response.json();
    return res;
}