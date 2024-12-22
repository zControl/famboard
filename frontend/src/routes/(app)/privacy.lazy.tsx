import { HeaderContainer } from '@/components/common/HeaderContainer'
import { PageContainer } from '@/components/common/PageContainer'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(app)/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <>
      <HeaderContainer
        logo={<div>Logo</div>}
        mobileMenu={<div>Shortcuts</div>}
        navigation={
          <ul className="flex flex-row space-x-4">
            <li>
              <a href="#overview">Overview</a>
            </li>
            <li>
              <a href="#personal-information">Personal Information</a>
            </li>
            <li>
              <a href="#protections">Protections</a>
            </li>
            <li>
              <a href="#your-rights">Your Rights</a>
            </li>
            <li>
              <a href="#changes">Changes</a>
            </li>
          </ul>
        }
        actions={<div>Search</div>}
      />
      <PageContainer
        title="Privacy Page"
        description="Privacy Page"
        className="flex flex-col gap-4"
      >
        <section id="overview">
          <h1>Overview</h1>
          <p>
            This Privacy Policy explains how we collect, use, and protect the
            personal information of our website visitors.
          </p>
          <p>
            By using our website, you consent to the terms of this Privacy
            Policy. We are committed to protecting your privacy and ensuring
            that your visit to our website is a safe and enjoyable experience.
            We understand that you may have concerns about how we use the
            information we collect, and we want to assure you that we take your
            privacy seriously.
          </p>
          <p>
            This Privacy Policy applies to all pages and services on our
            website, and it is intended to inform you of our policies and
            procedures regarding the collection, use, and disclosure of your
            personal information.
          </p>
        </section>
        <section id="personal-information">
          <h1>Personal Information</h1>
          <p>
            We collect two types of information from our website visitors:
            personal information and non-personal information. Personal
            information is information that can be used to identify you, such as
            your name, email address, and phone number. Non-personal information
            is information that cannot be used to identify you, such as your IP
            address, browser type, and website usage patterns.
          </p>
          <p>
            We collect personal information from you when you provide it to us,
            such as when you fill out a contact form, sign up for a newsletter,
            or make a purchase on our website. We also collect non-personal
            information from you automatically, such as when you visit our
            website or click on a link. We use cookies and other tracking
            technologies to collect non-personal information about your website
            usage patterns. Cookies are small files that are stored on your
            computer's hard drive, and they allow us to recognize you when you
            return to our website.
          </p>
          <p>
            We use your personal information to provide you with the services
            and information you request, such as responding to your inquiries,
            sending you newsletters, and processing your purchases. We also use
            your personal information to improve our website and services, such
            as by analyzing website usage patterns and identifying areas for
            improvement. We use your non-personal information to analyze website
            usage patterns, identify trends, and improve our website and
            services.
          </p>
        </section>
        <section id="protections">
          <h1>Security and Protection</h1>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, use, and disclosure. We use
            industry-standard encryption technologies, such as SSL/TLS, to
            protect your personal information when it is transmitted over the
            internet. We also take reasonable measures to protect your
            non-personal information from unauthorized access, use, and
            disclosure. We use firewalls and other security technologies to
            protect our website and servers from unauthorized access. We cannot
            guarantee the security of your information, and we are not
            responsible for any unauthorized access, use, or disclosure of your
            information.
          </p>
        </section>
        <section id="your-rights">
          <h1>Your rights</h1>
          <p>
            You have the right to access and correct your personal information,
            and you can do so by contacting us using the contact information
            provided on our website. You also have the right to opt-out of
            receiving promotional messages from us, and you can do so by
            following the instructions provided in the message. You have the
            right to request that we delete your personal information, and you
            can do so by contacting us using the contact information provided on
            our website. We will delete your personal information within a
            reasonable time after receiving your request.
          </p>
        </section>
        <section id="changes">
          <h1>Changes to this policy</h1>
          <p>
            We reserve the right to modify this privacy policy at any time, and
            we will notify you of any changes by posting the new privacy policy
            on our website. If you have any questions or concerns about this
            privacy policy, please contact us using the contact information
            provided on our website.
          </p>
        </section>
        <section id="contact">
          <h1>Contact Information</h1>
          <ul>
            <li>[Company Name]</li>
            <li>[Address]</li>
            <li>[Phone Number]</li>
            <li>[Email Address]</li>
          </ul>
        </section>
      </PageContainer>
    </>
  )
}

export default PrivacyPage
