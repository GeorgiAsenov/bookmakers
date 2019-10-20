<template>
    <div class="container">
        <section class="options">
            <button class="v-button save">save</button>
            <div class="filter">
                <!-- multiselect -->
                <button class="v-button check">check all</button>
                <button class="v-button remove">remove all</button>
            </div>
            
        </section>
        <section class="bookmakers">
            <app-bookmaker></app-bookmaker>
        </section>
    </div>
</template>

<script>
import Bookmaker from '@/components/Bookmaker'
export default {
    components: {
        appBookmaker: Bookmaker
    }
}
</script>

<style lang="scss" scoped>
    .container {
        background-color: #F1F3F9;
    }
</style>