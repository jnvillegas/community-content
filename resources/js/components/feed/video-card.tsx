export default function VideoCard({ activity }: { activity: any }) {
    const { subject } = activity;
    if (!subject) return null;

    return (
        <article className="glass-card rounded-xl overflow-hidden group transition-all duration-500 hover:shadow-2xs hover:shadow-black/40 bg-background border border-gray-200 dark:border-white/5 w-[100%] mb-10">
            <div className="relative aspect-video">
                {subject.youtube_id ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${subject.youtube_id}`}
                        title={subject.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0f0f0f]" />
                )}
            </div>
        </article>
    );
}
