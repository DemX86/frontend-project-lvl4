/* eslint-disable no-template-curly-in-string */

export default {
  translation: {
    navbar: {
      project: 'Hexlet Chat',
      logout: 'Выйти',
    },
    loginPage: {
      title: 'Вход',
      username: 'Имя пользователя',
      password: 'Пароль',
      button: 'Войти',
      noAccount: 'Нет аккаунта?',
      signupLink: 'Зарегистрируйтесь',
      submitError: 'Неверное имя пользователя и/или пароль',
    },
    signupPage: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
      hasAccount: 'Уже зарегистрированы?',
      loginLink: 'Войдите',
      submitError: 'Это имя пользователя занято',
      errors: {
        required: 'Поле обязательно к заполнению',
        usernameMin: 'Минимальная длина имени пользователя: ${min}',
        usernameMax: 'Максимальная длина имени пользователя: ${max}',
        passwordMin: 'Минимальная длина пароля: ${min}',
        passwordsMatch: 'Пароли должны совпадать',
      },
    },
    homePage: {
      channels: 'Каналы',
      messagesCount: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
        key_other: '{{count}} сообщений',
      },
      placeholder: 'Введите сообщение…',
      send: 'Отправить',
      loadingErrorToast: 'Ошибка загрузки данных',
    },
    notFoundPage: {
      notFound: 'Страница не найдена',
      help: 'Но вы всегда можете',
      homeLink: 'перейти на главную',
    },
    modals: {
      addChannel: {
        title: 'Создание канала',
        placeholder: 'Введите название нового канала',
        cancel: 'Отмена',
        submit: 'Создать',
        errors: {
          alreadyExists: 'Канал с таким именем уже существует',
        },
      },
      renameChannel: {
        title: 'Смена названия канала',
        placeholder: 'Введите новое название канала',
        cancel: 'Отмена',
        submit: 'Переименовать',
        errors: {
          alreadyExists: 'Канал с таким именем уже существует',
        },
      },
      removeChannel: {
        title: 'Удаление канала',
        confirm: 'Вы действительно хотите удалить канал',
        cancel: 'Отмена',
        submit: 'Удалить',
      },
    },
    socketToasts: {
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      connectionError: 'Ошибка подключения',
    },
  },
};
