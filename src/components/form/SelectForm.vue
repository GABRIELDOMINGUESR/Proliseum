<template>
    <div class="card">
        <span>{{ label }}</span>
        <select @input="$emit('update:modelValue', $event.target.value)" :name="props.name" id="props.name" required>
            <option value="">{{ props.default }}</option>
            <option v-for="item in props.list" :selected="props.selected == item" :key="item" :value="props.list.indexOf(item)">{{ item }}</option>
        </select>
    </div>
</template>

<script setup>
import { list } from 'firebase/storage'
import { ref } from 'vue'

const props = defineProps({
    default : {
        type: String,
        require : true
    },
    name : {
        type: String,
        require : true
    },
    label : {
        type: String,
    },
    list : {
        type: list[String]
    },
    selected : {
        type: String
    }
})

</script>

<style scoped>
    .card{
        display: flex;
        flex-direction: column;
    }
    select{
        max-height: 55px;
        font-weight: 500;
        padding-left: 40px;
        font-size: var(--font-text);
        min-width: 20vw;
        max-width: 100%;
        border-bottom: 3px solid transparent;
        height: 3vw;
        font-family: 'Poppins', sans-serif;
    }
    option:checked,
    option:hover {
      background-color: var(--red);
    }
    .select-selected {
        background-color: DodgerBlue;
    }
    select:focus{
    outline: none;
  }
</style>