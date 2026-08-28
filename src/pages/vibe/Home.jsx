import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { products } from '../../data/products';
import bannerImg from '../../assets/images/Banner.png';
import SectionHeading from '../../components/vibe/ui/SectionHeading';
import ProductGrid from '../../components/vibe/product/ProductGrid';
import Button from '../../components/vibe/ui/Button';

const HERO_IMAGE = bannerImg;

const categoryCards = [
  {
    name: 'SHOES',
    to: '/category/shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80',
  },
  {
    name: 'SHIRTS',
    to: '/category/shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=80',
  },
  {
    name: 'PANTS',
    to: '/category/pants',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1000&q=80',
  },
];

const EDIT_IMAGE =
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80';

const PROMO_IMAGE =
  'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80';

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-ink overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="VIBE new season collection"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <SectionHeading eyebrow="Collections" title="Shop by Category" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {categoryCards.map((cat, i) => (
            <Link
              to={cat.to}
              key={cat.name}
              className="group relative block overflow-hidden rounded-2xl aspect-[4/5] vibe-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="text-white text-2xl font-black uppercase tracking-wide">
                  {cat.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wider text-white border border-white/70 rounded-full px-4 py-2 group-hover:bg-white group-hover:text-ink transition-colors">
                  Shop Now <ChevronRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 lg:pb-24">
        <SectionHeading
          eyebrow="Fresh drops"
          title="New Arrivals"
          subtitle="Fresh styles. New energy."
          linkText="View All"
          linkTo="/shop?sort=newest"
        />
        <ProductGrid items={newArrivals} />
      </section>

      {/* THE VIBE EDIT */}
      <section className="bg-mist">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[620px] overflow-hidden">
            <img src={EDIT_IMAGE} alt="The VIBE edit" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex items-center lg:pl-16 px-6 py-16 lg:py-0 lg:pr-10">
            <div className="max-w-md">
              <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-ink mb-3">
                The VIBE Edit
              </p>
              <h2 className="text-4xl lg:text-6xl font-black uppercase leading-[0.95] tracking-tight text-ink">
                Style That Moves With You
              </h2>
              <p className="mt-5 text-muted text-base leading-relaxed">
                Curated pieces engineered for comfort and built for confidence. This season's edit is designed for real life.
              </p>
              <Link to="/shop" className="inline-block mt-8">
                <Button variant="primary" size="lg">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <SectionHeading eyebrow="Most wanted" title="Best Sellers" linkText="View All" linkTo="/shop" />
        <ProductGrid items={bestSellers} />
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="relative max-w-[1440px] mx-auto overflow-hidden rounded-3xl min-h-[420px] lg:min-h-[540px] flex items-center justify-center text-center">
          <img src={PROMO_IMAGE} alt="End of season sale" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative px-6">
            <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              End of Season
            </h2>
            <p className="mt-4 text-xl lg:text-2xl font-bold text-volt uppercase tracking-wide">
              Up to 50% Off
            </p>
            <Link to="/shop?sale=true" className="inline-block mt-8">
              <Button variant="accent" size="lg">
                Shop Sale <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section className="bg-ink text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 text-center">
        <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight">Stay in the Vibe</h2>
        <p className="mt-4 text-white/70 max-w-md mx-auto">
          Get updates about new collections, exclusive drops and special offers.
        </p>
        {done ? (
          <p className="mt-8 text-volt font-semibold">Thanks for subscribing!</p>
        ) : (
          <form
            onSubmit={submit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-volt text-ink text-[13px] font-bold uppercase tracking-wider px-7 py-3.5 rounded-full hover:bg-volt-dark transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
