import { useAuth } from "../hooks/useAuth";
import { useSessions } from "../hooks/sessionHooks/useSessions";
import { Trash2, Copy } from "lucide-react";

const SessionList = () => {
  const { user } = useAuth();
  const { sessions, loading, joinSession, deleteSession } = useSessions(user);

  if (loading) return <p className="text-gray-500">טוען סשנים...</p>;

  return (
    <div className="mt-8 w-full max-w-3xl relative">
      {/* 🎵 תו מוזיקה בפינה */}
      <div className="absolute top-0 right-0 text-3xl text-teal-400 opacity-40">🎵</div>

      {sessions.length === 0 ? (
        <p className="text-gray-600 text-lg text-center mt-6">אין סשנים זמינים כרגע.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((s) => (
            <li
              key={s._id}
              className="bg-gradient-to-br from-yellow-100 via-sky-200 to-teal-200 text-gray-800 hover:brightness-105 transition border border-teal-300 shadow-md rounded-2xl px-6 py-5 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="text-xl font-semibold">{s.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => joinSession(s._id)}
                  className="bg-white/80 hover:bg-white text-teal-800 px-5 py-2 rounded-full text-sm font-semibold shadow-md transition transform hover:scale-105"
                >
                  🎤 הצטרף
                </button>

                <button
                  onClick={() => navigator.clipboard.writeText(s._id)}
                  className="p-2 rounded-full hover:bg-yellow-100 transition"
                  title="העתק מזהה סשן"
                >
                  <Copy className="w-5 h-5 text-gray-600" />
                </button>

                {user?.isAdmin && (
                  <button
                    onClick={() => {
                      if (confirm("האם אתה בטוח שברצונך למחוק את הסשן?")) {
                        deleteSession(s._id);
                      }
                    }}
                    className="p-2 rounded-full hover:bg-red-100 transition"
                    title="מחק סשן"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionList;
