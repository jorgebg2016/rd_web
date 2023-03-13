import api from '@/axios.config';
import type { 
    ICustomerDataStore, 
    IDestroyCustomerResponse, 
    IFilterCustomersQueryString, 
    IFilterCustomersResponse, 
    IStoreCustomerResponse 
} from '@/types/customers';
import type { AxiosRequestConfig } from 'axios';

class CustomersService {
    async filter(data: IFilterCustomersQueryString): Promise<IFilterCustomersResponse> {

        const config: AxiosRequestConfig = {
            params: data,
        };

        const response = await api.get<IFilterCustomersResponse>('customers/filter', config);
      
        return response.data;
    }

    async store(data: ICustomerDataStore): Promise<IStoreCustomerResponse> {

        const response = await api.post<IStoreCustomerResponse>('customers/store', data);
      
        return response.data;
    }

    async destroy(customer_id: number): Promise<IDestroyCustomerResponse> {

        const response = await api.delete<IDestroyCustomerResponse>(`customers/${customer_id}/destroy`);
      
        return response.data;
    }
}

export default new CustomersService();