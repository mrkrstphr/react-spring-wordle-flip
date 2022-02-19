import { useState } from 'react';
import { useTrail, a } from '@react-spring/web';
import './App.css';

enum MatchType {
  None = 'none',
  Partial = 'partial',
  Full = 'full',
}

type LetterResult = {
  letter: string;
  match: MatchType;
};

type FlipperProps = {
  flipped: boolean;
  word: LetterResult[];
};

const Flipper = ({ flipped, word }: FlipperProps) => {
  const trail = useTrail(word.length, {
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="word-container">
      {trail.map(({ opacity, transform }, index) => (
        <div className="letter-container" key={`letter-${word[index]}-${index}`}>
          <a.div className="guess letter" style={{ opacity: opacity.to((o) => 1 - o), transform }}>
            {word[index].letter}
          </a.div>
          <a.div
            className={`result result-${word[index].match} letter`}
            style={{
              opacity,
              transform,
              rotateX: '180deg',
            }}
          >
            {word[index].letter}
          </a.div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <h1>A Wordle-style Flip Animation</h1>

      <p>
        This code uses <a href="https://react-spring.io/">react-spring</a> to create a{' '}
        <a href="https://www.nytimes.com/games/wordle">Wordle</a> style flip-to-see-results
        animation.
      </p>

      <Flipper
        flipped={flipped}
        word={[
          { letter: 'B', match: MatchType.None },
          { letter: 'L', match: MatchType.Partial },
          { letter: 'A', match: MatchType.Partial },
          { letter: 'S', match: MatchType.None },
          { letter: 'T', match: MatchType.Full },
        ]}
      />

      <div className="button-container">
        <button type="button" onClick={() => setFlipped((curr) => !curr)}>
          Flip
        </button>
      </div>
    </div>
  );
}
