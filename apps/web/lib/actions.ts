"use server";

import { revalidatePath } from "next/cache";

// prevState is required when using the useActionState hook
export async function submitRacaRequest(prevState: any, formData: FormData) {
  const rawData = {
    room: formData.get("room"),
    items: formData.get("items"),
    purpose: formData.get("purpose"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rawData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "Failed to submit request" };
    }

    revalidatePath("/dashboard");
    revalidatePath("/schedules");

    return { success: true, error: undefined };
  } catch (error) {
    console.error("Submission Error:", error);
    return { success: false, error: "Unable to connect to RACA server" };
  }
}