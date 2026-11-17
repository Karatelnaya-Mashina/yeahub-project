import type { ReactElement } from 'react';

import Logo from '../assets/icons/logo.svg';
import LogoText from '../assets/icons/logoText.svg';
import ArrowDown from '../assets/icons/arrowDown.svg';
import OpenModal from '../assets/icons/openModal.svg';
import BtnAdditionalFunction from '../assets/icons/btnAdditionalFunction.svg';
import Search from '../assets/icons/search.svg';
import PrevArrow from '../assets/icons/arrowPrevBtn.svg';
import NextArrow from '../assets/icons/arrowNextBtn.svg';
import Figma from '../assets/icons/figma.svg';
import Profile from '../assets/icons/profile.svg';
import TelegramWhite from '../assets/icons/telegramWhite.svg';
import TelegramPurple from '../assets/icons/telegramPurple.svg';
import YoutubeWhite from '../assets/icons/youtubeWhite.svg';
import YoutubePurple from '../assets/icons/youtubePurple.svg';
import TikTok from '../assets/icons/tik-tok.svg';
import Github from '../assets/icons/githubWhite.svg';
import Minus from '../assets/icons/minus.svg';
import Plus from '../assets/icons/plus.svg';
import Like from '../assets/icons/like.svg';
import Dislike from '../assets/icons/dislike.svg';
import Error from '../assets/icons/error.svg';

const ICONS = {
	logo: Logo,
	logoText: LogoText,
	arrowDown: ArrowDown,
	openModal: OpenModal,
	btnAdditionalFunction: BtnAdditionalFunction,
	search: Search,
	prevArrow: PrevArrow,
	nextArrow: NextArrow,
	figma: Figma,
	profile: Profile,
	telegram: TelegramWhite,
	telegramPurple: TelegramPurple,
	youtubeWhite: YoutubeWhite,
	youtubePurple: YoutubePurple,
	tikTok: TikTok,
	github: Github,
	minus: Minus,
	plus: Plus,
	like: Like,
	dislike: Dislike,
	error: Error,
};

type IconName = keyof typeof ICONS;

interface InterIcon {
	name: IconName | null;
	className?: string;
}

const Icon = ({ name, className = '' }: InterIcon): ReactElement | null => {
	if (!name) {
		return null;
	}

	const SvgIcon = ICONS[name];
	if (!SvgIcon) {
		console.warn(`Icon "${name}" not found`);
		return null;
	}

	return <img src={ICONS[name]} className={className} alt='' />;
};

export default Icon;
