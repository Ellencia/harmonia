import { useState, useEffect, useRef } from 'react';

function getWaveClipPath(progress, offset, isMobile) {
  const amplitude = isMobile ? 14 : 8;
  const cycles   = isMobile ? 2.4 : 4;   // 모바일: 주기 줄여서 ~30% 압축률
  const yCenter  = (100 + amplitude) - progress * (100 + amplitude * 2) / 100;
  const steps    = 40;

  const points = ['0% 100%', '100% 100%'];

  for (let i = steps; i >= 0; i--) {
    const x = (i / steps) * 100;
    const y = yCenter + Math.sin((i / steps) * Math.PI * cycles + offset) * amplitude;
    points.push(`${x}% ${Math.max(0, Math.min(100, y))}%`);
  }

  return `polygon(${points.join(', ')})`;
}

function LoadingSplash({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [fading, setFading] = useState(false);
  const waveRafRef = useRef(null);
  const isMobile = useRef(window.innerWidth <= 640).current;

  // 물결 수평 이동 애니메이션 (독립적으로 계속 실행)
  useEffect(() => {
    const animateWave = () => {
      setWaveOffset((prev) => prev + 0.06);
      waveRafRef.current = requestAnimationFrame(animateWave);
    };
    waveRafRef.current = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(waveRafRef.current);
  }, []);

  // 로딩 진행도 애니메이션
  useEffect(() => {
    const duration = 1800;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setProgress(Math.floor(eased * 100));

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => setFading(true), 200);
        setTimeout(onDone, 800);
      }
    };

    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div className={`splash${fading ? ' splash-fade' : ''}`}>
      <div className="splash-content">
        <div className="splash-text-wrapper">
          <p className="splash-logo splash-logo-empty">音眞人</p>
          <p
            className="splash-logo splash-logo-fill"
            style={{ clipPath: getWaveClipPath(progress, waveOffset, isMobile) }}
          >
            音眞人
          </p>
        </div>
        <p className="splash-tagline">Music Community & Space</p>
        <p className="splash-percent">{progress}%</p>
      </div>
    </div>
  );
}

export default LoadingSplash;
