import Link from "next/link";
import Image from "next/image";
import { WrapperCall } from "./utils";

const services = [
  {
    id: 1,
    title: "Deep Personalization System",
    description:
      "Go beyond email with our advanced personalization system that integrates LinkedIn and Twitter for multi-channel outreach. Perfect for hyper-targeted campaigns.",
    image: "/services/one/flow.png",
    link: "",
    cost: "$200",
    fit: "cover",
    techStack: ["n8n", "Apollo", "Aptify", "LinkedIn API", "Twitter API"],
  },
  {
    id: 2,
    title: "Search Intent Lead Scraper",
    description:
      "Automatically scrape high-intent leads from job postings and other sources. Ideal for outsourcing agencies and recruiters looking to streamline their lead generation process.",
    image: "/services/two/2.png",
    cost: "$300",
    fit: "contain",
    techStack: ["Python", "BeautifulSoup", "Selenium", "Google Sheets API"],
  },
  {
    id: 3,
    title: "YouTube Parasite + Content Improvement System",
    description:
      "Leverage YouTube's authority to boost your content's visibility. Our system improves content quality and ensures it ranks higher on search engines.",
    image: "/services/three/1.png",
    cost: "$500",
    fit: "scale-down",
    techStack: ["YouTube API", "n8n", "GPT-4", "SEO Tools"],
  },
  {
    id: 4,
    title: "Automated Newsletter Production",
    description:
      "Create engaging, high-quality newsletters effortlessly. Our automated system saves time while delivering personalized content to your audience.",
    image: "/services/four/flow.png",
    cost: "$500",
    fit: "scale-down",
    techStack: ["n8n", "Mailchimp", "GPT-4", "Custom Templates"],
  },
  {
    id: 5,
    title: "Automated YouTube Shorts Generator",
    description:
      "(Ads, Personal Brand) Transform your content strategy with our Automated YouTube Shorts Generator. Effortlessly create high-quality, engaging YouTube Shorts that captivate your audience and boost your channel's growth. Save time, streamline production, and stay ahead of the competition with our cutting-edge automation tools.",
    video: "/services/five.webm",
    cost: "$500",
    techStack: ["FFmpeg", "Python", "n8n", "YouTube API", "AI Video Editing"],
  },
];

export const ServicesSection = () => {
  return (
    <section className="bg-gray-50 py-16" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              {/* Media Section (Image or Video) */}
              <div className="w-full h-48 relative">
                {service.video ? (
                  // Video for the 5th service
                  <video
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-scale-down rounded-t-lg bg-gray-200"
                  />
                ) : (
                  // Image for other services
                  <Image
                    src={service.image ?? ""}
                    alt={service.title}
                    fill
                    // @ts-expect-error object not matching
                    style={{ objectFit: service.fit }}
                    className="rounded-t-lg bg-gray-200"
                  />
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Group price, tech stack, and bottom section together */}
                <div className="mt-auto">
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#E90074]/10 text-[#E90074] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 font-semibold mb-4">
                    Cost: <span className="text-[#E90074]">{service.cost}</span>
                  </p>
                  <div className="flex justify-between items-center">
                    {/* Conditionally render the "Read More" link */}
                    {service.link ? (
                      <Link
                        href={service.link}
                        className="text-[#E90074] font-semibold hover:underline"
                      >
                        Read More →
                      </Link>
                    ) : (
                      <span className="text-gray-400 font-semibold">Read More →</span>
                    )}
                    <WrapperCall>
                      <div className="bg-[#E90074] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#ff1a8c] transition-colors">
                        Book a Call
                      </div>
                    </WrapperCall>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
