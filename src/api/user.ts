import request from "../utils/request";

export function getUserList(skip: number = 0, limit: number = 100) {
    return request.get<any, IPagination<User>>(
        "/users/",
        { params: { skip, limit } }
    )
}

export function deleteUserByID(id: string) {
    return request.delete<any, ResponseSuccess>("/users/" + id)
}

export function addUser(user: User) {
    return request.post<any, ResponseSuccess>("/users/register", user)
}

export function updateUser(id: string, user: User) {
    return request.put<any, ResponseSuccess>("/users/edit/" + id, user)
}