import EventEmitter from "events"

export type IAuthEvent = "AUTH::INVALID"
export const authEmitter = new EventEmitter<Record<IAuthEvent, Error[]>>()
