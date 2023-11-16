<template>
  <NewCustomButton @onClick="isOpen = true" label="APARECER"/>
  <Modal :open="isOpen" @close="isOpen = !isOpen">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Dolore ab culpa dolorum placeat harum veritatis praesentium,
    illo mollitia consequatur. Ipsum laboriosam impedit voluptatem consequatur
    alias mollitia repudiandae doloribus numquam consectetur.
  </Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '../components/popup/Modal.vue';
import NewCustomButton from '../components/NewCustomButton.vue';

const isOpen = ref(false)


</script>

<style>

</style>