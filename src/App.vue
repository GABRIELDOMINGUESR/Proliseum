<template>
  <CustomNav v-show="showNav" />
  <div :style="showNav ? { 'margin-left' : tamanho } : { 'margin-left' : '0' } ">
    <RouterView :key="$route.fullPath" v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Suspense>
          <!-- main content -->
          <Transition name="fade">
            <component :is="Component" :key="$route.fullPath"/>
          </Transition>

          <!-- loading state -->
          <template #fallback>
            <div class="loadingScreen">
              <img src="./assets/img/Rolling-1s-323px.svg">
            </div>
          </template>
        </Suspense>
      </Transition>
    </RouterView>
  </div>
  
</template>

<script setup>
import { computed } from 'vue';
import CustomNav from './components/CustomNav.vue';
import router from './router';
import { SIDEBAR_WIDTH_COLLAPSED } from './components/state.js';

const tamanho = `${SIDEBAR_WIDTH_COLLAPSED}px`;

const showNav = computed(() => {
  const excludedPaths = ['/', '/login', '/recovery', '/register'];
  const { path, name } = router.currentRoute.value;
  return !excludedPaths.includes(path) && name !== 'Not_Found';
});
</script>

<style scoped>
.loadingScreen {
  height: 100vh;
  display: grid;
  place-items: center;
}
.loadingScreen img {
  height: 20vh;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

router-link {
  color: #fff;
}
</style>
