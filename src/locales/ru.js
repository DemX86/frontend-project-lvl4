/* eslint-disable no-template-curly-in-string */

export default {
  translation: {
    navbar: {
      project: 'Hexlet Chat',
      logout: 'Выйти',
    },
    loginPage: {
      title: 'Вход',
      username: 'Ваш ник',
      password: 'Пароль',
      button: 'Войти',
      noAccount: 'Нет аккаунта?',
      signupLink: 'Регистрация',
      submitError: 'Неверные имя пользователя или пароль',
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
        usernameLength: 'От 3 до 20 символов',
        passwordMin: 'Не менее 6 символов',
        passwordsMatch: 'Пароли должны совпадать',
      },
    },
    chatPage: {
      channels: 'Каналы',
      messagesCount: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
        key_other: '{{count}} сообщений',
      },
      empty: 'В этом чате пока нет сообщений',
      placeholder: 'Введите сообщение…',
      ariaLabel: 'Новое сообщение',
      send: 'Отправить',
      loadingErrorToast: 'Ошибка соединения',
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
      connectionError: 'Ошибка соединения',
    },
  },
};
