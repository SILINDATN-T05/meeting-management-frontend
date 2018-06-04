export interface IApplication {
    code: string;
    name: string;
    version: string;
    description: string;
    channel: string;
    organizationID: string;
    permissions: object[];
    trans_code: object[];
    status: string;
    public_key: string;
    private_key: string;
    _id: string;
}
