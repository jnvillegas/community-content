export default function VideoCard({ activity }: { activity: any }) {
    const { subject } = activity;
    if (!subject) return null;

    return (
        <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5">
            <div className="relative aspect-video overflow-hidden rounded-xl">
                {subject.youtube_id ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${subject.youtube_id}`}
                        title={subject.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#0f0f0f]" />
                )}
            </div>
        </article>
    );
}
