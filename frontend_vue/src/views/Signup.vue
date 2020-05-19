<template>
    <div>
        <h1>Sign Up</h1>

        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>

        <div v-if="sucessMessage" class="alert alert-success" role="alert">
          {{ sucessMessage }}
        </div>

        <form
          class="container-md"
          v-if="!signingUp"
          autocomplete="off"
          @submit.prevent="validUser">
        <div class="form-group">
            <label for="username">Username</label>
            <!-- eslint-disable -->
            <input
                v-model="user.username"
                type="text"
                class="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter Username"
                required
                >
            <small
                id="usernameHelp"
                class="form-text text-muted">Username must be longer than 2 and shorter than 30.<br>
                Username can only contain alhapnumeric characters and under_scores</small>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input 
                v-model="user.password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required>
            <small
                id="passwordHelp"
                class="form-text text-muted">Password must be longer than 10 characters.</small>
        </div>
        <div class="form-group">
            <label for="confirmPassword">Confirm your password</label>
            <input 
                v-model="user.confirmPassword"
                type="password"
                class="form-control"
                id="confirmPassword"
                placeholder="Password"
                required>
            <small
                id="confirmHelp"
                class="form-text text-muted">Please confirm your password.</small>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
    </div>
</template>

<script>
import Joi from '@hapi/joi';

const SIGNUP_URL = 'http://localhost:3333/auth/signup';

const schema = Joi.object().keys({
  username: Joi.string().regex(/^[a-zA-Z0-9_]+$/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(10).required(),
  confirmPassword: Joi.string().trim().min(10).required(),
});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    sucessMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
        this.sucessMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    async validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Password must match';
        return false;
      }
      try {
        await schema.validateAsync({
          username: this.user.username,
          password: this.user.password,
          confirmPassword: this.user.confirmPassword,
        });
        return this.signup();
      } catch (err) {
        if (err.message.includes('username')) {
          this.errorMessage = 'Username invalid';
        }
        return false;
      }
    },
    async signup() {
      this.errorMessage = '';
      try {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.signingUp = true;
        const data = await fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        });
        if (data.status === 400) {
          this.errorMessage = 'Bad Request';
          throw new Error(data);
        }
        this.sucessMessage = 'Successfully created account';
        setInterval(() => {
          this.signingUp = false;
          this.$router.push('/login').catch((error) => {
            if (error.name !== 'NavigationDuplicated') {
              throw error;
            }
          });
        }, 1000);
      } catch (err) {
        setInterval(1000);
        this.signingUp = false;
      }
    },
  },
};
</script>
