import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import styles from './MarkdownRenderer.module.scss';

const schema = {
	...defaultSchema,
	tagNames: [
		...(defaultSchema.tagNames || []),
		'p',
		'strong',
		'em',
		'code',
		'pre',
		'blockquote',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'ul',
		'ol',
		'li',
		'hr',
		'br',
		'table',
		'thead',
		'tbody',
		'tr',
		'th',
		'td',
	],
	attributes: {
		...defaultSchema.attributes,
		code: [...(defaultSchema.attributes?.code || []), 'className'],
		pre: [...(defaultSchema.attributes?.pre || []), 'className'],
	},
};

const MarkdownRenderer = ({ children, className }) => {
	if (!children) return null;

	return (
		<div className={className}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
				components={{
					code({ inline, className, children }) {
						const isInline = inline ?? !String(children).includes('\n');
						return (
							<code className={isInline ? styles.inlineCode : className}>
								{children}
							</code>
						);
					},
					pre({ children }) {
						return <pre className={styles.codeBlock}>{children}</pre>;
					},
					a({ children }) {
						return (
							<a target='_blank' rel='noopener noreferrer'>
								{children}
							</a>
						);
					},
				}}
			>
				{children}
			</ReactMarkdown>
		</div>
	);
};

export default MarkdownRenderer;
