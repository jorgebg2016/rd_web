import { ref, computed, onMounted, type Ref } from 'vue';
import { defineStore } from 'pinia';
import customersService from '../services/customers';
import { useQuery, useMutation, QueryClient } from 'vue-query';
import type { UseQueryReturnType } from 'vue-query'
import type { 
  IFilterCustomersQueryString, 
  IFilterCustomersResponse, 
  ICustomerRow, 
  IFilterCustomersData, 
  ICustomerDataStore, 
  IStoreCustomerResponse, 
  IStoreCustomerErrors
} from '@/types/customers';
import type { QTableProps } from 'quasar';
import type { IActionProps, IPagination } from '@/types/common';
import { isAxiosError } from 'axios';


interface ICustomersStore {
  columns: QTableProps['columns'],
  storeActionProps: Ref<IActionProps<IStoreCustomerErrors>>,
  filterActionProps: Ref<IActionProps>;
  fetch: () => UseQueryReturnType<IFilterCustomersResponse, unknown>;
  search: (data: IFilterCustomersData) => void;
  save: (data: ICustomerDataStore) => void;
  paginate: (data: IPagination) => void;
}

export const useCustomersStore = defineStore('customersStore', (): ICustomersStore => {
  
  const { destroy, filter, store } = customersService;

  const queryClient = new QueryClient();

  const columns: QTableProps['columns'] = [
    { name: 'id', label: 'ID', align: 'left', field: (row: ICustomerRow) => row.id},
    { name: 'full_name', label: 'Nome', align: 'left', field: (row: ICustomerRow) => row.full_name},
    { name: 'cpf', align: 'left', label: 'CPF', field: (row: ICustomerRow) => row.cpf },
    { name: 'phone', align: 'left', label: 'Telefone', field: (row: ICustomerRow) => row.phone },
    { name: 'birthday', align: 'left', label: 'Nascimento', field: (row: ICustomerRow) => row.birthday },
    { name: 'created_at', align: 'left', label: 'Cadastro', field: (row: ICustomerRow) => row.created_at },
    { name: 'action', label: 'Ações', align: 'center', field: 'action'},
  ]

  const queryString = ref<IFilterCustomersQueryString>({
    page: 1,
    per_page: 4
  });

  function fetch() {
    return useQuery(
      ['filterCustomersQuery', queryString],
      () => filter(queryString.value),
      {
        keepPreviousData: true,
        onSuccess: () => {
          filterActionProps.value.loading = false;
        }
      }
    );
  }

  const storeActionProps = ref<IActionProps<IStoreCustomerErrors>>({})

  const filterActionProps = ref<IActionProps>({});

  const storeMutation = useMutation({
    mutationFn: store,
    onMutate: () => {
      storeActionProps.value.loading = true;
    },
    onSuccess: (data: IStoreCustomerResponse) => {
      storeActionProps.value.successMessage = data.message;
      storeActionProps.value.loading = false;
      queryClient.invalidateQueries({ queryKey: ['filterCustomersQuery'] });
    },
    onError: (error: any) => {
      storeActionProps.value.loading = false;
      if (isAxiosError(error) && error.response) {
        const { validation_error, message } = error.response.data;
        console.log(validation_error);
        if (validation_error) {
          storeActionProps.value.errors = validation_error;
        }
      }
    }
  });

  function search(data: IFilterCustomersData): void {
    filterActionProps.value.loading = true;
    queryString.value = { ...queryString.value, ...data };
  }

  function save(data: ICustomerDataStore): void {
    storeMutation.mutate(data);
  }

  function paginate(data: IPagination): void {
    filterActionProps.value.loading = true;
    queryString.value = { ...queryString.value, ...data };
  }

  return { 
    fetch,
    search,
    save,
    paginate,
    columns,
    storeActionProps,
    filterActionProps,
  };
});
