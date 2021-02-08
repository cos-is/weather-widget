<template>
  <button class="icon-button" @click="$emit('click')">
    <svgicon :name="icon" original />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .icon-button {
    display: inline-flex;
    padding: 5px;
    border: none;
    cursor: pointer;
    background: transparent;
  }
</style>
