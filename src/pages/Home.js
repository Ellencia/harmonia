function Home() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-eyebrow">🎶 Music Community & Space</p>
        <h1 className="hero-title">
          음악을 사랑하는<br />모든 이들을 위한 공간
        </h1>
        <p className="hero-desc">
          음진인은 뮤지션들이 모이고, 연습하고, 무대에 서는<br />
          커뮤니티 기반 음악 법인입니다.
        </p>
        <div className="hero-actions">
          <a href="#spaces" className="btn btn-primary">공간 둘러보기</a>
          <a href="#join" className="btn btn-outline">멤버 신청</a>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <span className="stat-num">2+</span>
          <span className="stat-label">공연 무대</span>
        </div>
        <div className="stat">
          <span className="stat-num">3+</span>
          <span className="stat-label">연습 공간</span>
        </div>
        <div className="stat">
          <span className="stat-num">∞</span>
          <span className="stat-label">음악의 가능성</span>
        </div>
      </div>
    </section>
  );
}

export default Home;
