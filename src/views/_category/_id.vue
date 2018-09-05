<template>
  <div>
    <h1>{{title}}</h1>
    <Body v-show="body" :list="body"/>
    <Extras v-show="extras" :list="extras"/>
  </div>
</template>
<script>
import page from '@/mixins/page'
export default {
  mixins:[page]
}
</script>
