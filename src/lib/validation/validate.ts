import { z } from "zod";

export type ValidationResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    errors: string[];
};

export function validateSchema<T>(
    schema: z.ZodSchema<T>,
    data: unknown
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
                errors: result.error.errors.map(err => err.message),
            };
        }
    } catch (error) {
        return {
            success: false,
            errors: ["Validation failed"],
        };
    }
}

export function validateFormData<T>(
    schema: z.ZodSchema<T>,
    formData: FormData
): ValidationResult<T> {
    const data = Object.fromEntries(formData.entries());
    return validateSchema(schema, data);
}

export function validateQueryParams<T>(
    schema: z.ZodSchema<T>,
    searchParams: URLSearchParams
): ValidationResult<T> {
    const data = Object.fromEntries(searchParams.entries());
    return validateSchema(schema, data);
}

export function validateRequestBody<T>(
    schema: z.ZodSchema<T>,
    body: unknown
): ValidationResult<T> {
    return validateSchema(schema, body);
} 