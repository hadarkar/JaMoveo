// SessionProvider.jsx
import { useState } from "react";
import { SessionContext } from "./SessionContext";

export const SessionProvider = ({ children }) => {
  const [hasJoinedSession, setHasJoinedSession] = useState(false);

  return (
    <SessionContext.Provider value={{ hasJoinedSession, setHasJoinedSession }}>
      {children}
    </SessionContext.Provider>
  );
};
