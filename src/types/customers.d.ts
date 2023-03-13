import type { IPagination, IPaginationResponse } from './common';

interface IFilterCustomersData {
    name?: string;
    cpf?: string;
}

interface IFilterCustomersQueryString extends IPagination, IFilterCustomersData {}

interface ICustomerData {
    full_name: string;
    cpf: string;
    phone?: string;
    birthday: string;
}

interface ICustomerDataStore {
    full_name?: string;
    cpf?: string;
    phone?: string;
    birthday?: string;
}

interface IStoreCustomerErrors extends ICustomerDataStore {}

interface ICustomerRow extends ICustomerData {
    id: number;
    created_at: Date;
}

interface IFilterCustomersResponse {
    data: ICustomerRow[];
    pagination?: IPaginationResponse;
}

interface IStoreCustomerResponse {
    message: string;
    data: ICustomerRow;
}

interface IDestroyCustomerResponse {
    data: {
        message: string;
    };
}

export {
    IFilterCustomersQueryString,
    ICustomerData,
    ICustomerRow,
    IFilterCustomersResponse,
    IStoreCustomerResponse,
    IDestroyCustomerResponse,
    IFilterCustomersData,
    ICustomerDataStore,
    IStoreCustomerErrors
};