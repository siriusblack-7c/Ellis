import React from 'react';

const countries = [
    { name: 'Nigeria', code: 'ng' },
    { name: 'Philippines', code: 'ph' },
    { name: 'Kenya', code: 'ke' },
    { name: 'Uganda', code: 'ug' },
    { name: 'Ghana', code: 'gh' },
    { name: 'Tanzania', code: 'tz' },
    { name: 'Rwanda', code: 'rw' },
    { name: 'Jamaica', code: 'jm' },
    { name: 'Guyana', code: 'gy' },
    { name: 'Ethiopia', code: 'et' },
    { name: 'Zambia', code: 'zm' },
    { name: 'Zimbabwe', code: 'zw' },
    { name: 'Dominican Republic', code: 'do' },
    { name: 'India', code: 'in' },
    { name: 'Pakistan', code: 'pk' },
    { name: 'Bangladesh', code: 'bd' },
    { name: 'Venezuela', code: 've' },
    { name: 'Colombia', code: 'co' },
    { name: 'Argentina', code: 'ar' },
    { name: 'Turkey', code: 'tr' },
    { name: 'Brazil', code: 'br' },
];

const FlagImage = ({ code, name }: { code: string, name: string }) => (
    <img
        className="w-12 h-8 rounded-md object-cover shadow-md"
        src={`https://flagcdn.com/${code}.svg`}
        alt={`Flag of ${name}`}
        width="48"
        height="32"
    />
);

export const SupportedCountries = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Our Global Reach
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Providing quality care services in countries across the world.
                    </p>
                </div>

                <div className="relative overflow-hidden group">
                    <div className="flex animate-scroll group-hover:pause">
                        {[...countries, ...countries].map((country, index) => (
                            <div key={`${country.code}-${index}`} className="flex-shrink-0 flex flex-col items-center space-y-3 text-center w-36">
                                <FlagImage code={country.code} name={country.name} />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{country.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}; 