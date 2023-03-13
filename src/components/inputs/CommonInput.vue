<template>
    <div class="col" style="width: 100%">
        <label v-if="!!label"
            :id="label ? label + '_label' : undefined"
            class="label col-12"
            :for="label"
        >
            {{ label }}
        </label>
        <q-input
            :mask="mask" 
            outlined 
            v-model="value" 
            :dense="true"
            :for="label"
            :name="name"
            :type="type"
            :label="internalLabel"
            :error="!!errorMessage"
            :hide-bottom-space="true"
            :aria-labelledby="label ? label + '_label' : undefined"
            style="margin-top: 0px !important"
        />
        <span v-if="!!errorMessage" class="error">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
import type { QInputProps } from 'quasar';
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const prop = withDefaults(defineProps<{
    label?: string;
    mask?: string;
    name: string;
    type: QInputProps['type'];
    internalLabel?: string;
}>(), {
    mask: undefined,
    label: undefined,
    internalLabel: undefined
});

const { value, errorMessage } = useField<string>(toRef(prop, 'name'));
</script>

<style scoped lang="scss">
:deep(.q-field__bottom) {
    display: none;
}
.error {
    color: $negative;
}
.label {
  padding-bottom: -10px;
  font-weight: 500;
  color: $grey-6;
}
</style>