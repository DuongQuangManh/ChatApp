export interface UserModel{
    _id:string,
    name:string,
    email:string,
    passwd:string,
    phone:string,
    img:string,
    token:string,
}

export interface FriendModel{
    _id:string,
    user_id:string,
    friend_id:string,
}

export interface FriendRequestModel{
    _id:string,
    from_user_id:string,
    to_user_id:string,
    status_friend:boolean;
}

export interface MessageModel{
    _id:string,
    sender_id:string,
    receiver_id:string,
    message:string,
}


