<template>
  <div>
    <h1>Login</h1>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <!-- eslint-disable -->
    <form>
        <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              type="text" 
              class="form-control" 
              id="username" 
              aria-describedby="usernameHelp"
              required>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              type="password" 
              class="form-control" 
              id="password"
              required>
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </div>
</template>

<script>
import Joi from '@hapi/joi';

const SIGNIN_URL = 'http://localhost:3333/auth/signin';

const schema = Joi.object().keys({
  username: Joi.string().regex(/^[a-zA-Z0-9_]+$/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(10).required(),
  confirmPassword: Joi.string().trim().min(10).required(),
});

export default {
  data: () => ({
    errorMessage: '',
    sucessMessage: '',
    user: {
      username: '',
      password: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    async validUser() {
      const result = await schema.validateAsync({
        username: this.user.username,
        password: this.user.password,
      });
      if (result.error === undefined) {
        return true;
      }
      this.errorMessage = 'Character invalids on Username/Password';
      return false;
    },
    async signin() {
      this.errorMessage = '';
      this.sucessMessage = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        try {
          const data = await fetch(SIGNIN_URL, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'content-type': 'application/json',
            },
          });
          if (data.ok) {
            setInterval(() => {
              this.sucessMessage = 'Login in';
              this.$router.push('/');
            }, 1000);
          }
          throw new Error(data);
        } catch (err) {
          setInterval(() => {
            this.errorMessage = err.message;
          }, 1000);
        }
      }
    },
  },
};
</script>
