export interface IAssessmentLogs {
    _id: string;
    server_ref: string;
    step_name: string;
    step_position: string;
    channel: string;
    platform: string;
    request: object;
    response: object;
    step_data: object;
    message: object;
    req_options: object;
    response_code: string;
    request_date: string;
    response_date: string;
    user: string;
    branch: string;
    handler_name: string;
    parser_name: string;
}
