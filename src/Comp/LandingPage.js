import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, ShoppingBag,MapPinCheck } from 'lucide-react';
import './LandingPage.css';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <Icon size={32} className="feature-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Places Around You</h1>
          <p>Find the best locations, amenities, and places of interest in your area</p>
          <div className="hero-buttons">
            <Link to="/geoapify" className="secondary-button">Get Started</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <FeatureCard
            icon={MapPin}
            title="Location Search"
            description="Find any place with our powerful search functionality"
          />
          <FeatureCard
            icon={Building}
            title="Shopping Malls"
            description="Discover the best shopping destinations near you"
          />
          <FeatureCard
            icon={ShoppingBag}
            title="Supermarkets"
            description="Locate nearby supermarkets and grocery stores"
          />
          <FeatureCard
            icon={ShoppingBag}
            title="Amenities"
            description="Find parks, restaurants, and other local amenities"
          />
        </div>
          <FeatureCard
            icon={MapPinCheck}
            title="Get Direction"
            description="automatic direction from current location"
          />
      </section>
    </div>
  );
};

export default LandingPage;