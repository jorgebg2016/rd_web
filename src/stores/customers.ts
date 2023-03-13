import { ref, computed, onMounted, type Ref } from 'vue';
import { defineStore } from 'pinia';
import customersService from '../services/customers';
import { useQuery, useMutation, useQueryClient } from 'vue-query';
import type { UseQueryReturnType } from 'vue-query'
import type { 
  IFilterCustomersQueryString, 
  IFilterCustomersResponse, 
  ICustomerRow, 
  IFilterCustomersData, 
  ICustomerDataStore, 
  IStoreCustomerResponse, 
  IStoreCustomerErrors,
  IDestroyCustomerResponse
} from '@/types/customers';
import type { QTableProps } from 'quasar';
import type { IActionProps, IPagination } from '@/types/common';
import { isAxiosError } from 'axios';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';


interface ICustomersStore {
  columns: QTableProps['columns'],
  storeActionProps: Ref<IActionProps<IStoreCustomerErrors>>,
  destroyActionProps: Ref<IActionProps<{}, ICustomerRow>>;
  filterActionProps: Ref<IActionProps>;
  fetch: () => UseQueryReturnType<IFilterCustomersResponse, unknown>;
  search: (data: IFilterCustomersData) => void;
  save: (data: ICustomerDataStore) => void;
  paginate: (data: IPagination) => void;
  remove: (data: ICustomerRow) => void;
  destroyCustomer: (customer_id: number) => void;
}

console.error = () => {};

export const useCustomersStore = defineStore('customersStore', (): ICustomersStore => {

  const $q = useQuasar();

  const { t } = useI18n();
  
  const { destroy, filter, store } = customersService;

  const queryClient = useQueryClient();

  const columns: QTableProps['columns'] = [
    { name: 'id', label: t('label.id'), align: 'left', field: (row: ICustomerRow) => row.id},
    { name: 'full_name', label: t('label.full_name'), align: 'left', field: (row: ICustomerRow) => row.full_name},
    { name: 'cpf', align: 'left', label: t('label.document.cpf'), field: (row: ICustomerRow) => row.cpf },
    { name: 'phone', align: 'left', label: t('label.phone'), field: (row: ICustomerRow) => row.phone },
    { name: 'birthday', align: 'left', label: t('label.birthday'), field: (row: ICustomerRow) => row.birthday },
    { name: 'created_at', align: 'left', label: t('label.created_at'), field: (row: ICustomerRow) => row.created_at },
    { name: 'action', label: t('label.action'), align: 'center', field: 'action'},
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
        enabled: true,
        keepPreviousData: true,
        onSuccess: () => {
          filterActionProps.value.loading = false;
        }
      }
    );
  }

  const storeActionProps = ref<IActionProps<IStoreCustomerErrors>>({})

  const destroyActionProps = ref<IActionProps<{}, ICustomerRow>>({});

  const destroyMutation = useMutation({
    mutationFn: destroy,
    onMutate: () => {
      destroyActionProps.value.loading = true;
    },
    onSuccess: (data: IDestroyCustomerResponse) => {
      queryClient.invalidateQueries({ queryKey: ['filterCustomersQuery'] });
      destroyActionProps.value.successMessage = data.data.message;
      $q.notify({
        message: destroyActionProps.value.successMessage,
        position: 'top-right',
        type: 'positive',
      });
    },
    onError: (error: any) => {
      if (isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        $q.notify({
          message: message,
          position: 'top-right',
          type: 'negative',
        });
      }
    },
    onSettled: () => {
      destroyActionProps.value.loading = false;
      destroyActionProps.value.data = undefined;
      destroyActionProps.value.successMessage = undefined;
    },
  });

  const filterActionProps = ref<IActionProps>({});

  const storeMutation = useMutation({
    mutationFn: store,
    onMutate: () => {
      storeActionProps.value.loading = true;
    },
    onSuccess: (data: IStoreCustomerResponse) => {
      queryClient.invalidateQueries({ queryKey: ['filterCustomersQuery'] });
      storeActionProps.value.successMessage = data.message;
      $q.notify({
        message: storeActionProps.value.successMessage,
        position: 'top-right',
        type: 'positive',
      });
    },
    onError: (error: any) => {
      if (isAxiosError(error) && error.response) {
        const { validation_error } = error.response.data;
        if (validation_error) storeActionProps.value.errors = validation_error;
      }
    },
    onSettled: () => {
      storeActionProps.value.loading = false;
      storeActionProps.value.successMessage = undefined;
    },
  });

  function search(data: IFilterCustomersData): void {
    if (data.name !== queryString.value.name && data.cpf !== queryString.value.cpf) 
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

  function remove(data: ICustomerRow): void {
    destroyActionProps.value.data = data;
  }

  function destroyCustomer(customer_id: number): void {
    destroyMutation.mutate(customer_id);
  }

  return { 
    fetch,
    search,
    save,
    remove,
    paginate,
    destroyCustomer,
    columns,
    storeActionProps,
    filterActionProps,
    destroyActionProps,
  };
});
