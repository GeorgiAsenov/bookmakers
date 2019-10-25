<template>
  <div class="default">
    <multiselect
      v-model="value"
      :options="countries"
      label="name"
      track-by="name"
      placeholder="Country"
      select-label:
    ></multiselect>
    <div class="holder">
      <input
        type="text"
        class="link"
        :href="`bookmaker.links.default`"
        v-if="bookmaker.links"
        :value="countryCode"
      />
      <span class="add-more close" @click="removeLink"></span>
    </div>
  </div>
</template>

<script>
import CountryData from '@/assets/jsonData/countries.json'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: {
    bookmaker: {
      type: Object
    },
    indexIn: {
      type: Number
    }
  },
  data () {
    return {
      value: '',
      countries: CountryData
    }
  },
  methods: {
    removeLink () {
      this.$emit('getRowIndex', this.indexIn)
    }
  },
  computed: {
    countryCode () {
      if (this.value.code) {
        return `${
          this.bookmaker.links.default
        }/${this.value.code.toLowerCase()}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/link-holder.scss";
</style>

<style lang="scss">
.multiselect {
  .multiselect__tags {
    .multiselect__single {
      white-space: nowrap;
      font-size: 1.4rem;
      .multiselect__option--highlight {
        background: red !important;
        outline: none;
        color: #fff;
      }
    }
  }
}
</style>
