import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetQuestionsQuery,
	useGetQuestionIdQuery,
} from '@/entities/questions';
import { useFiltersItems } from '@/entities/questions';

import QuestionDetailPageSkeleton from './QuestionDetailPageSkeleton/QuestionDetailPageSkeleton';
import QuestionNavigation from './QuestionNavigation/QuestionNavigation';
import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import QuestionInfo from './QuestionInfo/QuestionInfo';
import QuestionContacts from './QuestionContacts/QuestionContacts';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

import Icon from '@/shared/ui/Icon';
import styles from './QuestionDetailPage.module.scss';

const QuestionDetailPage = () => {
	const { filters } = useFiltersItems();
	const navigate = useNavigate();

	const { id } = useParams();

	const {
		data: question,
		isLoading,
		error,
		refetch,
	} = useGetQuestionIdQuery(id);

	const fetchListQuestions = useGetQuestionsQuery(filters);
	const listQuestions = fetchListQuestions?.data?.data;

	if (isLoading) return <QuestionDetailPageSkeleton />;
	if (error || !question) {
		return (
			<ErrorState
				title='Не удалось загрузить вопрос'
				error={error}
				onRetry={() => refetch()}
			/>
		);
	}

	return (
		<div className={styles.detail}>
			<button onClick={() => navigate('/questions')} className={styles.prev}>
				<Icon name='prevArrow' />
				<p>Назад</p>
			</button>
			<div className={styles.container}>
				<main className={styles.main}>
					<header className={styles.header}>
						<div className={styles.header_icon}>
							<Icon name='imgTitle' />
						</div>
						<div className={styles.header_heading}>
							<h2 className={styles.header_title}>{question?.title}</h2>
							<p>Вопрос проверяет знание React под капотом</p>
						</div>
					</header>

					<QuestionNavigation id={id} listQuestions={listQuestions} />

					<QuestionAnswer
						shortAnswer={question?.shortAnswer}
						longAnswer={question?.longAnswer}
					/>
				</main>
				<div className={styles.sidebar}>
					<QuestionInfo
						complexity={question?.complexity}
						rate={question?.rate}
						skills={question?.questionSkills}
						keywords={question?.keywords}
						createdBy={question?.createdBy}
					/>
					<QuestionContacts />
				</div>
			</div>
		</div>
	);
};

export default QuestionDetailPage;
