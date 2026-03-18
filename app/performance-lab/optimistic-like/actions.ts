"use server";

export async function likePostAction(currentState: number): Promise<number> {
  // Simulate slow network or database latency (1.5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Return the newly confirmed DB value
  return currentState + 1;
}
