export type ErrorType = "network" | "not_found" | "server" | "unknown";
export interface IErrorInfo {
  type: ErrorType;
  message: string;
}
