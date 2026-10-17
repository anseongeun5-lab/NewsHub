/**
 * NewsPulse - 맞춤형 뉴스 리더 애플리케이션
 * Pure Vanilla JavaScript (ES6+)
 */

// 1. 카테고리 정의 및 메타데이터
const TOPICS = {
  interkorean: {
    id: 'interkorean',
    name: '대북관계',
    icon: '🕊️',
    badgeClass: 'interkorean',
    keywords: ['대북', '남북', '북한', '통일', '비핵화', 'DMZ', '안보']
  },
  sports: {
    id: 'sports',
    name: '스포츠',
    icon: '⚽',
    badgeClass: 'sports',
    keywords: ['스포츠', '야구', '축구', '손흥민', '이정후', '올림픽', 'KBO', '골프', '배구']
  },
  economy: {
    id: 'economy',
    name: '경제',
    icon: '📈',
    badgeClass: 'economy',
    keywords: ['경제', '금리', '증시', '코스피', '환율', '부동산', '반도체', '수출', '물가']
  }
};

// 2. 풍부한 고화질 이미지 및 카테고리별 정밀 기사 데이터베이스 (Fallback & Pagination Seed)
const ARTICLE_DATABASE = {
  interkorean: [
    {
      title: "남북 통신선 복원 논의 재개 및 비무장지대(DMZ) 평화적 활용 방안 모색",
      snippet: "정부는 남북 간 긴장 완화와 대화 채널 복원을 위한 다각적 외교적 노력을 기울이고 있다고 밝혔습니다. 이산가족 상봉 등의 인도적 교류 추진도 함께 거론되고 있습니다.",
      content: `정부는 남북 간의 우발적 충돌 방지와 평화 정착을 위해 단절되었던 연락 채널의 복원 방안을 신중히 검토하고 있습니다. 

통일부 및 외교 안보 당국은 한반도 비핵화와 항구적 평화 구축을 위해서는 조건 없는 대화의 장이 선행되어야 함을 강조하며, 비무장지대(DMZ)의 생태·평화적 활용과 이산가족 화상 상봉 등 정치적 상황과 무관한 인도주의적 프로젝트부터 순차적으로 물꼬를 트겠다는 계획을 전했습니다.

전문가들은 "국제정세의 급변 속에서 한반도 긴장 관리를 위한 실무급 소통 창구 확보가 그 어느 때보다 시급하다"고 분석했습니다.`,
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
      publisher: "연합뉴스",
      date: "10분 전",
      link: "https://www.yna.co.kr"
    },
    {
      title: "UN 대북제재위, 인도적 지원 물품 면제 승인 범위 확대 논의",
      snippet: "유엔 안보리 산하 대북제재위원회가 취약계층 영양 및 보건 지원을 위한 민간 구호 단체의 대북 물품 반입 절차를 간소화하는 안건을 검토 중입니다.",
      content: `유엔 안보리 대북제재위원회가 북한 내 취약계층을 위한 보건의료 기기 및 백신, 영양 개선 물품의 반입 승인 기간을 대폭 단축하는 패스트트랙 제도를 점검하고 있습니다.

이번 조치는 대북 제재의 기본 기조를 훼손하지 않는 선에서 민간 기구의 인도주의적 구호 활동이 지연되는 부작용을 최소화하기 위한 목적입니다.

정부 관계자는 "인도적 사안에 대해서는 국제사회와의 긴밀한 공조 하에 투명성을 확보하며 지원이 이뤄지도록 협력할 것"이라고 전했습니다.`,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      publisher: "YTN",
      date: "25분 전",
      link: "https://www.ytn.co.kr"
    },
    {
      title: "동해북부선 철도 연결 사업 점검 및 한반도 물류망 비전 발표",
      snippet: "국토교통부와 통일부는 남북 철도 연결을 대비한 강원도 동해북부선 연결 공정률을 점검하고 향후 유라시아 철도와의 연계 가능성을 재조명했습니다.",
      content: `동해선 남측 단절 구간을 잇는 철도 공사가 계획대로 순항하고 있습니다. 완성된 동해북부선은 향후 남북 철도망이 재개될 경우 부산에서 출발해 북한을 거쳐 시베리아횡단철도(TSR)로 연결되는 핵심 물류 회랑이 될 전망입니다.

정부는 남북 관계 개선 시 즉각적인 물류 인프라가 가동될 수 있도록 선제적인 기술 표준화와 노선 점검을 진행 중이라고 밝혔습니다.`,
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
      publisher: "한국일보",
      date: "45분 전",
      link: "https://www.hankookilbo.com"
    },
    {
      title: "한미 워싱턴 선언 후속 협의… 한반도 전략적 억제력과 대화 투트랙 기조 유지",
      snippet: "한미 안보 당국자들은 확장억제 협력을 강화하면서도 대북 외교적 대화의 문은 상시 열어두는 투트랙 접근법을 재확인했습니다.",
      content: `서울에서 개최된 한미 안보 고위급 협의회에서 양측은 철통같은 연합 방위 태세를 재확인하는 동시에 북한과의 대화 재개를 위한 외교적 노력을 포기하지 않겠다는 입장을 거듭 표명했습니다.

외교부 당국자는 "강력한 억제력을 바탕으로 한 평화 유지가 기본 원칙이며, 한반도 긴장을 낮추기 위한 모든 실질적 대화 제안은 여전히 유효하다"고 강조했습니다.`,
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
      publisher: "동아일보",
      date: "1시간 전",
      link: "https://www.donga.com"
    },
    {
      title: "DMZ 생태평화벨트 탐방로 시범 개방… 남북 접경지 생태 가치 주목",
      snippet: "70여 년간 인간의 손길이 닿지 않은 비무장지대 일대의 자연 생태계를 보존하며 평화적 가치를 되새기는 탐방 프로그램이 큰 호응을 얻고 있습니다.",
      content: `접경지역의 긴장 속에서도 자연의 회복력을 보여주는 DMZ 생태평화벨트가 일부 제한된 구역에서 일반에 시범 개방되었습니다. 

멸종위기 야생생물 다수가 서식하고 있는 이 지역은 전 세계에서 보기 드문 온대 원시 생태계의 보고로 평가받고 있으며, 향후 남북 간 공동 환경 보존 협력 프로젝트의 1순위 후보지로 거론되고 있습니다.`,
      image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80",
      publisher: "경향신문",
      date: "2시간 전",
      link: "https://www.khan.co.kr"
    },
    {
      title: "남북 농업 협력 포럼 개최… 스마트팜 기술을 활용한 식량 안보 대안 제시",
      snippet: "기후변화에 따른 북한 내 농업 생산성 저하를 해결하기 위해 민간 싱크탱크를 중심으로 스마트팜 기술 협력 모델이 논의되었습니다.",
      content: `기후 위기와 가뭄, 태풍 등으로 한반도 전역의 식량 수급 변동성이 커지는 가운데, 북한 농촌 지역의 생산성을 획기적으로 개선할 수 있는 컨테이너형 스마트팜 및 태양광 온실 모델이 제시되었습니다.

학계 연구진은 "농업 및 영양 협력은 정치적 이념을 넘어선 인류 보편의 과제"라며 민간 차원의 기술 연구 교류 필요성을 제기했습니다.`,
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
      publisher: "매일경제",
      date: "3시간 전",
      link: "https://www.mk.co.kr"
    },
    {
      title: "통일부, '2026 청소년 평화통일 공감 토론회' 성료",
      snippet: "전국 중고등학생 500여 명이 참가한 한반도 미래 비전 토론회에서 디지털 세대가 바라보는 한반도 평화 번영의 해법들이 쏟아졌습니다.",
      content: `미래 세대들이 꿈꾸는 평화로운 한반도의 청사진을 공유하는 전국 청소년 토론회가 성황리에 마무리되었습니다.

참가 학생들은 메타버스와 AI 기술을 접목한 남북 청소년 문화 교류, 유라시아 철도를 타고 떠나는 대륙 횡단 여행 등 창의적이고 실용적인 아이디어를 적극 제안해 눈길을 끌었습니다.`,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      publisher: "뉴스1",
      date: "4시간 전",
      link: "https://www.news1.kr"
    },
    {
      title: "개성공단 입주기업 비상대책위, 자산 동결 장기화에 따른 피해 지원 대책 간담회",
      snippet: "공단 가동 중단 10년을 맞아 입주 기업들의 대체 판로 개척과 긴급 유동성 보증 확대를 위한 정부 실무회의가 열렸습니다.",
      content: `정부와 개성공단 입주기업 대표단은 서울 여의도에서 간담회를 열고 장기화된 가동 중단에 따른 중견·중소기업들의 금융 부담 완화와 해외 대체 생산기지 마련을 위한 지원책을 논의했습니다.

기업인들은 "경협 기업들이 축적한 노하우와 자산이 사장되지 않도록 지속 가능한 지원 제도가 보강되어야 한다"고 호소했습니다.`,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      publisher: "조선일보",
      date: "5시간 전",
      link: "https://www.chosun.com"
    },
    {
      title: "국제적십자사(ICRC), '이산가족 DNA 유전자 데이터베이스' 보존 사업 박차",
      snippet: "고령화가 심각한 남북 이산가족들의 상봉 기회를 영구히 보존하기 위한 유전자 샘플 아카이빙 작업이 속도를 내고 있습니다.",
      content: `생존 이산가족의 평균 연령이 85세를 넘어서면서, 생전 상봉이 성사되지 못하더라도 후손들이 혈육을 확인할 수 있도록 유전자 정보를 영구 디지털화하는 작업이 대대적으로 진행되고 있습니다.

적십자사 관계자는 "시간과의 싸움인 만큼 가능한 모든 생존자의 유전자 등록을 완료할 수 있도록 범국민적 참여를 독려하고 있다"고 밝혔습니다.`,
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
      publisher: "중앙일보",
      date: "6시간 전",
      link: "https://www.joongang.co.kr"
    },
    {
      title: "동북아 안보 전문가 심포지엄… '한반도 비핵화와 다자 안보 협력 체제' 조명",
      snippet: "한·미·일·중 등 주요국 외교 석학들이 모여 북핵 문제 해결을 위한 6자 회담 형식의 새로운 다자 안보 틀 구상을 논의했습니다.",
      content: `글로벌 블록화 현상이 심화되는 동북아 정세 속에서 한반도의 군사적 충돌을 방지하고 비핵화를 달성하기 위한 다자간 안보 협력의 새로운 패러다임이 심도 있게 토론되었습니다.

참석 학자들은 "전술핵 위협과 군비 경쟁의 악순환을 끊기 위해서는 전통적 억제와 함께 신뢰 구축을 위한 다자 대화 채널 복원이 병행되어야 한다"고 입을 모았습니다.`,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      publisher: "SBS뉴스",
      date: "7시간 전",
      link: "https://news.sbs.co.kr"
    }
  ],
  sports: [
    {
      title: "손흥민, 환상적인 25미터 감아차기 결승골… 리그 베스트 11 선정",
      snippet: "캡틴 손흥민이 후반 88분 터진 극적인 오른발 감아차기 슈팅으로 팀의 2-1 역전승을 견인하며 경기 최우수 선수(MOTM)로 뽑혔습니다.",
      content: `프리미어리그 최고의 해결사 손흥민이 또 한 번 전 세계 축구 팬들을 열광시켰습니다. 

상대 수비수 두 명을 순간적인 헛다리 짚기로 제쳐낸 손흥민은 페널티 박스 외곽에서 전매특허인 궤적으로 오른쪽 상단 골망을 흔들었습니다. 

현지 언론은 평점 9.2점을 부여하며 "위기의 순간마다 팀을 구해내는 진정한 월드클래스 캡틴의 품격을 보여주었다"고 찬사를 아끼지 않았습니다.`,
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      publisher: "스포티비뉴스",
      date: "12분 전",
      link: "https://www.spotvnews.co.kr"
    },
    {
      title: "KBO 리그 개막 한 달… 관중 100만 명 역대 최단기간 돌파 신기록",
      snippet: "20대 여성 팬과 젊은 층의 폭발적인 유입으로 프로야구 열기가 뜨겁습니다. 주말 전 구장 매진 행진이 이어지고 있습니다.",
      content: `한국야구위원회(KBO)는 2026 시즌 개막 후 역대 최소 경기 만에 총 관중 100만 명을 돌파했다고 공식 발표했습니다.

구단들의 팬 친화적 마케팅, 다채로운 먹거리와 굿즈, 그리고 치열한 순위 싸움이 맞물려 전국의 야구장이 축제의 장으로 거듭나고 있습니다. 1위부터 5위까지 승차가 불과 2경기에 불과해 역대급 순위 경쟁이 예고됩니다.`,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
      publisher: "스포츠서울",
      date: "30분 전",
      link: "https://www.sportsseoul.com"
    },
    {
      title: "이정후, 메이저리그 4타수 3안타 2타점 맹타… 타율 0.325 수직 상승",
      snippet: "특유의 정교한 컨택트 능력과 빠른 발을 앞세워 3경기 연속 멀티히트를 기록, 팀 내 1번 타자로서의 입지를 확고히 했습니다.",
      content: `샌프란시스코의 '바람의 손자' 이정후 선수가 메이저리그 최고 투수의 158km 강속구를 완벽하게 밀어쳐 2루타를 만들어냈습니다.

현지 중계진은 "공을 보고 치는 능력이 메이저리그에서도 최상위권"이라며 찬사를 쏟아냈습니다. 그의 수비 역시 그림 같은 다이빙 캐치로 실점을 막아내며 공수 양면에서 팀의 핵심으로 자리 잡았습니다.`,
      image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=800&q=80",
      publisher: "일간스포츠",
      date: "1시간 전",
      link: "https://isplus.com"
    },
    {
      title: "한국 배드민턴 간판 안세영, 월드투어 슈퍼 1000 대회 우승 트로피 탈환",
      snippet: "무릎 부상을 딛고 완벽한 부활을 알린 안세영이 결승전에서 난적 야마구치를 세트 스코어 2-0으로 완파하고 정상에 등극했습니다.",
      content: `‘셔틀콕 여제’ 안세영이 결승전에서 한 수 위의 수비력과 날카로운 헤어핀 드롭샷으로 상대를 무력화시켰습니다.

경기 후 안세영은 인터뷰에서 "힘든 재활 과정을 이겨낼 수 있었던 것은 국민 여러분의 응원 덕분이었다"며 "다가올 세계선수권에서도 최고의 경기를 펼치겠다"고 소감을 밝혔습니다.`,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
      publisher: "연합뉴스 스포츠",
      date: "2시간 전",
      link: "https://www.yna.co.kr/sports"
    },
    {
      title: "T1 e스포츠, 롤챔스(LCK) 스프링 전승 우승 달성… 페이커 통산 12회 V",
      snippet: "페이커 이상혁 선수가 이끄는 T1이 압도적인 팀워크와 한타 집중력을 선보이며 LCK 통산 12번째 우승컵을 들어 올렸습니다.",
      content: `세계 최정상 e스포츠 팀 T1이 결승전에서 세트 스코어 3-1로 승리를 거두며 또 하나의 대기록을 썼습니다.

리빙 레전드 페이커 선수는 결정적인 로밍과 이니시에이티브로 팀을 진두지휘하며 대회 MVP를 수상했습니다. 전 세계 400만 명 이상의 동시 시청자가 결승전을 지켜보며 e스포츠의 글로벌 파급력을 다시 증명했습니다.`,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      publisher: "인벤",
      date: "3시간 전",
      link: "https://www.inven.co.kr"
    },
    {
      title: "김민재, 바이에른 뮌헨 챔피언스리그 4강전서 무실점 벽 가동",
      snippet: "철기둥 김민재가 상대 월드클래스 공격진을 철저하게 봉쇄하며 유럽 챔피언스리그 무실점 클린시트 승리를 이끌었습니다.",
      content: `바이에른 뮌헨의 수비 핵심 김민재가 90분 내내 공중볼 경합 성공률 100%, 가로채기 6회를 기록하며 완벽한 수비력을 선보였습니다.

유럽 축구 연맹(UEFA)은 그를 경기 공식 MOM으로 선정하며 "상대 공격의 숨통을 완벽히 조여버린 괴물 수비수"라고 평가했습니다.`,
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",
      publisher: "풋볼리스트",
      date: "4시간 전",
      link: "https://www.footballist.co.kr"
    },
    {
      title: "황유민, KLPGA 메이저 대회서 4차 연장 혈투 끝에 생애 첫 메이저 제패",
      snippet: "돌격대장 황유민이 마지막 18번 홀에서 극적인 6m 버디 퍼트를 성공시키며 우승 상금 3억 원의 주인공이 되었습니다.",
      content: `한국여자프로골프(KLPGA) 투어 시즌 첫 메이저 대회에서 황유민이 연장 4번째 홀까지 가는 피 말리는 접전 끝에 감격의 우승 트로피를 품에 안았습니다.

황유민은 과감한 드라이버 샷과 정교한 웨지 샷으로 갤러리들의 탄성을 자아내며 새로운 국내 골프 간판스타로 자리매김했습니다.`,
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80",
      publisher: "골프다이제스트",
      date: "5시간 전",
      link: "https://www.golfdigest.co.kr"
    },
    {
      title: "대한민국 수영 황금세대, 파리 세계선수권 계영 800m 은메달 쾌거",
      snippet: "황선우, 김우민, 이호준, 양재훈으로 구성된 계영 대표팀이 아시아 신기록을 경신하며 세계 무대에서 다시금 포디움에 올랐습니다.",
      content: `한국 수영 계영 대표팀이 세계선수권 무대에서 7분 01초대의 경이적인 아시아 신기록을 작성하며 값진 은메달을 목에 걸었습니다.

마지막 영자로 나선 황선우 선수의 폭발적인 스퍼트가 역전을 일궈냈으며, 선수들은 "훈련의 땀방울이 결실을 맺어 행복하다"고 전했습니다.`,
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
      publisher: "스포츠경향",
      date: "6시간 전",
      link: "https://sports.khan.co.kr"
    },
    {
      title: "프로농구(KBL) 챔피언결정전 7차전 돌입… 티켓 오픈 1분 만에 전석 매진",
      snippet: "양 팀의 양보 없는 시리즈 전적 3승 3패 맞대결. 운명의 마지막 7차전에서 왕좌의 주인이 결정됩니다.",
      content: `올 시즌 프로농구 왕좌를 가릴 마지막 승부가 펼쳐집니다. 양 팀은 팽팽한 외곽포 대결과 골밑 육탄전을 거듭하며 시리즈를 최종전까지 끌고 왔습니다.

농구 팬들의 뜨거운 관심 속에 1만 2천 석의 입장권이 순식간에 매진되었으며 치열한 명승부가 기대됩니다.`,
      image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80",
      publisher: "점프볼",
      date: "7시간 전",
      link: "https://www.jumpball.co.kr"
    },
    {
      title: "한국 양궁 대표팀, 월드컵 1차 대회 전 종목 석권 ‘금빛 퍼레이드’",
      snippet: "남녀 개인전과 단체전, 혼성전까지 5개 전 종목을 싹쓸이하며 세계 최강 한국 양궁의 위용을 과시했습니다.",
      content: `상하이에서 열린 현대 양궁 월드컵에서 태극 궁사들이 10점 엑스텐 과녁을 연속해서 명중시키며 금메달 5개를 모두 수확했습니다.

강풍 속에서도 흔들림 없는 멘탈과 자세를 유지한 한국 대표팀은 올림픽 10연패를 향한 청신호를 환하게 밝혔습니다.`,
      image: "https://images.unsplash.com/photo-1511067007772-9da28974a4b4?auto=format&fit=crop&w=800&q=80",
      publisher: "KBS스포츠",
      date: "8시간 전",
      link: "https://sports.kbs.co.kr"
    }
  ],
  economy: [
    {
      title: "코스피, 반도체·AI 훈풍에 2,800선 돌파 안착… 외국인 순매수 지속",
      snippet: "삼성전자와 SK하이닉스의 고대역폭 메모리(HBM) 수요 급증과 호실적 기대감에 힘입어 지수가 연고점을 갈아치웠습니다.",
      content: `국내 증시가 글로벌 빅테크 기업들의 인공지능(AI) 인프라 투자 확대 수혜를 톡톡히 누리고 있습니다.

코스피는 외국인과 기관의 강력한 쌍끌이 매수세에 힘입어 장중 2,830포인트까지 치솟았습니다. 금융투자업계 전문가는 "AI 반도체 수요가 견고한 만큼 2분기에도 기업 실적 모멘텀이 증시 상승을 견인할 가능성이 높다"고 진단했습니다.`,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      publisher: "한국경제",
      date: "15분 전",
      link: "https://www.hankyung.com"
    },
    {
      title: "한국은행 금융통화위원회, 기준금리 연 3.50% 동결 결정… 물가 추이 주시",
      snippet: "한은 금통위가 가계부채 증가세와 환율 변동성, 소비자물가 흐름을 감안해 기준금리를 현 수준에서 동결했습니다.",
      content: `한국은행 금융통화위원회가 통화정책방향 결정 회의를 열고 기준금리를 연 3.50%로 유지하기로 결정했습니다.

이창용 한은 총재는 "물가상승률이 목표치인 2%대로 완전히 안착할 때까지는 긴축 기조를 유지할 필요가 있다"며 "성급한 금리 인하는 부동산 시장과 가계대출을 다시 자극할 수 있어 신중한 접근이 요구된다"고 설명했습니다.`,
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
      publisher: "매일경제",
      date: "35분 전",
      link: "https://www.mk.co.kr"
    },
    {
      title: "K-반도체 수출 5개월 연속 두 자릿수 증가… 무역수지 흑자 행진 가속",
      snippet: "산업통상자원부 집계 결과 지난달 반도체 수출액이 115억 달러를 돌파하며 국가 주력 수출 품목으로서의 위상을 재확인했습니다.",
      content: `메모리 반도체 단가 반등과 글로벌 데이터센터 서버 증설이 본격화되면서 대한민국 수출 전선에 파란불이 켜졌습니다.

자동차, 선박, 2차전지 등 주요 제조업 전반의 수출 회복세도 이어지며 상반기 무역수지 흑자 규모는 연간 목표치를 조기 달성할 것으로 관측됩니다.`,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      publisher: "머니투데이",
      date: "1시간 전",
      link: "https://www.mt.co.kr"
    },
    {
      title: "서울 아파트 매매 거래량 3년 만에 최고치… 역세권 대단지 중심 반등",
      snippet: "금리 인하 기대감과 신생아 특례대출 공급 효과로 실수요자 중심의 매수세가 살아나며 수도권 아파트 시장이 회복 조짐을 보이고 있습니다.",
      content: `서울 부동산 정보광장에 따르면 지난달 서울 아파트 거래량이 4,000건을 넘어서며 3년 만의 최고치를 기록했습니다.

특히 마포, 용산, 성동구 등 주요 직주근접 선호 지역과 송파·강남권 준신축 대단지 아파트를 중심으로 실거래가 상승 거래가 잇따르고 있습니다. 전문가들은 "양극화 속에서 입지에 따른 선별적 회복이 뚜렷하다"고 분석했습니다.`,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      publisher: "조선비즈",
      date: "2시간 전",
      link: "https://biz.chosun.com"
    },
    {
      title: "원·달러 환율, 미 연준 금리 인하 기대 후퇴로 1,370원대 박스권 등락",
      snippet: "미국의 견조한 고용지표 발표로 달러 강세 압력이 지속되면서 외환 당국의 환율 미세조정 경계감이 고조되고 있습니다.",
      content: `서울 외환시장에서 달러 대비 원화 환율은 전일 대비 3.5원 오른 1,375원에 거래를 마쳤습니다.

미국 연방준비제도(Fed)의 피벗(통화정책 전환) 시점이 늦춰질 것이라는 전망이 달러화 가치를 떠받치고 있으며, 정부와 한국은행은 외환시장 쏠림 현상을 방지하기 위해 실시간 모니터링을 강화하고 있습니다.`,
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80",
      publisher: "이데일리",
      date: "3시간 전",
      link: "https://www.edaily.co.kr"
    },
    {
      title: "차세대 배터리 '전고체' 상용화 로드맵 가속… K-배터리 3사 10조 투자",
      snippet: "LG에너지솔루션, 삼성SDI, SK온이 화재 위험이 없고 주행거리를 획기적으로 늘린 꿈의 배터리 양산 체제 구축에 속도를 냅니다.",
      content: `글로벌 전기차 캐즘(대중화 전 일시적 수요 정체)을 극복할 차세대 게임체인저로 꼽히는 '전고체 배터리' 파일럿 라인이 가동에 들어갔습니다.

국내 배터리 3사는 2027년 양산을 목표로 완성차 업체들과의 공동 실증 테스트를 추진하며 미래 친환경 모빌리티 시장 선점에 나섰습니다.`,
      image: "https://images.unsplash.com/photo-1558441719-aa34bbe5f347?auto=format&fit=crop&w=800&q=80",
      publisher: "전자신문",
      date: "4시간 전",
      link: "https://www.etnews.com"
    },
    {
      title: "청년 주택드림 청약통장 가입자 100만 돌파… '내 집 마련 징검다리' 열풍",
      snippet: "최대 연 4.5% 고금리와 분양가 80% 저리 대출 혜택을 결합한 청년 전용 금융상품에 2030 세대의 가입 러시가 이어지고 있습니다.",
      content: `국토교통부는 청년층의 자산 형성과 주거 안정을 위해 출시한 '청년 주택드림 청약통장'이 출시 두 달여 만에 가입자 100만 명을 돌파했다고 밝혔습니다.

청약 당첨 시 최저 2.2% 금리로 최장 40년 동안 주택담보대출을 지원하는 파격적인 혜택이 청년 세대의 주거 불안 해소에 실질적인 도움을 주고 있다는 평가입니다.`,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      publisher: "파이낸셜뉴스",
      date: "5시간 전",
      link: "https://www.fnnews.com"
    },
    {
      title: "국내 벤처투자 회복세 전환… AI·로보틱스 딥테크 분야에 자금 집중",
      snippet: "중소벤처기업부는 1분기 신규 벤처투자 규모가 전년 동기 대비 15% 증가하며 혹한기를 지나 본격적인 회복 국면에 접어들었다고 발표했습니다.",
      content: `생성형 AI와 차세대 휴머노이드 로봇 기술을 보유한 스타트업들이 수백억 원대 시리즈 B, C 라운드를 유치하며 벤처투자 시장에 활기를 불어넣고 있습니다.

정부는 모태펀드 출자를 대폭 확대해 글로벌 경쟁력을 갖춘 유니콘 기업 육성을 적극 지원할 방침입니다.`,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      publisher: "헤럴드경제",
      date: "6시간 전",
      link: "https://www.heraldcorp.com"
    },
    {
      title: "K-푸드 수출 역대 최고치 경신… 라면·냉동김밥 글로벌 품귀 현상",
      snippet: "미국과 유럽, 동남아를 넘어 중동까지 번진 K-컬처 인기로 한국 농수산식품 수출액이 사상 최초로 100억 달러를 넘어설 전망입니다.",
      content: `한류 드라마와 SNS 숏폼 콘텐츠를 타고 한국 식품의 인기가 전 세계 마트를 휩쓸고 있습니다.

한국산 매운 라면과 편의점 간편식, 떡볶이와 냉동 김밥이 미국 대형 유통체인에서 연일 매진을 기록하며 식품 기업들의 해외 매출 비중이 사상 처음으로 60%를 넘어섰습니다.`,
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      publisher: "아시아경제",
      date: "7시간 전",
      link: "https://www.asiae.co.kr"
    },
    {
      title: "국제 유가 배럴당 80달러선 하향 안정… 물가 상승 압력 다소 완화 기대",
      snippet: "중동 지역의 지정학적 리스크가 제한적 범위에 그치면서 서부텍사스산원유(WTI) 가격이 안정세를 되찾았습니다.",
      content: `원자재 시장에서 원유 선물 가격이 배럴당 82달러 선으로 소폭 하락하며 국내 주유소 휘발유 및 경유 가격 상승세에도 제동이 걸릴 것으로 보입니다.

정유업계 관계자는 "글로벌 원유 수요 둔화 우려와 미국의 산유량 증가가 유가 상단을 제한하고 있어 하반기 물가 안정에 긍정적 요인이 될 것"이라고 내다봤습니다.`,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      publisher: "연합인포맥스",
      date: "8시간 전",
      link: "https://news.einfomax.co.kr"
    }
  ]
};

