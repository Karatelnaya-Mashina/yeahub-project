module.exports = {
	multipass: true, // несколько проходов оптимизации
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					// Не удаляем viewBox — он нужен для масштабирования
					removeViewBox: false,

					// Можно оставить, если используете как React-компоненты
					removeTitle: true,
					removeDesc: true,
				},
			},
		},

		// Удаляем ненужные атрибуты
		'removeDimensions', // убирает width/height (оставляет viewBox)
		'removeScripts',
		'removeStyleElement',
		'removeOffCanvasPaths',

		// Очистка ID (важно, если иконки потом объединяются)
		{
			name: 'cleanupIds',
			params: {
				minify: true,
			},
		},

		// Можно добавить конвертацию цветов и т.д.
		{
			name: 'convertColors',
			params: {
				currentColor: false, // true — если хотите, чтобы иконки наследовали color
			},
		},
	],
};
