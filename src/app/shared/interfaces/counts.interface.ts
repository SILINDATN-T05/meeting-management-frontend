export interface ICounts {
    permission: {
        permissions: {
        name: string,
        keys: string[],
        value: number[],
    },
    total: 0,
    };
    roles: number;
    verification: {
        verification: {
            name: string,
            keys: string[],
            value: number[],
        },
        total: number,
    };
    standards: {
        standards: {
            name: string,
            keys: string[],
            value: number[],
        },
        total: number,
    };
    users: number;
}
