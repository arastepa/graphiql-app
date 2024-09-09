import { describe, it, expect } from 'vitest';
import { validationSchemaSignUp } from '@/utils/validate';

describe('validationSchemaSignUp', () => {
  it('should validate a valid user input', async () => {
    const validInput = {
      email: 'test@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };

    await expect(validationSchemaSignUp.validate(validInput)).resolves.toEqual(
      validInput,
    );
  });

  it('should invalidate an invalid email format', async () => {
    const invalidInput = {
      email: 'invalid-email',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Invalid email format.',
    );
  });

  it('should invalidate a missing email', async () => {
    const invalidInput = {
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Email is required.',
    );
  });

  it('should invalidate a password not containing a number', async () => {
    const invalidInput = {
      email: 'test@example.com',
      password: 'Password!',
      confirmPassword: 'Password!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Password must contain at least one number.',
    );
  });

  it('should invalidate a password not containing an uppercase letter', async () => {
    const invalidInput = {
      email: 'test@example.com',
      password: 'password1!',
      confirmPassword: 'password1!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Password must contain at least one uppercase letter.',
    );
  });

  it('should invalidate a password not containing a lowercase letter', async () => {
    const invalidInput = {
      email: 'test@example.com',
      password: 'PASSWORD1!',
      confirmPassword: 'PASSWORD1!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Password must contain at least one lowercase letter.',
    );
  });

  it('should invalidate a password not containing a special character', async () => {
    const invalidInput = {
      email: 'test@example.com',
      password: 'Password1',
      confirmPassword: 'Password1',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Password must contain at least one special character.',
    );
  });

  it('should invalidate a password shorter than 8 characters', async () => {
    const invalidInput = {
      email: 'test@example.com',
      password: 'Pass1!',
      confirmPassword: 'Pass1!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Password must be at least 8 characters long',
    );
  });

  it('should invalidate passwords that do not match', async () => {
    const invalidInput = {
      email: 'test@example.com',
      password: 'Password1!',
      confirmPassword: 'Password2!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Passwords must match.',
    );
  });

  it('should invalidate a missing confirmPassword', async () => {
    const invalidInput = {
      email: 'test@example.com',
      password: 'Password1!',
    };

    await expect(validationSchemaSignUp.validate(invalidInput)).rejects.toThrow(
      'Confirm Password is required.',
    );
  });
});
