const timeoutConfig: {
  timeout: number;
  timeoutErrorMessage: string;
} = {
  timeout: 30000,
  timeoutErrorMessage: "Server taking too long to respond. Try again.",
};

const headersConfig = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Accept: "application/json",
  "Content-Type": "application/json",
};

export { headersConfig, timeoutConfig };
