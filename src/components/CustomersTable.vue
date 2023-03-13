<template>
  <div class="q-ma-md row justify-center">
    <q-card style="width: 900px;">
      <q-table
        :rows="data?.data"
        :columns="columns"
        row-key="name"
        :loading="loading"
        :rows-per-page-options="[0]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="full_name" :props="props">{{ props.row.full_name }}</q-td>
            <q-td key="cpf" :props="props">{{ props.row.cpf }}</q-td>
            <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
            <q-td key="birthday" :props="props">{{ qDate.formatDate(props.row.birthday, 'DD/MM/YYYY') }}</q-td>
            <q-td key="created_at" :props="props">{{ qDate.formatDate(props.row.created_at, 'DD/MM/YYYY HH:mm:ss') }}</q-td>
            <q-td key="action" :props="props">
              <q-btn flat :ripple="false" icon="delete" rounded text-color="dark" style="padding: 2px 5px"/>
            </q-td>
          </q-tr>
        </template>
        <template #top>
          <div class="row justify-between items-center" style="width: 100%">
            <h6 class="title">Clientes Cadastrados</h6>
            <q-btn 
              icon="add" 
              color="primary"
              style="color: white;"
              @click="$emit('add')"
              label="Cliente"
            />
          </div>
        </template>
        <template #pagination>
          <q-pagination v-if="prop.data?.pagination"
            v-model="page"
            :max="prop.data.pagination.rows"
            direction-links
            @update:model-value="$emit('paginate', preparePagination($event))"
          />
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { IPagination, IPaginationResponse } from '@/types/common';
import type { IFilterCustomersResponse } from '@/types/customers';
import type { QTableProps } from 'quasar';
import { toRef, ref } from 'vue';
import { date as qDate } from 'quasar';

const prop = withDefaults(
  defineProps<{
    data?: IFilterCustomersResponse;
    columns: QTableProps['columns'];
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const page = prop.data ? toRef(prop.data.pagination as IPaginationResponse, 'page'): ref(1);

function preparePagination(page: number): IPagination {
  return {
    page: page,
    per_page: prop.data?.pagination?.per_page as number,
  };
}

defineEmits<{
  (e: 'add'): void;
  (e: 'paginate', value: IPagination): void;
}>();
</script>

<style scoped lang="scss">
.title {
  color: $grey-4;
  font-weight: 400;
}
:deep(.q-table__top) {
  border-bottom: 1px solid $grey-2;
}
:deep(.q-table__bottom) {
  justify-content: center !important;
}
</style>
  