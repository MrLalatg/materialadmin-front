<template>
  <div>
    <loading-progress
    :indeterminate="true"
    :rotate="true"
    shape="circle"
    />
    <p>Платеж обрабатывается...</p>
  </div>
</template>

<script>

export default {

}

</script>

<style scoped>
  div{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }
</style>
