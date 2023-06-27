export const vue2Template = `
<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},

  methods: {},
};
</script>
<style src='./index.scss'></style>
`;
export const scssTemplate = `
@import '@/styles/mixins/mixins';
@include b(xxx) {}
`;
export const vue3Template = `
<template>
  <div></div>
</template>
<script lang="ts" setup></script>
<style lang="./index.scss"></style>

`;
export const vue2DialogTemp = `
<template>
  <el-dialog title="提示" :visible.sync="dialogVisible"  width="360px">
  </el-dialog>
</template>
<script>
export default {
  props: {
    showVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    dialogVisible: {
      get() {
        return this.showVisible;
      },
      set() {
        this.$emit("closed", false);
      },
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>

`;
