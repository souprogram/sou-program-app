<template>
    <div class="container">
        <form @submit.prevent="handleLogin">
            <div class="card">
                <h1>Tko si?</h1>
                <div class="row">
                    <div class="col-sm">
                        <div class="form-group mt-4">
                            <label for="username">Korisničko ime</label>
                            <input
                                v-model="username"
                                type="text"
                                class="form-control"
                                id="username"
                                placeholder="Upiši korisničko ime"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <label for="password">Lozinka</label>
                            <input
                                v-model="password"
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Upiši lozinku"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-3">
                    Pusti me unutra!
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { login } from '@/services/authService';

export default {
    name: 'LoginView',
    data: function () {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async handleLogin() {
            const loggedIn = await login({
                username: this.username,
                password: this.password,
            });

            if (!loggedIn) {
                this.$router.push('/error');
                return;
            }

            this.$router.push('/newsfeed');
        },
    },
};
</script>

<style scoped>
body {
    background-color: black;
}
a {
    color: black;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 2vw;
}
</style>
