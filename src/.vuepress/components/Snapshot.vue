<template>
    <div class="snapshot">
        <div class="label">{{ label }}</div>
        <img
            class="medium-zoom-image" 
            :alt="label" 
            :src="$withBase(`/assets/img/${fileName}.png`)">
    </div>
</template>

<script>
export default {
    props: {
        fileName: String
    },
    computed: {
        label() {
            const parts = this.fileName.split('/')
            return `${parts[3]} for ${parts[4]} as of ${parts.slice(0, 3).join('-')}`
        }
    },
}
</script>

<style scoped>
.snapshot {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>