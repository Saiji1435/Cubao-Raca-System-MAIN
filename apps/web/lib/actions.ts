"use server";
import { revalidatePath } from "next/cache";

export async function submitRacaRequest(prevState: any, formData: FormData) {
  const data = {
    purpose: formData.get("purpose"),
    roomName: formData.get("room"),
    items: formData.get("items"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Server rejected the request");

    revalidatePath("/approvals"); // Clears cache so new request shows up
    return { success: true };
  } catch (err) {
    return { error: "Could not send request. Check backend connection." };
  }
}