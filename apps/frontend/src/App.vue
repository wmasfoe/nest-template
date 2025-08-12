<script setup lang="ts">
import { ref } from 'vue';
import type { 
  BaseResponse, 
  PaginationResponse, 
  User, 
  LoginRequest,
  LoginResponse
} from '@packages/shared';
import { ROUTES } from '@packages/shared';

const userList = ref<User[]>([]);

const handleFetchUserList = async () => {
  const res = await fetch(ROUTES.USERS.LIST, {
    headers: {
      Authorization: `Bearer ${curToken.value}`,
      'Content-Type': 'application/json',
    },
  });

  const data: PaginationResponse<User> = await res.json();
  userList.value = data.data.tableResult;
};

const curToken = ref<string>('');

const loginForm = ref<LoginRequest>({
  account: 'admin@gmail.com',
  password: '12345678',
});

const handleLogin = async () => {
  const res = await fetch(ROUTES.AUTH.LOGIN, {
    method: 'POST',
    headers: {
      // 必须要 content-type 否则后端中间件会拦截
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginForm.value),
  })

  const data: BaseResponse<LoginResponse> = await res.json();
  curToken.value = data.data.access_token;
};
</script>

<template>
  <h1>hello</h1>

  <div class="container border" v-if="!curToken">
    <input type="text" v-model="loginForm.account">
    <input type="text" v-model="loginForm.password">
    <div class="item">
      <button @click="handleLogin">login</button>
    </div>
  </div>

  <template v-else>
    <span class="token">
      <h5 style="margin: 0;">Token:</h5>
      {{ curToken }}
    </span>

    <div class="container border">
      <button @click="handleFetchUserList">fetch user list</button>

      <h3 style="margin-block: 4px;">Result:</h3>
      <pre class="container">
        {{ userList }}
      </pre>
    </div>
  </template>

</template>

<style scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
  padding: 6px;

  width: 300px;
  max-width: 100%;
}

.border {
  border: 1px solid #333;
  border-radius: 4px;
}

.container:not(:first-of-type) {
  margin-top: 20px;
}

.container > div.item {
  display: flex;
  flex-flow: row nowrap;
  gap: 4px;
}

.token {
  display: inline-block;
  margin-bottom: 10px;

  word-wrap: break-word;
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}
</style>
