const LyricsDisplay = ({ lyrics, instrument }) => {
  return (
    <div
      className="max-h-[75vh] overflow-y-auto space-y-10 mt-10 pr-3"
      dir="auto"
    >
      {lyrics.map((line, i) => (
        <div
          key={i}
          className="flex flex-wrap gap-x-6 min-h-[120px] justify-center"
        >
          {line.map((wordObj, j) => (
            <div
              key={j}
              className="flex flex-col items-center min-w-[60px]"
            >
              {instrument !== "singer" && (
                <span className="text-xl text-blue-700 font-bold">
                  {wordObj.chords || "\u00A0"}
                </span>
              )}
              <span className="text-4xl font-semibold">
                {wordObj.lyrics}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LyricsDisplay;
