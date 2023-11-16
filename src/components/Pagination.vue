<template>
  <div class="pagination" >
  <a href="#" v-on:click="changePage(pageMin)" :class="page == pageMin? 'desabled' : false">&laquo;</a>
  <a href="#" v-for="n in pageMax" :class=" n == page ?'active': false " :key="n" v-on:click="changePage(n)" v-show=" (n - 3) <= page && (n + 3) >= page" >{{ n }}</a>
  <a href="#" v-on:click="changePage(pageMax)" :class="page == pageMax? 'desabled' : false">&raquo;</a>
</div>
</template>

<script setup>
import { ref } from "vue"
import { computed } from 'vue'

const props = defineProps({
    elements: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        required: true
    },
    modelValue: {
      type: Number,
      required: true
    }
})
const emit = defineEmits(['update:modelValue'])


const elements = props.elements
const elementsPerPage = props.perPage
const page = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const pageMax = Math.ceil(elements / elementsPerPage)
const pageMin = 1

const changePage = (n) => {
    if(n < pageMin || n > pageMax){
    }else{
      console.log(page.value)
      emit('update:modelValue', n)
      
    }
}


</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: #FFF;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
}

.pagination a.active {
  background-color: var(--red);
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #0005;
  border-radius: 5px;
}

.desabled{
    filter: opacity(50%);
}
</style>