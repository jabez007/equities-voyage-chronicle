<template>
  <Sticker v-if="visible" class="vuepress-tod" v-bind="$attrs">
    <div
      v-for="(item, index) in daysPosts"
      ref="chairTodItem"
      :key="index"
      class="vuepress-tod-item"
      :class="[
        { active: activeIndex === index },
      ]"
    >
      <a :href="$withBase(`${item.path}`)" :title="item.title">{{ item.title }}</a>
    </div>
  </Sticker>
</template>
  
<script>
import Sticker from "./Sticker.vue";

export default {
  components: {
    Sticker,
  },

  computed: {
    daysPosts() {
        const postsDate = this.$page.path.split("/").slice(1, 4).join("/");
        return this.$site.pages.filter(p => p.path.includes(postsDate));
    },

    activeIndex() {
        return this.daysPosts.findIndex(p => p.path == this.$page.path);
    },

    visible() {
      return (this.daysPosts && this.daysPosts.length);
    },
  },
};
</script>
  
<style lang="stylus">
.vuepress-tod {
  position: fixed;
  display: none;
  max-height: 100vh;
  max-width: 220px;
  overflow-y: auto;
  padding-top: 5rem;
  top: 0;
  left: 10px;
  box-sizing: border-box;
  /* background: #fff; */
  z-index: 0;

  .vuepress-tod-item {
    position: relative;
    padding: 0.1rem 0.6rem 0.1rem 1.5rem;
    line-height: 1.5rem;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    overflow: hidden;

    a {
      display: block;
      color: $textColor;
      width: 100%;
      box-sizing: border-box;
      font-size: 12px;
      font-weight: 400;
      text-decoration: none;
      transition: color 0.3s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.active {
      border-left-color: $accentColor;

      a {
        color: $accentColor;
      }
    }

    &:hover {
      a {
        color: $accentColor;
      }
    }
  }

  for i in range(3, 6) {
    .vuepress-tod-h{i} a {
      padding-left: 1rem * (i - 2);
    }
  }
}

// for vuepress-tod
@media (min-width: 1300px) {
  .vuepress-tod {
    display: block;
  }
}
</style>
  