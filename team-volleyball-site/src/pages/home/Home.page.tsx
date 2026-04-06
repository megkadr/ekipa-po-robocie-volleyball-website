import { HeroSection } from './components/HeroSection';
import { PlayersCarousel } from './components/PlayersCarousel';
import { AchievementsPreview } from './components/AchievementsPreview';

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<PlayersCarousel />
			<AchievementsPreview />
		</>
	);
}