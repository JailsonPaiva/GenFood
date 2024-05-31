// src/types/express-session.d.ts
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    supabaseToken?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      session: session.Session & Partial<session.SessionData>;
    }
  }
}
