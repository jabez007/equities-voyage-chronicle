<template>
    <div class="container">
        <div 
            v-if="(reports || []).length > 0"
            class="column">
            <snapshot 
                v-for="(r, i) in reports"
                :key="i"
                :file-name="r"
            />
        </div>
        <div
            v-if="chart"
            class="column">
            <snapshot :file-name="chart"></snapshot>
        </div>
    </div>
</template>

<script>
import Snapshot from './Snapshot.vue'

export default {
    props: {
        reports: Array,
        chart: String
    },
    components: {
        Snapshot
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: stretch;
    gap: 2rem;
}
.column {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
}
</style>