<template>
  <PageBase>
    <CustomersFilter @handle:search="store.search"/>
    <CustomersTable 
      :loading="store.filterActionProps.loading" 
      :data="data"
      :columns="store.columns" 
      @add="openAddModal = true" 
      @paginate="store.paginate"
    />
    <CustomersAdd 
      v-if="openAddModal" 
      :loading="store.storeActionProps.loading"
      :validation-errors="store.storeActionProps.errors" 
      @close="openAddModal = false"    
      @save="store.save"
    />
  </PageBase>
</template>

<script setup lang="ts">
import CustomersFilter from '@/components/CustomersFilter.vue';
import CustomersTable from '@/components/CustomersTable.vue';
import CustomersAdd from '@/components/CustomersAdd.vue';
import { useCustomersStore } from '@/stores/customers';
import PageBase from '@/components/PageBase.vue';
import { ref } from 'vue';

const store = useCustomersStore();

const openAddModal = ref<boolean>(false);

const { data } = store.fetch();
</script>
