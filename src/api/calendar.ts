import request from "../utils/request";

export function getCalendarAge() {
    return request.get<any, AgeInterface<User>>("/calendar/age")
}

export function getImg() {
    return request.get<any, ImgInterface<User>>("/calendar/girl/url")
}

export function getFish() {
    return request.get<any, FishInterfasce<User>>("/calendar/")
}
