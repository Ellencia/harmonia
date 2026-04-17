import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import spaces from '../data/spaces';

const TIME_SLOTS = [
  '00:00', '01:00', '02:00', '03:00', '04:00',
  '05:00', '06:00', '07:00', '08:00', '09:00',
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00', '24:00',
];

function getSlotState(slot, startTime, endTime) {
  if (slot === startTime) return 'slot-start';
  if (slot === endTime) return 'slot-end';
  if (startTime && endTime && slot > startTime && slot < endTime) return 'slot-in-range';
  return '';
}

function getDuration(startTime, endTime) {
  if (!startTime || !endTime) return '';
  const diff = parseInt(endTime) - parseInt(startTime);
  return `${diff}시간`;
}

function ReservationDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const room = spaces.find((s) => s.id === parseInt(roomId));

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // 나중에 백엔드 연동 시 이 useEffect에서 해당 방의 예약 현황을 fetch합니다
  // useEffect(() => {
  //   fetch(`/api/reservations?roomId=${roomId}&date=${date}`)
  //     .then(res => res.json())
  //     .then(data => setBookedSlots(data.bookedSlots));
  // }, [roomId, date]);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDateObj = new Date(today);
  maxDateObj.setMonth(maxDateObj.getMonth() + 2);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const duration = getDuration(startTime, endTime);
  const canSubmit = date && startTime && endTime && name && phone;

  const handleSlotClick = (slot) => {
    if (!date) return;
    if (!startTime || (startTime && endTime)) {
      setStartTime(slot);
      setEndTime('');
    } else {
      if (slot <= startTime) {
        setStartTime(slot);
        setEndTime('');
      } else {
        setEndTime(slot);
      }
    }
  };

  // 존재하지 않는 roomId면 목록으로 리다이렉트
  useEffect(() => {
    if (!room || room.type !== 'rehearsal') {
      navigate('/reservation', { replace: true });
    }
  }, [room, navigate]);

  if (!room) return null;

  if (submitted) {
    return (
      <section className="reservation-page">
        <div className="section-container">
          <div className="resv-detail">
            <div className="resv-submitted">
              <div className="resv-submitted-icon">✅</div>
              <h2>신청이 접수되었습니다</h2>
              <p>
                <strong>{room.name}</strong> · {date}<br />
                {startTime} ~ {endTime} ({duration})<br />
                담당자가 확인 후 연락드리겠습니다.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/reservation')}>
                ← 연습실 목록으로
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reservation-page">
      <div className="section-container">
        <div className="resv-detail">
          <button className="back-link resv-back-btn" onClick={() => navigate('/reservation')}>
            ← 연습실 목록으로
          </button>

          <div className="resv-detail-header">
            <h1 className="section-title">{room.name}</h1>
            <p className="section-sub">{room.desc}</p>
            <div className="space-tags" style={{ justifyContent: 'center' }}>
              <span className="resv-cap-badge">최대 {room.capacity}인</span>
              {room.tags.map((t) => <span className="tag" key={t}>#{t}</span>)}
            </div>
          </div>

          <div className="resv-form-card">

            {/* 날짜 선택 */}
            <div className="resv-form-section">
              <h3 className="resv-form-label">날짜 선택</h3>
              <input
                type="date"
                className="resv-date-input"
                value={date}
                min={minDate}
                max={maxDate}
                onChange={(e) => { setDate(e.target.value); setStartTime(''); setEndTime(''); }}
              />
            </div>

            {/* 시간 범위 선택 */}
            <div className="resv-form-section">
              <div className="resv-time-header">
                <h3 className="resv-form-label">이용 시간</h3>
                <div className="resv-time-summary">
                  {startTime && endTime ? (
                    <span className="resv-time-result">
                      {startTime} ~ {endTime}
                      <strong> · {duration}</strong>
                    </span>
                  ) : startTime ? (
                    <span className="resv-time-hint-inline">종료 시간을 선택해주세요</span>
                  ) : (
                    <span className="resv-time-hint-inline">시작 시간을 먼저 클릭하세요</span>
                  )}
                </div>
              </div>

              <div className={`resv-time-grid ${!date ? 'disabled' : ''}`}>
                {TIME_SLOTS.map((slot) => {
                  const state = getSlotState(slot, startTime, endTime);
                  return (
                    <button
                      key={slot}
                      className={`resv-time-slot ${state}`}
                      onClick={() => handleSlotClick(slot)}
                      disabled={!date}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {!date && <p className="resv-hint">날짜를 먼저 선택해주세요</p>}
            </div>

            {/* 예약자 정보 */}
            <div className="resv-form-section">
              <h3 className="resv-form-label">예약자 정보</h3>
              <div className="resv-fields">
                <input
                  className="resv-input"
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="resv-input"
                  type="tel"
                  placeholder="연락처 (010-0000-0000)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <button
              className={`btn btn-primary resv-submit-btn ${canSubmit ? '' : 'disabled'}`}
              onClick={() => canSubmit && setSubmitted(true)}
            >
              예약 신청하기
            </button>
            {!canSubmit && <p className="resv-hint center">모든 항목을 선택·입력해주세요</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationDetail;
