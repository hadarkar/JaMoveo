// יצירת socket אחד בלבד – ניתן לייבא מכל מקום
import { io } from "socket.io-client";
export const socket = io("http://localhost:3001");
