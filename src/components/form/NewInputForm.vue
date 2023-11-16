<template>
  <div class="input-wrap">
    <span for="">{{ label }} </span>
    <div class="line">
      <img class="icon" :src="icon">
      <input
        class="input" 
        type="text" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
    </div>
    <span class="optional" v-if="optional">opcional</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: ""
  },
  optional: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
  }
})


</script>

<style scoped>
  .input-wrap{
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .input{
    max-height: 55px;
    font-weight: 500;
    padding-left: 40px;
    font-size: var(--font-text);
    min-width: 20vw;
    max-width: 100%;
    border-bottom: 3px solid transparent;
    height: 3vw;
  }
  .optional{
    font-size: var(--font-text);
  }
  input:focus{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }
  input:hover{
    outline: none;
    border-bottom: 5px solid var(--red);
    transition: 0.2s;
  }
  input{
    outline: none;
    border: none;
    font-family: 'Poppins', sans-serif;
  }
  .icon{
    position: absolute;
    height: 25px;
    margin-left: 10px;
    opacity: 30%;
  }
  .line{
    display: flex;
    align-items: center;
  }
</style>