const spaces = [
  {
    id: 1,
    type: 'stage',
    name: '메인 스테이지',
    capacity: 300,
    desc: '전문 음향·조명 장비를 갖춘 공연용 무대. 밴드, 솔로 아티스트 모두 이용 가능합니다.',
    tags: ['공연', '밴드', '음향'],
  },
  {
    id: 2,
    type: 'stage',
    name: '인디 스테이지',
    capacity: 80,
    desc: '소규모 공연과 쇼케이스에 최적화된 아늑한 라이브 공간입니다.',
    tags: ['인디', '소규모', '쇼케이스'],
  },
  {
    id: 3,
    type: 'rehearsal',
    name: '연습실 A',
    capacity: 6,
    desc: '드럼·앰프·믹서가 완비된 밴드 전용 연습 공간입니다.',
    tags: ['밴드', '드럼', '앰프'],
  },
  {
    id: 4,
    type: 'rehearsal',
    name: '연습실 B',
    capacity: 4,
    desc: '보컬·건반 중심의 소그룹 연습에 적합한 조용한 공간입니다.',
    tags: ['보컬', '건반', '소그룹'],
  },
  {
    id: 5,
    type: 'rehearsal',
    name: '레코딩 부스',
    capacity: 2,
    desc: '방음 처리된 홈 레코딩 수준의 녹음 공간입니다.',
    tags: ['녹음', '보컬', '1인'],
  },
];

export default spaces;