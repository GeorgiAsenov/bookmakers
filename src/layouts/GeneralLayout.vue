<template>
  <div class="container">
    <section class="options">
      <button class="v-button save" @click="sendUpdatedBookmakers">save</button>
      <div class="filter">
        <multiselect
          v-model="value"
          :options="allSelections"
          :searchable="true"
          :show-labels="false"
          :allow-empty="false"
          :reset-after="false"
          placeholder='Choose bookmaker'
          label="name"
          :class="{'unclickable' : removedBookies}"
          >
        </multiselect>
        <button :class="{'unclickable' : removedBookies}" class="v-button check" @click="checkAll">
          <span class="check"></span> check all
        </button>
        <button class="v-button remove" @click="removeAll">
          <span :class="{'close' : !removedBookies, 'check' : removedBookies}"></span> 
          <span v-if="!removedBookies">remove</span>
          <span v-else>add</span> &nbsp; all
        </button>
      </div>
    </section>
    <section class="bookmakers">
      <draggable
        v-model="bookmakers"
        @start="drag=true"
        @end="drag=false"
        @change="moved"
        v-bind="dragOptions"
        class="list-group"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <app-bookmaker
            v-for="bookmaker in filteredBookmakers"
            :key="bookmaker.id"
            :bookmaker="bookmaker"
          ></app-bookmaker>
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
      groupFilter: {
        all: '--- SHOW ALL ---',
        active: '--- SHOW ACTIVE ---',
        inactive: '--- SHOW INACTIVE ---'
      },
      drag: false,
      value: '',
      allSelections: [{ name: '--- SHOW ALL ---' }, { name: '--- SHOW ACTIVE ---' }, { name: '--- SHOW INACTIVE ---' }, ...bookmakersJSON],
      bookmakers: [],
      removedBookies: false
    }
	},
  computed: {
    filteredBookmakers () {
      if (this.value === '' || this.value.name === this.groupFilter.all) {
        return this.bookmakers
      } else if (this.value.name === this.groupFilter.inactive) {
        return this.bookmakers.filter(
          bookmaker => bookmaker.active === 0
        )
      } else if (this.value.name === this.groupFilter.active) {
        return this.bookmakers.filter(
          bookmaker => bookmaker.active !== 0
        )
      } else {
        return this.bookmakers.filter(
          bookmaker => bookmaker.name === this.value.name
        )
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
	},
	created () {
    for (const el in bookmakersJSON) {
      let bookieCopy = {
        ...bookmakersJSON[el],
        checked: false
      }
      this.$set(bookmakersJSON, el, bookieCopy)
    }
    this.bookmakers = [...bookmakersJSON]
	},
  methods: {
    sendUpdatedBookmakers() {
      this.$api.post('http://http://localhost:8080/', {
        updatedBookies: this.bookmakers
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    checkAll () {
      this.bookmakers.forEach(bookmaker => {
        if (bookmaker.active !== 0) {
          bookmaker.checked = true
        }
      })
    },
    removeAll () {
      this.removedBookies = !this.removedBookies
      if (this.removedBookies) {
        this.bookmakers = []
      } else {
        this.bookmakers = bookmakersJSON
        this.moved()
      }    
    },
    moved () {
      let order = 1
      this.bookmakers.forEach(bookmaker => {
        if (bookmaker.order) {
          bookmaker.order = order
          order++
        }
      })
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
  .unclickable {
    pointer-events: none;
  }
}
</style>
