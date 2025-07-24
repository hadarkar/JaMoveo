// useSessionStatus.js
import { useContext } from "react";
import { SessionContext } from "../context/SessionContext.js";

export const useSessionStatus = () => useContext(SessionContext);
