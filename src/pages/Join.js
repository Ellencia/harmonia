import { useState } from 'react';

const GENRES = ['팝', '록', '재즈', 'R&B', '클래식', '힙합', '인디', '기타'];

function Join() {
  const [form, setForm] = useState({ name: '', email: '', genre: '', intro: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="join" id="join">
        <div className="section-container join-success">
          <span className="success-icon">🎉</span>
          <h2>신청이 완료됐어요!</h2>
          <p>{form.name}님, Harmonia 가족이 되신 것을 환영합니다.<br />곧 이메일로 안내드릴게요.</p>
          <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
            돌아가기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="join" id="join">
      <div className="section-container">
        <h2 className="section-title">멤버 신청</h2>
        <p className="section-sub">
          함께 음악을 만들어갈 멤버를 기다리고 있습니다.
        </p>
        <form className="join-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이름 *</label>
            <input
              type="text"
              name="name"
              placeholder="홍길동"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>이메일 *</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>선호 장르</label>
            <select name="genre" value={form.genre} onChange={handleChange}>
              <option value="">선택하세요</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>자기소개</label>
            <textarea
              name="intro"
              placeholder="음악 경력이나 하고 싶은 활동을 자유롭게 적어주세요."
              rows={4}
              value={form.intro}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            신청하기
          </button>
        </form>
      </div>
    </section>
  );
}

export default Join;
