<template>
    <div class="q-pa-md row justify-center">
        <q-card>
            <form @submit.prevent="onSubmit" id="filterCustomersForm">
                <div style="width: 900px; gap: 14px;" class="row q-pa-md justify-between">
                    <CommonInput
                        name="name"
                        type="text"
                        :internal-label="$t('label.full_name')"
                    />
                    <CommonInput 
                        name="cpf"
                        mask="###.###.###-##"
                        type="text"
                        :internal-label="$t('label.document.cpf')"
                    />
                    <q-btn 
                        color="primary" 
                        type="submit"
                        form="filterCustomersForm" 
                        :dense="true"
                        icon="search" 
                        :label="$t('button.search')"
                        class="q-px-md"
                    />
                </div>
            </form>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import CommonInput from '../inputs/CommonInput.vue';
import type { IFilterCustomersData } from '@/types/customers';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';

const emit = defineEmits<{
    (e: 'handle:search', data: IFilterCustomersData): void;
}>();

const { handleSubmit } = useForm({
  validationSchema: object({
    name: string().nullable(),
    cpf: string().nullable(),
  }),
  validateOnMount: false,
});

const onSubmit = handleSubmit((values: IFilterCustomersData) => {
    emit('handle:search', values);
});
</script>