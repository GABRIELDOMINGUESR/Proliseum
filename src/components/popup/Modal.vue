<template>
    <transition name="fade">
        <div class="vue-modal" v-show="open">
            <transition name="drop-in">
                <div class="vue-modal-inner" v-show="open">
                    <div class="vue-modal-content">
                      <slot/>
                      <NewCustomButton class="sair" label="FECHAR" @onClick="$emit('close')"/>
                    </div>  
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import NewCustomButton from '../NewCustomButton.vue';

defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

</script>

<style scoped>
.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner {
  min-width: 500px;
  max-width: fit-content;
  margin: 2rem auto;
}

.vue-modal-content {
  position: relative;
  background-color: var(--background-color);
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translate(0, -50px);
}


.sair{
  align-self: flex-end;
}
</style>