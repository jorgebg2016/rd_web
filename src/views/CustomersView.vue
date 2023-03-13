<template>
  <PageBase>
    <CustomersFilter @handle:search="store.search"/>
    <CustomersTable 
      :loading="store.filterActionProps.loading" 
      :data="data"
      :columns="store.columns" 
      @add="openAddModal = true" 
      @paginate="store.paginate"
      @destroy="store.remove"
    />
    <CustomersAdd 
      v-if="openAddModal && !store.storeActionProps.successMessage" 
      :loading="store.storeActionProps.loading"
      :validation-errors="store.storeActionProps.errors" 
      @close="openAddModal = false"    
      @save="store.save"
    />
    <CustomersDestroy 
      v-if="!!store.destroyActionProps.data && !store.destroyActionProps.successMessage"
      :customer="store.destroyActionProps.data" 
      :loading="store.destroyActionProps.loading" 
      @close="store.destroyActionProps.data = undefined"
      @delete="store.destroyCustomer"  
    />
  </PageBase>
</template>

<script setup lang="ts">
import CustomersFilter from '@/components/customers/CustomersFilter.vue';
import CustomersTable from '@/components/customers/CustomersTable.vue';
import CustomersAdd from '@/components/customers/CustomersAdd.vue';
import CustomersDestroy from '@/components/customers/CustomersDestroy.vue';
import { useCustomersStore } from '@/stores/customers';
import PageBase from '@/components/PageBase.vue';
import { ref } from 'vue';

const store = useCustomersStore();

const openAddModal = ref<boolean>(false);

const { data } = store.fetch();
</script>
