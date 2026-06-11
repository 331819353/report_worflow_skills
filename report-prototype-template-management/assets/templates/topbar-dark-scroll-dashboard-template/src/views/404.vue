<template>
  <main class="fallback-page">
    <h1>404</h1>
    <p>Page not found.</p>
  </main>
</template>

<style scoped>
.fallback-page {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 12px;
  color: var(--text, #1f2937);
  background: var(--page-background, #f6f8fb);
  text-align: center;
}

.fallback-page h1 {
  margin: 0;
  font-size: 48px;
}

.fallback-page p {
  margin: 0;
}
</style>
