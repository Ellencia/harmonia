import { Link } from 'react-router-dom';
import spaces from '../data/spaces';

const rehearsalRooms = spaces.filter((s) => s.type === 'rehearsal');

function Reservation() {
  return (
    <section className="reservation-page">
      <div className="section-container">

        {/* 헤더 */}
        <div className="resv-header">
          <Link to="/" className="back-link">← 홈으로</Link>
          <h1 className="section-title">연습실 예약</h1>
          <p className="section-sub">
            Harmonia의 연습 공간을 자유롭게 예약하세요.<br />
            멤버라면 누구나 이용할 수 있습니다.
          </p>
        </div>

        {/* 공간 카드 목록 */}
        <div className="resv-rooms">
          {rehearsalRooms.map((room) => (
            <div className="resv-room-card" key={room.id}>
              <div className="resv-room-info">
                <h2 className="resv-room-name">{room.name}</h2>
                <p className="resv-room-desc">{room.desc}</p>
                <p className="resv-room-cap">최대 {room.capacity}인</p>
                <div className="space-tags">
                  {room.tags.map((t) => (
                    <span className="tag" key={t}>#{t}</span>
                  ))}
                </div>
              </div>
              <div className="resv-room-action">
                <span className="resv-coming-badge">예약 기능 준비 중</span>
                <p className="resv-coming-desc">
                  무인 예약 시스템을 구축 중입니다.<br />
                  곧 이 공간을 직접 예약할 수 있어요.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 안내 배너 */}
        <div className="resv-notice">
          <span className="resv-notice-icon">🔧</span>
          <div>
            <strong>무인 예약 시스템 오픈 예정</strong>
            <p>회원가입 후 24시간 온라인으로 예약·결제·입장까지 가능한 무인 운영 시스템을 준비 중입니다.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Reservation;
