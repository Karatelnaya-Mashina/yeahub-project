export { useQuestions } from './model/useQuestions';
export { useFiltersItems } from './model/useFiltersItems';

export {
	useGetQuestionsQuery,
	useLazyGetQuestionsQuery,
} from './api/questionsApi';

export {
	useGetQuestionIdQuery,
	useLazyGetQuestionIdQuery,
} from './api/detailApi';

export { useGetSkillsQuery, useLazyGetSkillsQuery } from './api/skillsApi';

export {
	useGetSpecializationsQuery,
	useLazyGetSpecializationsQuery,
} from './api/specializationApi';

export type {
	QuestionsParams,
	Question,
	QuestionResponse,
} from './model/questionsApi.types';

export type { Skill, SkillResponse } from './model/skillsApi.types';

export type {
	Specialization,
	SpecializationResponse,
} from './model/specializationsApi.types';
