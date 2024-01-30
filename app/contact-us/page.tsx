import { Metadata } from 'next'
import Contact from '@/components/contact-us/page'

export const metadata: Metadata = {
  title: 'Contact us ',
  description:"ishd"
}

const  ContactPage = ()=>{
  return <Contact/>
}
export default ContactPage