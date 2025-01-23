import { Star } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Agniva",
            role: "CEO, Cashcowlabs",
            comment:
                "Figuro transformed our workflow automation process. Their expertise in n8n is unmatched, and they delivered exactly what we needed. Highly recommended!",
            rating: 5,
        },
        {
            name: "Jane Smith",
            role: "Founder, Creative Agency",
            comment:
                "Working with Figuro was a game-changer for our agency. They streamlined our processes and saved us countless hours. The team is professional and highly skilled.",
            rating: 4,
        },
    ];

    return (
        <div className="w-full bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    What Our Clients Say
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="flex items-center mb-4">
                                {/* Star Rating */}
                                <div className="flex space-x-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 text-[#E90074]"
                                            fill="#E90074"
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-lg text-gray-700 mb-6">
                                {testimonial.comment}
                            </p>
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                    <p className="text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
