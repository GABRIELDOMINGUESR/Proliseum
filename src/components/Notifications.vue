<template>
    <div class="container">
        <div class="back">
            <img class="image" src="https://img.icons8.com/material-sharp/96/FFFFFF/bell.png" alt="">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container{
    cursor: pointer;
}
.back{
    background-color: var(--red);
    width: 5vh;
    height: 5vh;
    border-radius: 50%;
    display: inline-block;
    display: grid;
    place-items: center;
}

.back:hover{
    background-color: #FFF;
}
.back:hover .image{
    filter: brightness(0) saturate(100%) invert(42%) sepia(42%) saturate(5000%) hue-rotate(338deg) brightness(95%) contrast(112%);
}
.image{
    height: 4vh;
}

</style>