<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :md="12" :xl="16"></a-col>
      <a-col :xs="24" :md="12" :xl="8">
        <div class="login-container-form">
          <div class="login-container-hello">您好!</div>
          <div class="login-container-title">欢迎来到通用管理后台</div>
          <a-form ref="formRef" :model="form" :rules="rules" @keyup.enter="handleSubmit">
            <a-form-item name="username">
              <a-input v-model:value="form.username" autocomplete="off" placeholder="请输入帐号">
                <template v-slot:prefix>
                  <Icon icon="UserOutlined" style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password v-model:value="form.password" autocomplete="off" placeholder="请输入密码">
                <template v-slot:prefix>
                  <Icon icon="LockOutlined" style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleSubmit()"> 登录 </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <div class="login-container-tips">Vue-Admin 开源通用后台管理模板</div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, ref } from 'vue';
export default defineComponent({
  name: 'login',
  setup() {
    const dataForm = () => {
      const form = reactive({
        username: undefined,
        password: undefined,
      });
      return form;
    };

    const form = dataForm();

    const rules = reactive({
      username: [
        {
          required: true,
          message: '请输入帐号',
          trigger: 'change',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'change',
        },
      ],
    });

    const formRef = ref();

    const store = useStore();

    const router = useRouter();

    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const handleSubmit = (): void => {
      formRef.value.validate().then(() => {
        store.dispatch('user/login', form).then(e => {
          const route = router.currentRoute.value;
          const url = route.query.redirect || '/';
          store.commit('user/asyncUserInfo');
          store.commit('tabs/asyncTabs');
          store.commit('settings/asyncSettings');
          router.replace(url as string);
          proxy?.$message.success('登录成功');
        });
      });
    };

    return { formRef, form, rules, handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('./assets/login_bg.png');
  background-size: cover;
  overflow: hidden;

  & .login-container-form {
    width: calc(100% - 50px);
    height: 400px;
    padding: 4vh;
    margin: calc((100vh - 380px) / 2) auto auto;
    background: url('./assets//form_bg.png');
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);

    & .login-container-hello {
      font-size: 32px;
      color: #fff;
    }

    & .login-container-title {
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
    }
  }

  .login-container-tips {
    position: fixed;
    bottom: 10px;
    width: 100%;
    height: 40px;
    color: rgba(255, 255, 255, 0.856);
    text-align: center;
  }
}
</style>
<style lang="scss">
.login-container {
  & .login-container-form {
    & .ant-col {
      width: 100%;
      padding: 0 10px 0 10px;
    }

    & .ant-input {
      height: 35px;
    }

    & .ant-btn {
      width: 100%;
      height: 45px;
      border-radius: 99px;
    }

    & .ant-form-item-explain-error {
      color: #faad14;
    }

    & .ant-form-item-has-error {
      border-color: #faad14;
    }
  }
}
</style>
