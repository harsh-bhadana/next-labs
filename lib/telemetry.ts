import "server-only";

export type TraceEvent = {
  id: string;
  type: "render" | "action" | "error" | "init";
  name: string;
  duration?: number;
  timestamp: number;
  metadata?: Record<string, any>;
};

// Singleton to store traces in memory during dev
// In production, this would go to an OTel collector
class TelemetryStore {
  private static instance: TelemetryStore;
  private traces: TraceEvent[] = [];
  private readonly MAX_TRACES = 50;

  private constructor() {}

  public static getInstance(): TelemetryStore {
    if (!TelemetryStore.instance) {
      TelemetryStore.instance = new TelemetryStore();
    }
    return TelemetryStore.instance;
  }

  public record(event: Omit<TraceEvent, "id" | "timestamp">) {
    const newEvent: TraceEvent = {
      ...event,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };
    
    this.traces.unshift(newEvent);
    if (this.traces.length > this.MAX_TRACES) {
      this.traces.pop();
    }
    
    // Log to console as requested by the specimen description
    if (event.type === 'error') {
      console.error(`[Telemetry Error] ${event.name}`, event.metadata);
    } else {
      console.log(`[Telemetry ${event.type}] ${event.name} ${event.duration ? `(${event.duration.toFixed(2)}ms)` : ''}`);
    }
  }

  public getTraces(): TraceEvent[] {
    return this.traces;
  }

  public clear() {
    this.traces = [];
  }
}

export const telemetry = TelemetryStore.getInstance();
