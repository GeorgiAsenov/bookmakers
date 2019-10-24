<template>
  <div class="container">
    <section class="options">
      <button class="v-button save">save</button>
      <div class="filter">
        <multiselect v-model="value" :options="bookmakers" label="name" track-by="name"></multiselect>
        <button class="v-button check">
          <span class="check"></span> check all
        </button>
        <button class="v-button remove">
          <span class="close"></span> remove all
        </button>
      </div>
    </section>
    <section class="bookmakers">
      <draggable
        v-model="bookmakers"
        @start="drag=true"
        @end="drag=false"
        v-bind="dragOptions"
        class="list-group"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <app-bookmaker v-for="bookmaker in filteredBookmakers" :key="bookmaker.id" :bookmaker="bookmaker"></app-bookmaker>
        </transition-group>
      </draggable>
    </section>
  </div>
</template>

<script>
import Bookmaker from '@/components/Bookmaker'
import bookmakersJSON from '@/assets/jsonData/bookies.json'
import Multiselect from 'vue-multiselect'
import draggable from 'vuedraggable'

export default {
  name: 'transition-example-2',
  display: 'Transitions',
  components: {
    appBookmaker: Bookmaker,
    Multiselect,
    draggable
  },
  data () {
    return {
      drag: false,
      value: '',
      bookmakers: bookmakersJSON
    }
  },
  computed: {
    filteredBookmakers () {
      if (this.value === '') {
        return this.bookmakers
      } else {
        return this.bookmakers.filter(bookmaker => bookmaker.name === this.value.name)
      }
    },
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.container {
  background-color: $background-color;
  padding: 2rem;
  .options {
    .filter {
      display: flex;
    }
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
  }
  .list-group-item {
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
}
</style>
