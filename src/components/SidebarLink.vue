<template>
  <router-link v-bind="$attrs" @click="isCollapsed" :to="to" class="link" :class="{ active: isActive }">
    <img :src="icon"  class="icon" >
    <span v-if="!collapsed">
        <slot />
    </span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import router from '../router';
import { collapsed, toggleSidebar } from './state';
const pros = defineProps({
    to : {
        type : String,
        required : true
    },
    icon : {
        type : String,
        required : true
    }
})

const isCollapsed = computed( () => {
    if(!collapsed.value){
        return toggleSidebar
    }else{
        return null
    }

})

const isActive = computed( () => router.currentRoute.value.path.startsWith(pros.to))



</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to{
    opacity: 0;
}



.link{
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    position: relative;
    user-select: none;

    color: #fff;
    font-size: var(--font-text);
    font-weight: 900;
    height: 60px;
    width: 100%;
    background-color: #0005;
    gap: 2px;
    transition: 0.5 linear;

}
.link:hover{
    transition: 0.5s  ease-out;
    background-color: #FFF;
    color: var(--red);
}

.link:hover .icon{
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);
}
.link.active .icon{
    filter: brightness(0) saturate(100%) invert(49%) sepia(54%) saturate(7439%) hue-rotate(342deg) brightness(103%) contrast(104%);    
}

.link.active{
    transition: 0.5s  ease-out;
    background-color: #FFF;
    color: var(--red);
}

.link .icon{
    height: 30px;
    width: 30px;
}


</style>