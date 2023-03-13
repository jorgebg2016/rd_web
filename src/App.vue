<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { setLocale } from 'yup';

const { t } = useI18n();
setLocale({
  mixed: {
    default: t('validations.default'),
    required: t('validations.required'),
  },
  string: {
    email: t('validations.email'),
    min: ({ min }) => t('validations.min_char', { min }, min),
  },
});
</script>

<style lang="scss">
#app {
  min-width: 100vw !important;
  margin: 0px !important;
  padding: 0px !important;
  background-color: $grey-2;
}
</style>
