<template>
  <!-- 缓存路由组件 -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <!-- 由于创建和销毁组件十分消耗浏览器性能，有时我们希望当组件进行路由切换的时候，不被销毁，缓存起来。
为了解决这个问题，我们可以用一个 <keep-alive> 元素将其动态组件包裹起来。
被<keep-alive>包裹的组件将不会被销毁。
当路由组件被<keep-alive> 包裹当路由切换，Vue为我们提供了两个生命周期钩子，actived和deactived。
当一个组件从显示到隐藏的时候，触发deactived()钩子，
当路由组件从隐藏到显示的时候，触发actived钩子，
由于<keep-alive> 包裹的组件不会被销毁和重复创建，mounted()只会执行一次
这两个钩子可以做到代替mounted()和destoryed()钩子执行业务的效果，可以执行多次
 -->
</template>

<script>
export default {}
</script>

<style lang="less"></style>
