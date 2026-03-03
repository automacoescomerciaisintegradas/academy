
import HeroSequencer from '@/components/HeroSequencer';

export const metadata = {
    title: 'Hero Parallax Demo - Cleudocode',
    description: 'Demonstração da tecnologia de Scroll Scrubbing com Parallax',
};

export default function HeroDemoPage() {
    return (
        <main className="bg-black min-h-screen">
            <HeroSequencer />
        </main>
    );
}
