<template>
    <div>
        <span class="label">{{ label }}</span>
        <img :alt="label" :src="$withBase(`/assets/img/${fileName}`)">
    </div>
</template>

<script>
export default {
    props: {
        fileName: String
    },
    computed: {
        label() {
            const parts = this.fileName.split('.')
            return `${parts[0]} for ${parts[2]} as of ${parts[1]}`
        }
    }
}
</script>