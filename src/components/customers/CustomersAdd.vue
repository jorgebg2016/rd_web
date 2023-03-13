<template>
    <q-dialog v-model="model" :persistent="true">
        <q-card style="width: 500px;">
            <q-card-section class="row justify-between" style="border-bottom: 1px solid whitesmoke">
                <h6 style="color: black;">{{ $t('info.customer.add')  }}</h6>
                <q-btn @click="$emit('close')" flat :ripple="false" icon="close" rounded text-color="dark" style="padding: 2px 5px"/>
            </q-card-section>
            <q-card-section>
                <form id="addCustomerForm" @submit.prevent="onSubmit">
                    <div class="row" style="gap: 10px">
                        <CommonInput 
                            name="full_name"
                            class="col-12"
                            :label="$t('label.full_name')" 
                            type="text"
                        />
                        <CommonInput 
                            name="cpf"
                            class="col-12"
                            :label="$t('label.document.cpf')" 
                            mask="###.###.###-##"
                            type="text"
                        />
                        <CommonInput 
                            name="birthday"
                            class="col-12"
                            :label="$t('label.birthday')" 
                            type="date"
                        />
                        <CommonInput 
                            name="phone"
                            class="col-12"
                            :label="$t('label.phone')" 
                            mask="(##) #####-####"
                            type="text"
                        />
                    </div>
                </form>
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
                    type="submit"
                    form="addCustomerForm"
                    :loading="loading"
                    class="col shadow-1" 
                    :ripple="false" 
                    :label="$t('button.save')" 
                    color="primary" 
                    icon="save"
                />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import type { ICustomerDataStore, IStoreCustomerErrors } from '@/types/customers';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { ref, watch } from 'vue';
import CommonInput from '../inputs/CommonInput.vue';

const prop = withDefaults(
    defineProps<{
        loading?: boolean; 
        validationErrors?: any;
    }>(), 
    {
        loading: false,
        validationErrors: undefined,
    }
);

watch<IStoreCustomerErrors | undefined>(
  () => prop.validationErrors,
  (errors) => {
    if (errors) {
        Object.keys(errors).forEach((key) => {
            setFieldError(key, errors[key as keyof typeof errors]);
        });
    }
  }
);

const { handleSubmit, setFieldError } = useForm({
  validationSchema: object({
    full_name: string().required(),
    cpf: string().required(),
    phone: string().nullable(),
    birthday: string().required(),
  }),
  validateOnMount: false,
});

const onSubmit = handleSubmit((values: ICustomerDataStore) => {
  emit('save', values)
});

const model = ref<boolean>(true);

const data = ref<ICustomerDataStore>({});

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'save', data: ICustomerDataStore): void;
}>();
</script>