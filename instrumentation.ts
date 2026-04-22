import { telemetry } from "@/lib/telemetry";

export async function register() {
  console.log("--- INSTRUMENTATION REGISTERED ---");
  
  // Track boot time
  console.time("Server Boot");
  
  telemetry.record({
    type: "init",
    name: "Server Startup",
    metadata: {
      runtime: process.env.NEXT_RUNTIME,
      nodeVersion: process.env.NEXT_RUNTIME === 'nodejs' ? process.version : undefined
    }
  });

  // If you were using a real OTel SDK, you would initialize it here:
  // if (process.env.NEXT_RUNTIME === 'nodejs') {
  //   const { NodeSDK } = await import('@opentelemetry/sdk-node');
  //   ...
  // }
  
  console.timeEnd("Server Boot");
}

export function onRequestError(
  err: unknown,
  request: { path: string; method: string },
  context: { errorId: string }
) {
  telemetry.record({
    type: "error",
    name: `Request Error: ${request.path}`,
    metadata: {
      error: err instanceof Error ? err.message : String(err),
      method: request.method,
      errorId: context.errorId
    }
  });
}
