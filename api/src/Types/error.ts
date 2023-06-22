export interface ErrorRes {
    msg: string
    type: string
    statusCode: number
}
export interface ValidationError extends ErrorRes {
    attr: string
}