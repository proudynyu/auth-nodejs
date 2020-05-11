<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Auth-Api</h1>
      <p class="lead">Learning Auth and Vue</p>
      <hr class="my-4">
      <p>Register for content</p>
      <p class="lead">
        <router-link
         class="btn btn-primary btn-lg"
         :to="{ name:'Signup' }"
         role="button">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>

</script>
