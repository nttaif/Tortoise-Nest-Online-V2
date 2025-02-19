import { UserType } from "./UserType"

export type ResponseListData = {
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    },
    results: UserType[]
}