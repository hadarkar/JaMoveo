import { useAuth } from "../context/useAuth";

const MainPage = () => {
  const { user } = useAuth();

  if (!user) return null; // או להחזיר ספינר בעתיד

  return (
    <div className="p-8">
      {user.role === "admin" ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">🎩 Welcome, Admin {user.name}</h1>
          <p className="text-lg">Here you can manage sessions, users, and monitor activity.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">🎧 Welcome to JaMoveo, {user.name}</h1>
          <p className="text-lg">Join a session, listen to music, or start a new jam!</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
