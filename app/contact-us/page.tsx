import { Metadata } from "next";
import Contact from "@/components/contact-us/page";

export const metadata: Metadata = {
  title: "Connect With Us for any query",
  description:
    "We value your thoughts and inquiries. Reach out to Photo Grid's dedicated team through our Contact Us page. ",
};

const ContactPage = () => {
  return <Contact />;
};
export default ContactPage;
