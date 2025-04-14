import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../TitleHeader";
import ContactExperience from "@/hooks/ContactExperience";

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID!,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: form.name,
                    to_name: "Aayush Joshi",
                    from_email: form.email,
                    to_email: "aayush@example.com",
                    message: form.message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY!
            )
            .then(
                () => {
                    setLoading(false);
                    alert("Thank you. I will get back to you as soon as possible.");
                    setForm({ name: "", email: "", message: "" });
                },
                (error) => {
                    setLoading(false);
                    console.error(error);
                    alert("Something went wrong. Please try again.");
                }
            );
    };

    return (
        <section id="contact" className="min-h-screen w-full px-4 md:px-10 py-20 flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full">
                <div className="mb-28 text-center">
                    <TitleHeader
                        title="Get in Touch – Let's Connect"
                        sub=""
                        className={""} />
                </div>

                <div className="flex flex-col xl:flex-row gap-12 items-center justify-center">
                    <div className="bg-[#0d0d0d] rounded-2xl p-10 w-full xl:w-1/2 shadow-lg">
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col gap-6"
                        >
                            <div>
                                <label htmlFor="name" className="text-white block mb-2 text-sm">Your name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="What's your good name?"
                                    className="w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 border border-[#1a1a1a] focus:border-[#2a2a2a] outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="text-white block mb-2 text-sm">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="What's your email address?"
                                    className="w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 border border-[#1a1a1a] focus:border-[#2a2a2a] outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="text-white block mb-2 text-sm">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="How can I help you?"
                                    rows={5}
                                    className="w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 border border-[#1a1a1a] focus:border-[#2a2a2a] outline-none resize-none transition"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#d3e3f1] hover:bg-[#c0d7ec] text-black font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
                            >
                                {loading ? "Sending..." : "SEND MESSAGE"}
                            </button>
                        </form>
                    </div>


                    <div className="bg-[#cd7c2e] w-full xl:w-1/2 h-[450px] cursor-pointer rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
                        <ContactExperience />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
