import { z } from "zod";

export type ValidationResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errors: string[];
    };

export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): ValidationResult<T> {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        errors: result.error.issues.map((err) => err.message),
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: ["Validation failed"],
    };
  }
}