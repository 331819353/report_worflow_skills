<script setup lang="ts">
interface RainColumn {
  id: number;
  text: string;
  left: string;
  delay: string;
  duration: string;
  opacity: string;
  size: string;
}

const makeBinaryText = (seed: number) => {
  const length = 54 + (seed % 21);

  return Array.from({ length }, (_, index) => ((index + seed * 3 + Math.floor(index / 5)) % 2).toString()).join('\n');
};

const columns: RainColumn[] = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  text: makeBinaryText(index + 7),
  left: `${(index * 1.7 + (index % 5) * 0.38).toFixed(2)}%`,
  delay: `${-(index % 17) * 0.72}s`,
  duration: `${9 + (index % 13) * 0.58}s`,
  opacity: `${0.16 + (index % 7) * 0.055}`,
  size: `${10 + (index % 4)}px`,
}));
</script>

<template>
  <div class="binary-rain" aria-hidden="true">
    <span
      v-for="column in columns"
      :key="column.id"
      class="binary-column"
      :style="{
        '--left': column.left,
        '--delay': column.delay,
        '--duration': column.duration,
        '--opacity': column.opacity,
        '--size': column.size,
      }"
    >{{ column.text }}</span>
  </div>
</template>
