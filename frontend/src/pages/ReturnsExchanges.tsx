import StaticPageLayout from '../components/StaticPageLayout';

const ReturnsExchanges = () => {
  return (
    <StaticPageLayout title="Returns & Exchanges">
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">Our Commitment</h2>
          <p className="text-text-light leading-relaxed">
            At AVELLIN, we take immense pride in the quality and craftsmanship of our products. 
            If your purchase does not meet your expectations, we are here to assist with a seamless return or exchange process.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">Return Policy</h2>
          <ul className="list-disc pl-5 space-y-2 text-text-light">
            <li>Items must be returned within <strong>7 days</strong> of delivery.</li>
            <li>Products must be in their original, unused condition with all tags and packaging intact.</li>
            <li>For skincare products, the seal must be unbroken for health and hygiene reasons.</li>
            <li>Custom-made or personalized items (e.g., tailored Agbada) are non-returnable.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">Exchange Process</h2>
          <p className="text-text-light leading-relaxed">
            If you need a different size or color, please contact our support team at 
            <a href="mailto:shopwithavellinsupport@gmail.com" className="text-secondary font-bold mx-1 hover:underline">
              shopwithavellinsupport@gmail.com
            </a> 
            to initiate an exchange. We will reserve the replacement item for you and guide you through the return of the original piece.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">Refunds</h2>
          <p className="text-text-light leading-relaxed">
            Once your return is received and inspected, we will process your refund to the original payment method within 5-7 business days. 
            Please note that shipping costs are non-refundable.
          </p>
        </div>
      </section>
    </StaticPageLayout>
  );
};

export default ReturnsExchanges;
