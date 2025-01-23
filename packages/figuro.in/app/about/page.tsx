import Head from "next/head";

export default function About() {
    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <title>About Figuro Agency - Workflow Automation Experts</title>
                <meta
                    name="description"
                    content="Learn more about Figuro Agency, your trusted partner in workflow automation. We specialize in custom n8n workflows, AI-powered automation, and seamless integrations."
                />
                <meta
                    name="keywords"
                    content="Figuro Agency, workflow automation, n8n automation, AI-powered automation, custom workflows, automation experts"
                />
                <meta name="author" content="Figuro Agency" />
                <meta property="og:title" content="About Figuro Agency - Workflow Automation Experts" />
                <meta
                    property="og:description"
                    content="Learn more about Figuro Agency, your trusted partner in workflow automation. We specialize in custom n8n workflows, AI-powered automation, and seamless integrations."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.figuro.in/about" />
                <meta property="og:image" content="https://www.figuro.in/og-image.jpg" />
                <link rel="canonical" href="https://www.figuro.in/about" />
            </Head>

            {/* About Page Content */}
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        About Figuro Agency
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        At <span className="text-[#E90074] font-semibold">Figuro Agency</span>, we are passionate about helping businesses and individuals streamline their workflows through cutting-edge automation solutions. Our mission is to simplify complex processes, boost productivity, and empower you to focus on what truly matters.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        Specializing in <span className="text-[#E90074] font-semibold">custom n8n workflows</span>, we bring expertise in AI-powered automation, seamless integrations, and scalable solutions tailored to your unique needs. Whether you{"'"}re an individual or a growing agency, we’ve got you covered.
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                        Why Choose Figuro?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-[#E90074] mb-4">Expertise in n8n</h3>
                            <p className="text-gray-700">
                                Our team has extensive experience in building custom workflows using n8n, ensuring your processes are efficient and scalable.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-[#E90074] mb-4">AI-Powered Automation</h3>
                            <p className="text-gray-700">
                                Leverage the power of AI to automate repetitive tasks, reduce errors, and improve accuracy across your workflows.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-[#E90074] mb-4">Seamless Integrations</h3>
                            <p className="text-gray-700">
                                We integrate with hundreds of apps and services, ensuring your workflows are connected and efficient.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-[#E90074] mb-4">Dedicated Support</h3>
                            <p className="text-gray-700">
                                Our team provides ongoing support and training to ensure your workflows run smoothly and adapt to your growing needs.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <p className="text-lg text-gray-700">
                            Ready to transform your workflows?{" "}
                            <a
                                href="/contact"
                                className="text-[#E90074] font-semibold hover:underline"
                            >
                                Get in touch with us today!
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
