
export type User = {
    email: string | null,
    uid: string,
    displayName?: string | null,
    emailVerified: boolean,
    isAnonymous: boolean,
    // Add other relevant properties here
  };