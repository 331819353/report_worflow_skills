<script setup lang="ts">
import DashboardShell from '@/components/DashboardShell.vue';
import { cockpitConfig } from '@/config/dashboard.config';
</script>

<template>
  <DashboardShell :config="cockpitConfig" />
</template>
