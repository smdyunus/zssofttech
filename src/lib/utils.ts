export type ClassValue = string | number | boolean | null | undefined;

/** Concatenate class names (no tailwind-merge dependency). */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
