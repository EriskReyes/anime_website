import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68bb51457d1e7c99b945dd6d", 
  requiresAuth: true // Ensure authentication is required for all operations
});
