import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ContactExperience from "@/hooks/ContactExperience";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiSend } from "react-icons/fi";

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        message: false
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    useEffect(() => {
        if (status !== "idle") {
            const timer = setTimeout(() => {
                setStatus("idle");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleBlur = (field: keyof typeof touched) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTouched = {
            name: true,
            email: true,
            message: true
        };
        setTouched(newTouched);

        if (!form.name || !form.message || !form.email || !validateEmail(form.email)) {
            return;
        }

        setLoading(true);

        emailjs
            .send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID!,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: form.name,
                    to_name: "Aayush Joshi",
                    from_email: form.email,
                    to_email: "aayushj2001@gmail.com",
                    message: form.message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY!
            )
            .then(
                () => {
                    setLoading(false);
                    setStatus("success");
                    setForm({ name: "", email: "", message: "" });
                    setTouched({ name: false, email: false, message: false });
                },
                (error) => {
                    setLoading(false);
                    setStatus("error");
                    console.error(error);
                }
            );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        tap: { scale: 0.95 },
        hover: { scale: 1.02 }
    };

    return (
        <section id="contact" className="min-h-screen w-full px-4 md:px-10 py-20 flex flex-col items-center justify-center">
            <div className="max-w-7xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-28 text-center"
                >
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col xl:flex-row gap-12 items-center justify-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-[#0d0d0d] rounded-2xl p-10 w-full xl:w-1/2 shadow-lg"
                    >
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col gap-6"
                        >
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="text-white block mb-2 text-sm">Your name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("name")}
                                    placeholder="What's your good name?"
                                    className={`w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 border ${touched.name && !form.name ? "border-red-500" : "border-[#1a1a1a] focus:border-[#2a2a2a]"
                                        } outline-none transition`}
                                />
                                {touched.name && !form.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        Please enter your name
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="text-white block mb-2 text-sm">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("email")}
                                    placeholder="What's your email address?"
                                    className={`w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 border ${touched.email && (!form.email || !validateEmail(form.email))
                                        ? "border-red-500"
                                        : "border-[#1a1a1a] focus:border-[#2a2a2a]"
                                        } outline-none transition`}
                                />
                                {touched.email && !form.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        Please enter your email
                                    </motion.p>
                                )}
                                {touched.email && form.email && !validateEmail(form.email) && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        Please enter a valid email address
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="message" className="text-white block mb-2 text-sm">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("message")}
                                    placeholder="How can I help you?"
                                    rows={5}
                                    className={`w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 border ${touched.message && !form.message ? "border-red-500" : "border-[#1a1a1a] focus:border-[#2a2a2a]"
                                        } outline-none resize-none transition`}
                                />
                                {touched.message && !form.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-xs mt-1"
                                    >
                                        Please enter your message
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative">
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="w-full bg-[#d3e3f1] hover:bg-[#c0d7ec] cursor-pointer h-10 text-black font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="text-lg" />
                                            SEND MESSAGE
                                        </>
                                    )}
                                </motion.button>

                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-green-500 text-sm"
                                        >
                                            <FiCheckCircle />
                                            Message sent successfully!
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-red-500 text-sm"
                                        >
                                            <FiAlertCircle />
                                            Something went wrong. Please try again.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </form>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-[#cd7c2e] w-full xl:w-1/2 h-[450px] cursor-pointer rounded-2xl overflow-hidden shadow-md flex items-center justify-center"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "keyframes", stiffness: 400, damping: 10 }}
                    >
                        <ContactExperience />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;