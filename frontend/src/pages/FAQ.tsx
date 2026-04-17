import StaticPageLayout from '../components/StaticPageLayout';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I determine my size for traditional wear?",
      a: "We provide a detailed size guide on every product page. For traditional pieces like Agbada, we recommend choosing your standard blazer size. If you require custom tailoring, please contact our support team after placing your order."
    },
    {
      q: "Are your skincare products suitable for sensitive skin?",
      a: "Yes, our clinical skincare range is formulated to be gentle yet effective. However, we always recommend performing a patch test before full application. Check the product descriptions for specific ingredient details."
    },
    {
      q: "Do you offer same-day delivery in Lagos?",
      a: "Yes, for orders placed before 10 AM WAT within Lagos, we offer express same-day delivery for an additional fee. Contact us via WhatsApp to arrange this."
    },
    {
      q: "How can I track my order?",
      a: "You can track your order using the 'Track Order' link in the footer or by visiting /track-order and entering your Order ID and email address."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards, bank transfers, and USSD via Paystack. We also offer 'Buy Now, Pay Later' options for eligible customers."
    }
  ];

  return (
    <StaticPageLayout title="Frequently Asked Questions">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-accent">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-bg-light transition-colors"
            >
              <span className="font-heading text-lg text-primary font-bold">{faq.q}</span>
              {openIndex === index ? <Minus className="w-4 h-4 text-secondary" /> : <Plus className="w-4 h-4 text-secondary" />}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-text-light text-sm leading-relaxed animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </StaticPageLayout>
  );
};

export default FAQ;