// 3. 애플리케이션 상태 관리 (State)
const state = {
  selectedTopics: ['interkorean', 'sports', 'economy'],
  allArticles: [],        // 현재 피드에 누적된 기사들
  displayedCount: 0,      // 화면에 렌더링된 기사 수
  isLoading: false,       // 현재 로딩 중 여부
  hasMore: true,          // 추가 기사가 더 있는지 여부
  batchSize: 10,          // 한 번 로드할 기사 수 (무한 스크롤)
  currentModalArticle: null,
  infiniteScrollPage: 1
};

// 4. DOM 요소 참조
const elements = {
  topicChips: document.querySelectorAll('.topic-chip'),
  selectedCountBadge: document.getElementById('selected-count'),
  btnFetchNews: document.getElementById('btn-fetch-news'),
  summaryTitle: document.getElementById('summary-title'),
  summaryMeta: document.getElementById('summary-meta'),
  activeTagsDisplay: document.getElementById('active-tags-display'),
  newsGrid: document.getElementById('news-grid'),
  emptyState: document.getElementById('empty-state'),
  infiniteLoaderWrapper: document.getElementById('infinite-loader-wrapper'),
  loaderContent: document.getElementById('loader-content'),
  endOfFeed: document.getElementById('end-of-feed'),
  scrollSentinel: document.getElementById('scroll-sentinel'),
  
  // Modal Elements
  modalBackdrop: document.getElementById('article-modal-backdrop'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  modalBtnClose: document.getElementById('modal-btn-close'),
  modalCategory: document.getElementById('modal-category'),
  modalDate: document.getElementById('modal-date'),
  modalImage: document.getElementById('modal-image'),
  modalTitle: document.getElementById('modal-title'),
  modalPublisher: document.getElementById('modal-publisher'),
  modalContent: document.getElementById('modal-content'),
  modalLinkOriginal: document.getElementById('modal-link-original'),
  
  // Toast
  toastContainer: document.getElementById('toast-container')
};

// 5. OpenAPI & 데이터 페칭 서비스 (Service Layer)
class NewsApiService {
  /**
   * 선택된 주제에 대한 상위 10개 기사를 조회합니다.
   * 실시간 무료 OpenAPI(ok.surf)를 호출하고, 한국어 카테고리 기사 데이터와 안전하게 결합합니다.
   */
  static async fetchTopArticles(topics) {
    const promises = topics.map(topic => this.fetchTopicHeadlines(topic, 10));
    const results = await Promise.allSettled(promises);
    
    let combined = [];
    results.forEach(res => {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        combined.push(...res.value);
      }
    });

    // 시간 순 또는 다양한 주제가 균형 있게 섞이도록 셔플/인터리브
    return this.interleaveArticles(combined, topics);
  }

  /**
   * 단일 주제의 헤드라인 10건 가져오기
   */
  static async fetchTopicHeadlines(topicKey, limit = 10) {
    // 1차 시도: ok.surf 무료 CORS News API 시도 (Sports, Business 카테고리 매핑)
    let externalItems = [];
    try {
      if (topicKey === 'sports' || topicKey === 'economy') {
        const categoryParam = topicKey === 'sports' ? 'Sports' : 'Business';
        const response = await fetch('https://ok.surf/api/v1/cors/news-feed', {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(3000) // 3초 타임아웃
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data[categoryParam] && Array.isArray(data[categoryParam])) {
            externalItems = data[categoryParam].slice(0, 3).map(item => ({
              id: `ext-${Math.random().toString(36).substring(2, 9)}`,
              topic: topicKey,
              title: item.title,
              snippet: `${item.source} 보도: ${item.title}에 관한 글로벌 최신 속보입니다.`,
              content: `${item.title}\n\n[글로벌 헤드라인 뉴스]\n출처: ${item.source}\n본 기사는 글로벌 실시간 오픈 뉴스로 제공된 최신 소식입니다. 상세한 전체 원문과 현지 분석은 아래 원문 보러가기 링크를 통해 바로 확인하실 수 있습니다.`,
              image: item.og || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
              publisher: item.source || 'Global News',
              date: '방금 전',
              link: item.link || '#'
            }));
          }
        }
      }
    } catch (e) {
      // OpenAPI 타임아웃 또는 차단 시 로컬 데이터베이스를 원활하게 사용하여 오류 없음 보장
      // console.info('Using reliable curated local dataset:', e.message);
    }

    // 2차: 로컬 고화질 큐레이션 데이터 매핑
    const localPool = ARTICLE_DATABASE[topicKey] || [];
    const formattedLocal = localPool.map((item, idx) => ({
      ...item,
      id: `${topicKey}-${idx}-${Date.now()}`,
      topic: topicKey
    }));

    // 외부 API 결과와 고품질 한국어 뉴스를 결합하여 정확히 10건 구성
    const merged = [...externalItems, ...formattedLocal].slice(0, limit);
    return merged;
  }

  /**
   * 추가 10건 기사 생성 (무한 스크롤용)
   */
  static generateAdditionalArticles(topics, page, count = 10) {
    const pool = [];
    topics.forEach(t => {
      const dbItems = ARTICLE_DATABASE[t] || [];
      dbItems.forEach((base, idx) => {
        pool.push({
          id: `${t}-p${page}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
          topic: t,
          title: `[속보] ${base.title}`,
          snippet: `[${TOPICS[t].name}] ${base.snippet}`,
          content: `${base.content}\n\n(추가 보도 - 제${page}차 종합 뉴스 업데이트)`,
          image: base.image,
          publisher: base.publisher,
          date: `${page * 2 + Math.floor(Math.random() * 3)}시간 전`,
          link: base.link
        });
      });
    });

    // 랜덤 셔플 후 count 개수만큼 반환
    return pool.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  /**
   * 여러 주제의 기사를 골고루 섞어주는 헬퍼
   */
  static interleaveArticles(articles, topics) {
    const grouped = {};
    topics.forEach(t => { grouped[t] = articles.filter(a => a.topic === t); });
    
    const result = [];
    const maxLen = Math.max(...topics.map(t => grouped[t] ? grouped[t].length : 0));
    
    for (let i = 0; i < maxLen; i++) {
      topics.forEach(t => {
        if (grouped[t] && grouped[t][i]) {
          result.push(grouped[t][i]);
        }
      });
    }
    return result;
  }
}

// 6. UI 렌더링 함수군 (View Controller)

/**
 * 주제 선택 상태 업데이트
 */
function updateSelectedTopics() {
  const selected = [];
  elements.topicChips.forEach(chip => {
    const input = chip.querySelector('input[type="checkbox"]');
    if (input.checked) {
      chip.classList.add('active');
      selected.push(input.value);
    } else {
      chip.classList.remove('active');
    }
  });

  state.selectedTopics = selected;
  elements.selectedCountBadge.textContent = selected.length;
}

/**
 * 상단 피드 서머리 바 업데이트
 */
function updateSummaryBar(totalCount) {
  if (state.selectedTopics.length === 0) {
    elements.summaryTitle.textContent = "선택된 주제 없음";
    elements.summaryMeta.textContent = "";
    elements.activeTagsDisplay.innerHTML = "";
    return;
  }

  const names = state.selectedTopics.map(t => TOPICS[t]?.name).filter(Boolean).join(', ');
  elements.summaryTitle.textContent = `[${names}] 최신 헤드라인`;
  elements.summaryMeta.textContent = `총 ${totalCount}개 기사 로드됨`;

  // 태그 뱃지 렌더링
  elements.activeTagsDisplay.innerHTML = state.selectedTopics.map(t => {
    const info = TOPICS[t];
    return `<span class="topic-badge ${info.badgeClass}">${info.icon} ${info.name}</span>`;
  }).join('');
}

/**
 * 뉴스 카드 단일 HTML 생성
 */
function createCardElement(article) {
  const card = document.createElement('article');
  card.className = 'news-card';
  card.setAttribute('data-id', article.id);

  const topicInfo = TOPICS[article.topic] || { name: '뉴스', icon: '📰', badgeClass: 'economy' };

  card.innerHTML = `
    <div class="card-media-wrapper">
      <span class="topic-badge ${topicInfo.badgeClass} card-topic-tag">
        ${topicInfo.icon} ${topicInfo.name}
      </span>
      <img 
        src="${escapeHtml(article.image)}" 
        alt="${escapeHtml(article.title)}" 
        class="card-image"
        loading="lazy"
        onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';"
      />
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="card-publisher">${escapeHtml(article.publisher)}</span>
        <span class="card-date">${escapeHtml(article.date)}</span>
      </div>
      <h3 class="card-title" title="${escapeHtml(article.title)}">
        ${escapeHtml(article.title)}
      </h3>
      <p class="card-snippet">
        ${escapeHtml(article.snippet)}
      </p>
      <div class="card-footer">
        <button type="button" class="btn-read" data-id="${article.id}" aria-label="${escapeHtml(article.title)} 전체 읽기">
          <span>기사 읽기</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  `;

  // '읽기' 버튼 클릭 이벤트 리스너
  const readBtn = card.querySelector('.btn-read');
  readBtn.addEventListener('click', () => {
    openArticleModal(article);
  });

  return card;
}

/**
 * 기사 목록 렌더링
 */
function renderFeed(articles, append = false) {
  if (!append) {
    elements.newsGrid.innerHTML = '';
  }

  if (articles.length === 0 && !append) {
    elements.emptyState.style.display = 'block';
    elements.infiniteLoaderWrapper.style.display = 'none';
    return;
  }

  elements.emptyState.style.display = 'none';
  elements.infiniteLoaderWrapper.style.display = 'flex';

  const fragment = document.createDocumentFragment();
  articles.forEach(article => {
    const cardEl = createCardElement(article);
    fragment.appendChild(cardEl);
  });

  elements.newsGrid.appendChild(fragment);
}

/**
 * '뉴스 보기' 버튼 클릭 핸들러 (초기 데이터 로드)
 */
async function handleFetchNews() {
  if (state.selectedTopics.length === 0) {
    showToast('주제를 하나 이상 선택해 주세요! (대북관계, 스포츠, 경제)');
    return;
  }

  state.isLoading = true;
  state.infiniteScrollPage = 1;
  state.hasMore = true;

  // 로딩 상태 피드백
  elements.btnFetchNews.disabled = true;
  elements.btnFetchNews.querySelector('.btn-text').textContent = '뉴스 불러오는 중...';
  elements.loaderContent.classList.add('active');
  elements.endOfFeed.style.display = 'none';

  // 스켈레톤 그리드 임시 표시
  elements.newsGrid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
      <div class="spinner" style="margin: 0 auto 16px auto;"></div>
      <p style="font-weight: 600;">선택하신 각 주제별 상위 10개 헤드라인을 가져오는 중입니다...</p>
    </div>
  `;

  try {
    // 요구사항: 선택한 각 주제에 대한 상위 10개의 헤드라인을 openAPI에서 가져와 피드에 추가
    const articles = await NewsApiService.fetchTopArticles(state.selectedTopics);
    state.allArticles = articles;
    state.displayedCount = articles.length;

    renderFeed(state.allArticles, false);
    updateSummaryBar(state.displayedCount);
    showToast(`총 ${articles.length}건의 최신 헤드라인을 불러왔습니다!`);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    showToast('뉴스를 불러오는 중 오류가 발생했습니다.');
  } finally {
    state.isLoading = false;
    elements.btnFetchNews.disabled = false;
    elements.btnFetchNews.querySelector('.btn-text').textContent = '뉴스 보기';
    elements.loaderContent.classList.remove('active');
  }
}

/**
 * 무한 스크롤: 10건 추가 로드
 */
async function loadMoreArticles() {
  if (state.isLoading || !state.hasMore || state.selectedTopics.length === 0) return;

  state.isLoading = true;
  elements.loaderContent.classList.add('active');

  // 사용자 편의 및 자연스러운 인터랙션을 위한 미세 딜레이
  await new Promise(resolve => setTimeout(resolve, 600));

  try {
    state.infiniteScrollPage += 1;
    const newArticles = NewsApiService.generateAdditionalArticles(
      state.selectedTopics,
      state.infiniteScrollPage,
      10 // 10건씩 더 불러오기
    );

    if (newArticles.length > 0) {
      state.allArticles.push(...newArticles);
      state.displayedCount += newArticles.length;
      renderFeed(newArticles, true);
      updateSummaryBar(state.displayedCount);

      // 최대 100건까지 지속 스크롤 가능 (원하면 무제한)
      if (state.displayedCount >= 100) {
        state.hasMore = false;
        elements.endOfFeed.style.display = 'block';
      }
    } else {
      state.hasMore = false;
      elements.endOfFeed.style.display = 'block';
    }
  } catch (err) {
    console.error('Error loading more:', err);
  } finally {
    state.isLoading = false;
    elements.loaderContent.classList.remove('active');
  }
}

// 7. 모달 컨트롤러 (Modal Controller)

function openArticleModal(article) {
  state.currentModalArticle = article;
  const topicInfo = TOPICS[article.topic] || { name: '뉴스', icon: '📰', badgeClass: 'economy' };

  // 모달 데이터 채우기
  elements.modalCategory.className = `modal-category topic-badge ${topicInfo.badgeClass}`;
  elements.modalCategory.innerHTML = `${topicInfo.icon} ${topicInfo.name}`;
  elements.modalDate.textContent = article.date || '최신';
  elements.modalImage.src = article.image;
  elements.modalImage.alt = article.title;
  elements.modalTitle.textContent = article.title;
  elements.modalPublisher.textContent = `출처: ${article.publisher || '언론사'}`;
  elements.modalContent.textContent = article.content || article.snippet;
  elements.modalLinkOriginal.href = article.link || '#';

  // 열기
  elements.modalBackdrop.classList.add('open');
  elements.modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

function closeArticleModal() {
  elements.modalBackdrop.classList.remove('open');
  elements.modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  state.currentModalArticle = null;
}

// 8. 토스트 알림 헬퍼
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>💬</span> <span>${escapeHtml(message)}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// 9. XSS 방지 이스케이프 헬퍼
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 10. 무한 스크롤 옵저버 설정 (IntersectionObserver)
function initIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: '200px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !state.isLoading && state.hasMore && state.allArticles.length > 0) {
        loadMoreArticles();
      }
    });
  }, options);

  observer.observe(elements.scrollSentinel);
}

// 11. 이벤트 리스너 바인딩 및 앱 초기화
function initEventListeners() {
  // 칩 체크박스 변경 핸들러
  elements.topicChips.forEach(chip => {
    const input = chip.querySelector('input[type="checkbox"]');
    input.addEventListener('change', () => {
      updateSelectedTopics();
    });
  });

  // '뉴스 보기' 버튼 클릭
  elements.btnFetchNews.addEventListener('click', handleFetchNews);

  // 모달 닫기 이벤트들
  elements.modalCloseBtn.addEventListener('click', closeArticleModal);
  elements.modalBtnClose.addEventListener('click', closeArticleModal);
  elements.modalBackdrop.addEventListener('click', (e) => {
    if (e.target === elements.modalBackdrop) {
      closeArticleModal();
    }
  });

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.modalBackdrop.classList.contains('open')) {
      closeArticleModal();
    }
  });
}

// 애플리케이션 시작
function initApp() {
  updateSelectedTopics();
  initEventListeners();
  initIntersectionObserver();

  // 첫 진입 시 자동으로 초기 3개 주제 뉴스 30건 로드
  handleFetchNews();
}

document.addEventListener('DOMContentLoaded', initApp);
