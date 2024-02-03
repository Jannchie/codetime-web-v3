<script setup lang="ts">
const { data: user } = await fetchUser()
provide('user', user)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --r-color-primary-0: 229 247 255;
  --r-color-primary-1: 211 235 250;
  --r-color-primary-2: 169 212 241;
  --r-color-primary-3: 124 189 233;
  --r-color-primary-4: 87 169 224;
  --r-color-primary-5: 63 156 220;
  --r-color-primary-6: 48 150 220;
  --r-color-primary-7: 31 130 196;
  --r-color-primary-8: 15 115 176;
  --r-color-primary-9: 0 100 156;
  --r-color-primary-10: 8 47 73;
  --r-color-secondary-0: 233 251 240;
  --r-color-secondary-1: 220 241 227;
  --r-color-secondary-2: 186 223 199;
  --r-color-secondary-3: 150 206 169;
  --r-color-secondary-4: 119 191 144;
  --r-color-secondary-5: 99 181 128;
  --r-color-secondary-6: 88 176 119;
  --r-color-secondary-7: 71 154 100;
  --r-color-secondary-8: 59 138 88;
  --r-color-secondary-9: 44 119 73;
  --r-color-secondary-10: 2 44 34;
  --r-color-tertiary-0: 255 247 225;
  --r-color-tertiary-1: 255 237 205;
  --r-color-tertiary-2: 252 217 158;
  --r-color-tertiary-3: 249 196 107;
  --r-color-tertiary-4: 247 178 63;
  --r-color-tertiary-5: 246 167 36;
  --r-color-tertiary-6: 245 161 19;
  --r-color-tertiary-7: 218 140 4;
  --r-color-tertiary-8: 195 125 0;
  --r-color-tertiary-9: 170 106 0;
  --r-color-tertiary-10: 87 37 8;
  --r-color-error-0: 255 234 234;
  --r-color-error-1: 252 213 213;
  --r-color-error-2: 242 168 169;
  --r-color-error-3: 234 122 122;
  --r-color-error-4: 226 83 83;
  --r-color-error-5: 222 57 57;
  --r-color-error-6: 221 43 43;
  --r-color-error-7: 196 30 31;
  --r-color-error-8: 175 23 26;
  --r-color-error-9: 154 9 19;
  --r-color-error-10: 69 10 10;
  --r-color-surface-0: 254 254 254;
  --r-color-surface-1: 250 250 250;
  --r-color-surface-2: 242 242 242;
  --r-color-surface-3: 232 232 232;
  --r-color-surface-4: 198 198 198;
  --r-color-surface-5: 115 115 115;
  --r-color-surface-6: 82 82 82;
  --r-color-surface-7: 52 52 52;
  --r-color-surface-8: 38 38 38;
  --r-color-surface-9: 23 23 23;
  --r-color-surface-10: 18 18 18;

}
</style>
