import { Teacher } from "./Teacher";

export type ResponseListTeacherData = {
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    },
    results: Teacher[]
}