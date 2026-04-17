import StaticPageLayout from '../components/StaticPageLayout';

const Shipping = () => {
  return (
    <StaticPageLayout title="Shipping Information">
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">Domestic Delivery (Nigeria)</h2>
          <p className="text-text-light leading-relaxed">
            We provide premium door-to-door delivery services across all major cities in Nigeria. 
            Our logistics partners ensure that your luxury items are handled with the utmost care.
          </p>
          <div className="bg-accent/30 p-6 border-l-4 border-secondary">
            <p className="text-sm font-bold text-primary">FREE DELIVERY on all orders above ₦50,000.</p>
            <p className="text-xs text-text-light mt-1">Standard flat rate of ₦2,500 applies to orders below this amount.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">Delivery Timelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border border-accent">
              <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">Lagos State</h3>
              <p className="text-sm text-text-light">1 – 2 Business Days</p>
            </div>
            <div className="p-5 border border-accent">
              <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">Other States</h3>
              <p className="text-sm text-text-light">3 – 5 Business Days</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">International Shipping</h2>
          <p className="text-text-light leading-relaxed">
            AVELLIN ships globally via DHL Express. International shipping rates are calculated at checkout based on the destination and parcel weight. 
            Delivery typically takes 5–10 business days.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-heading text-primary font-bold">Order Tracking</h2>
          <p className="text-text-light leading-relaxed">
            Once your order has been dispatched, you will receive a confirmation email with a tracking number. 
            You can also track your status directly on our <a href="/track-order" className="text-secondary font-bold hover:underline">Track Order</a> page.
          </p>
        </div>
      </section>
    </StaticPageLayout>
  );
};

export default Shipping;
