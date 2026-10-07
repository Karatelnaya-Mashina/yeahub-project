import Logo from '../assets/icons/logo.svg';
import LogoText from '../assets/icons/logoText.svg';
import ArrowDown from '../assets/icons/arrowDown.svg';
import OpenModal from '../assets/icons/openModal.svg';
import BtnAdditionalFunction from '../assets/icons/btnAdditionalFunction.svg';
import Search from '../assets/icons/search.svg';
import PrevArrow from '../assets/icons/arrowPrevBtn.svg';
import NextArrow from '../assets/icons/arrowNextBtn.svg';
import Figma from '../assets/icons/figma.svg';
import Figma3D from '../assets/icons/figma3D.svg';
import Profile from '../assets/icons/profile.svg';
import TelegramWhite from '../assets/icons/telegramWhite.svg';
import TelegramPurple from '../assets/icons/telegramPurple.svg';
import YoutubeWhite from '../assets/icons/youtubeWhite.svg';
import YoutubePurple from '../assets/icons/youtubePurple.svg';
import TikTok from '../assets/icons/tik-tok.svg';
import Github from '../assets/icons/githubWhite.svg';
import ContactsAva from '../assets/icons/contactsAva.svg';
import Minus from '../assets/icons/minus.svg';
import Plus from '../assets/icons/plus.svg';
import Like from '../assets/icons/like.svg';
import Dislike from '../assets/icons/dislike.svg';
import WomanImg from '../assets/icons/womanImg.svg';
import QuestionImage from '../assets/icons/questionImage.svg';

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
	figma3D: Figma3D,
	profile: Profile,
	telegram: TelegramWhite,
	telegramPurple: TelegramPurple,
	youtubeWhite: YoutubeWhite,
	youtubePurple: YoutubePurple,
	tikTok: TikTok,
	github: Github,
	contacts: ContactsAva,
	minus: Minus,
	plus: Plus,
	like: Like,
	dislike: Dislike,
	womanImg: WomanImg,
	questionImage: QuestionImage,
};

const Icon = ({ name, className = '' }) => {
	if (!name) return null;

	const SvgIcon = ICONS[name];
	if (!SvgIcon) {
		console.warn(`Icon "${name}" not found`);
		return null;
	}

	return <SvgIcon className={className} />;
};

export default Icon;
