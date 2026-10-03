# Yeahub-project

### v. 1.6

## ✨ Добавлено:

### v. 1.5:

1. Добавил Скелетоны к существующим страницам

### v. 1.6:

1. Добавил общий компонент (ErrorState) для отслеживания ошибок при загрузки данных

## 🐛 Исправлено:

### v. 1.2:

1. Убрал кастомный хук useDebounced, вместо него использовал debounce из lodash.debounce.
2. Убрал в FilterSidebar костыль (Два useEffect для синхронизации )

### v. 1.4:

1. Обновил страницу мока с фильтрами

## ♻️ Изменено:

### v. 1.1:

1. Поменял структуру кода

### v. 1.2:

1. Переделал структуру кода, добавил необходимые папки, удалил ненужные, переложил код , как положено.

### v. 1.3:

1. Раздробил код в QuestionDetailPage
2. Раздробил эндпоинты в папке entities/questions

### v. 1.4:

1. Перенес часть кода из useQuiz в папке entities/quiz, в новый хук useFiltersQuiz
2. Вынес отдельными кастомными хуками обработку фильтров из FiltersSidebar (useComplexityToggle, useSkillsToggle, useSpecializationToggle), для пере использования в MockInterviewPage

### v. 1.6:

1. Заменил способ передачи данных (был через state в ссылке) с страницы на страницу (QuestionCard -> QuestionDetailPage и MockInterviewPage -> Quiz)

## 🧑‍💻 Задачи:

1. Дополнить MockInterviewPage (сделать quiz)
2. Сделать страницу Main
