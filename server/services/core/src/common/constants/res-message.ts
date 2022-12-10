const ResMessage = {
  // Core 관련
  CORE_HELLO: 'CORE 서비스입니다.',

  // 채팅 관련
  CREATE_CHAT: '해당 채팅 메시지를 생성하였습니다.',
  GET_ALL_CHAT: '해당 채팅 방의 채팅 내역을 가져왔습니다.',

  CHAT_CANNOT_CREATED: '채팅을 생성하지 못하였습니다.',
  CHAT_NOT_FOUND: '채팅 내역이 존재하지 않습니다.',
  CHAT_ROOM_NOT_FOUND: '채팅방이 존재하지 않습니다.',

  // FanUP 관련
  CREATE_FANUP: '팬미팅을 생성하였습니다.',
  UPDATE_FANUP: '팬미팅 정보를 업데이트 하였습니다.',
  GET_ALL_FANUP_BY_TICKET: '해당 티켓에 대한 팬미팅 정보를 모두 가져왔습니다.',
  FANUP_EXIST: '해당 방이 존재하고 있습니다.',
  GET_ALL_FANUP: '모든 팬업 방을 가져왔습니다.',
  FIND_FANUP_BY_ARTIST_ID: '해당 ',

  FANUP_NOT_FOUND: '해당 팬미팅 방이 존재하지 않습니다.',
  FANUP_UPDATE_FAIL: '팬미팅 정보를 업데이트하는데 실패하였습니다.',

  // 파일 관련
  FILE_BAD_REQUEST: '보낸 파일이 존재하지 않습니다.',

  // 알림 관련
  UPDATE_NOTIFICATION: '알림을 읽음으로 처리하였습니다.',
  FIND_NOTIFICATION_BY_USER_ID: '해당 유저의 알림을 가져왔습니다.',

  NOTIFICATION_BAD_REQUEST: '잘못된 형식의 아이디가 들어왔습니다.',
  NOTIFICATION_NOT_FOUND: '해당 아이디의 알림을 찾을 수 없습니다.',
  NOTIFICATION_UPDATE_FAIL: '해당 알림 업데이트에 실패하였습니다.',
};

export { ResMessage };
