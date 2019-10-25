<template>
  <div class="bookmaker">
    <div class="left">
      <span class="order">{{ bookmaker.order }}</span>
      <label class="check-holder">
        <input type="checkbox" v-model="bookmaker.checked"/>
        <span class="checkmark"></span>
      </label>
      <div class="logo-holder">
        <img src="@/assets/images/1xbet.png" alt="1xbet logo." />
        <span>{{ bookmaker.name }}</span>
      </div>
    </div>
    <div class="right">
      <div class="link-holder">
        <div class="default">
          <span v-if="bookmaker.links" class="text-default">Default:</span>
          <div class="holder">
            <input
              type="text"
              spellcheck="false"
              class="link"
              :href="`bookmaker.links.default`"
              v-if="bookmaker.links"
              :value="bookmaker.links.default"
            />
            <span :class="{'disabled' : !bookmaker.links}" class="add-more" @click="addMore"></span>
          </div>
        </div>
        <additional-link
          v-for="(links, index) in selectedAdditionalLinks"
          :key="links.id"
          :indexIn="index"
          :bookmaker="bookmaker"
          @getRowIndex="removeItem(indexIn = $event)"
        ></additional-link>
      </div>
    </div>
  </div>
</template>

<script>
import AdditionalLink from '@/components/AdditionalLink'
import { setInterval } from 'timers'

export default {
  components: {
    additionalLink: AdditionalLink
  },
  props: {
    bookmaker: {
      type: Object
    }
	},
  data () {
    return {
      selectedAdditionalLinks: [],
      additionalLinkId: 0
    }
	},
  methods: {
    addMore () {
      if (!this.bookmaker.links) {
        return false
      } else {
        this.selectedAdditionalLinks.push({
          id: this.additionalLinkId
        })
        this.additionalLinkId++
      }
    },
    removeItem (indexIn) {
      this.selectedAdditionalLinks.splice(indexIn, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/link-holder.scss";

.bookmaker {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-bottom: 1px solid $link-background;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  &:last-of-type {
    border-bottom: none;
  }
  .left {
    .order {
			font-size: 1.5rem;
    }
    display: flex;
    align-items: center;
    .logo-holder {
      display: flex;
      flex-direction: column;
      margin: 2rem 0 0 4rem;
      span {
        text-align: center;
        margin-top: 1rem;
        font-size: 1.5rem;
        color: $text-default;
        margin-bottom: 12px;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    width: 70%;
  }
}
</style>
