import { AxiosError } from "axios";

export default function getErrorMessage(error: unknown): string {
  if (!error) return "An unknown error occurred.";

  if (error instanceof AxiosError) {
    if (error.response) {
      return (
        error.response.data?.message || "An unexpected server error occurred."
      );
    } else if (error.request) {
      return "Network error. Please check your connection and try again.";
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error occurred.";
}
