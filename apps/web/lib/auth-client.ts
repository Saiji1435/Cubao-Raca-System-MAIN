// apps/web/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
// Import the specific types TS is complaining about
import type { SessionQueryParams } from "better-auth/client"; 

const client = createAuthClient({
    baseURL: "http://localhost:3001",
});

// Explicitly type the exports to satisfy the 'portable' requirement
export const authClient = client;

// For the hooks, use the explicit return types from the client
export const useSession: typeof client.useSession = client.useSession;
export const signIn: typeof client.signIn = client.signIn;
export const signUp: typeof client.signUp = client.signUp;
export const signOut: typeof client.signOut = client.signOut;