import { useLiveSong } from "../hooks/useLiveSong";

const LivePage = () => {
  const { song } = useLiveSong();

  if (!song) return <div className="p-8">Waiting for song...</div>;

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">{song.title}</h1>
      <div className="flex justify-center gap-4 text-4xl">
        {song.chords.map((chord, i) => (
          <span key={i}>{chord}</span>
        ))}
      </div>
    </div>
  );
};

export default LivePage;
