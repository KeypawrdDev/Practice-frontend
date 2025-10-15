import "@testing-library/jest-dom";
import { vi } from 'vitest';

// Mock the auth module
vi.mock('@/auth', () => ({
  auth: vi.fn(() => Promise.resolve(null)),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));