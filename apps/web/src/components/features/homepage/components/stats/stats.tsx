import { stats } from "../../homepage.mock"

export const Stats = () => {
    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="text-3xl font-semibold text-gray-900 mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
