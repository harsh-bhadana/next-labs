"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ActionState {
  success: boolean;
  errors?: Record<string, string>;
  error?: string;
  nextStep?: number | "completed";
}

export async function submitStep(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const currentStep = parseInt((formData.get("currentStep") as string) || "1");
  const jsMode = (formData.get("jsMode") as string) || "on";
  const simulateNoJS = jsMode === "off";

  const cookieStore = await cookies();

  if (currentStep === 1) {
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    const errors: Record<string, string> = {};
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Save to cookies
    cookieStore.set("wizard_email", email, { maxAge: 60 * 20 });
    
    if (simulateNoJS) {
      redirect("/interactive-ui-lab/form-wizard?step=2&jsMode=off");
    }
    return { success: true, nextStep: 2 };
  }

  if (currentStep === 2) {
    const username = (formData.get("username") as string) || "";
    const theme = (formData.get("theme") as string) || "dark";

    const errors: Record<string, string> = {};
    if (!username || username.length < 3) {
      errors.username = "Username must be at least 3 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Save to cookies
    cookieStore.set("wizard_username", username, { maxAge: 60 * 20 });
    cookieStore.set("wizard_theme", theme, { maxAge: 60 * 20 });

    if (simulateNoJS) {
      redirect("/interactive-ui-lab/form-wizard?step=3&jsMode=off");
    }
    return { success: true, nextStep: 3 };
  }

  if (currentStep === 3) {
    const email = cookieStore.get("wizard_email")?.value || "";
    const username = cookieStore.get("wizard_username")?.value || "";
    const theme = cookieStore.get("wizard_theme")?.value || "";

    if (!email || !username) {
      return { 
        success: false, 
        error: "Session expired or missing fields. Please go back and refill your credentials." 
      };
    }

    // Simulate saving to database
    
    // Clear cookies
    cookieStore.delete("wizard_email");
    cookieStore.delete("wizard_username");
    cookieStore.delete("wizard_theme");

    if (simulateNoJS) {
      redirect("/interactive-ui-lab/form-wizard?step=completed&jsMode=off");
    }
    return { success: true, nextStep: "completed" };
  }

  return { success: false, error: "Invalid action state." };
}
