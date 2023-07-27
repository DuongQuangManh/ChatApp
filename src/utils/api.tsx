var ip = '192.168.1.3';
var host = '3000';

export const URL = `http://${ip}:${host}`;

export const USER = `${URL}/api/user`;
export const USER_LOGIN = `${URL}/api/user/login`;
export const USER_LOGOUT = `${URL}/api/user/logout`;
export const USER_REG = `${URL}/api/user/reg`;
export const USER_UPD = `${URL}/api/user/update`;

export const REQ_FRIEND_ADD = `${URL}/api/reqfriend/add`;
export const REQ_FRIEND_SENDED = `${URL}/api/reqfriend/sended`;
export const REQ_FRIEND_RECEIVED = `${URL}/api/reqfriend/received`;
export const REQ_FRIEND_DELETE = `${URL}/api/reqfriend/delete`;
export const REQ_FRIEND_DELETEID = `${URL}/api/reqfriend/deleteid`;
export const REQ_FRIEND_CHANGESTATUS = `${URL}/api/reqfriend/changestatus`;

export const FRIEND_GET = `${URL}/api/friend`;
export const FRIEND_ADD = `${URL}/api/friend/add`;

export const MESS_GET = `${URL}/api/message`;
export const MESS_ADD = `${URL}/api/message/add`;
