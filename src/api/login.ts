import request from "../utils/request";

export function doLogin(admin: Admin) {
    return request.post<any, ResponseSuccess<{ code: string }>>(
        "users/login",
        admin,
        {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
    )
}
