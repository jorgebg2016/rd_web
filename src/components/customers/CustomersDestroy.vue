<template>
    <q-dialog v-model="model" :persistent="true">
        <q-card style="width: 500px;">
            <q-card-section class="row justify-between" style="border-bottom: 1px solid whitesmoke">
                <h6 style="color: black;">{{ $t('info.customer.remove')  }}</h6>
                <q-btn @click="$emit('close')" flat :ripple="false" icon="close" rounded text-color="dark" style="padding: 2px 5px"/>
            </q-card-section>
            <q-card-section class="column">
                <div class="row justify-center q-pa-md">
                    <q-icon name="info" color="negative" size="xl"></q-icon>
                </div>
                <div class="q-pa-md">
                    <span class="text-dark truncate">{{ $t('info.customer.destroy', { name: customer?.full_name })  }}</span>
                </div>
            </q-card-section>
            <q-card-section class="row" style="border-top: 1px solid whitesmoke; gap: 14px;">
                <q-btn 
                    @click="$emit('close')" 
                    class="col shadow-1" 
                    :ripple="false" 
                    :label="$t('button.cancel')"  
                    text-color="dark" 
                />
                <q-btn 
                    :loading="loading"
                    class="col shadow-1" 
                    :ripple="false" 
                    :label="$t('button.destroy')" 
                    color="negative" 
                    icon="delete"
                    @click="$emit('delete', customer?.id)"
                />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import type { ICustomerRow } from '@/types/customers';
import { ref } from 'vue';

withDefaults(
    defineProps<{
        loading?: boolean; 
        customer?: ICustomerRow;
    }>(), 
    {
        loading: false,
        customer: undefined
    }
);

const model = ref<boolean>(true);

defineEmits<{
    (e: 'close'): void;
    (e: 'delete', customer_id: number): void;
}>();
</script>