import 'primeicons/primeicons.css';

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Card } from 'primereact/card';
// import { Tag } from 'primereact/tag';
import { Chip } from 'primereact/chip'; // Import Chip component
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { AutoComplete } from 'primereact/autocomplete'; // Import AutoComplete
import './Byname.css';
import { ScrollTop } from 'primereact/scrolltop';
import accomodation from '../ass/accomodation.jpg';
import supermarket from '../ass/supermarket.jpg'
// import { useAuth } from '../AuthContext';
const GeoapifyAutocomplete = () => {
    const navigate = useNavigate();
    // const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placeDetails, setPlaceDetails] = useState([]);
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPlaceName, setCurrentPlaceName] = useState('');
    const [currentPlaceId, setCurrentPlaceId] = useState('');
    const [defaultCategoryDetails, setDefaultCategoryDetails] = useState([]);
    const apiKey = '0cc2a82797bd414980449587534fb550';
    useEffect(() => {
        // Check localStorage for Geoapify data
        const userr = localStorage.getItem('user');

        if (userr) {
            // Redirect if data exists
            navigate('/geoapify');
        }
    }, [navigate]);
    const availableCategories = [
        { name: 'Supermarket', value: 'commercial.supermarket', img: "https://media.istockphoto.com/id/1412353022/photo/empty-aisle-at-a-supermarket.jpg?s=612x612&w=0&k=20&c=lua6Ayl1iyoOndHTXEWoolyh1xV9HTROcl6we_o-HRc=" },
        { name: 'Shopping Mall', value: 'commercial.shopping_mall', img: "https://media.istockphoto.com/id/1126107720/photo/harbour-city-mall-hong-kong.jpg?s=612x612&w=0&k=20&c=1YMePY2Xp01J9qOPA6-OTb0iXFsSaam4Bcj4FH1Vpd0=" },
        { name: 'Jewelry', value: 'commercial.jewelry', img: "https://media.istockphoto.com/id/1406447764/photo/jewellery.jpg?s=612x612&w=0&k=20&c=39-AmuE-fhcXY0cFz71kRdYAqSC2JnI9S5jJgXLgsh8=" },
        { name: 'Food and Drink', value: 'commercial.food_and_drink', img: "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98=" },
        { name: 'Chemist', value: 'commercial.chemist', img: "https://media.istockphoto.com/id/1135284188/photo/if-you-need-its-here.jpg?s=612x612&w=0&k=20&c=2yfZHUqTEGW4-5r4Sc4pzWKx0DtubpdbTkX3h_w1AJg=" },
        { name: 'Houseware and Hardware', value: 'commercial.houseware_and_hardware', img: 'https://media.istockphoto.com/id/1394287688/photo/carpenter-shopping-in-hardware-store.jpg?s=612x612&w=0&k=20&c=2REACyiwXzjiTOe3J_rg4Ek6DHhq6f-bLvMnWkvHfeA=' },
        { name: 'Clothing', value: 'commercial.clothing', img: "https://media.istockphoto.com/id/955641488/photo/clothes-shop-costume-dress-fashion-store-style-concept.jpg?s=612x612&w=0&k=20&c=ZouECh5-XOCuBzvKBQfxgyw0RIGEUg9u5F0sJiZV86s=" },
        { name: 'Stationery', value: 'commercial.stationery', img: "https://media.istockphoto.com/id/182060333/photo/large-assortment-of-office-supplies-on-white-backdrop.jpg?s=612x612&w=0&k=20&c=mNBMBo14dmm5T6mecnhrsp0Drq0U7SKtTSkLhGqFdXc=" },
        { name: 'Vehicle', value: 'commercial.vehicle', img: "https://media.istockphoto.com/id/1473399467/photo/salesman-showing-cars-to-a-couple-at-the-dealership.jpg?s=612x612&w=0&k=20&c=04vHWLF4DhOp5uCZbMqzRnVZqoBIPn_Yy8ebOlZv4JA=" },
        { name: 'Electronics', value: 'commercial.elektronics', img: "https://media.istockphoto.com/id/1332363476/photo/salesman-assists-to-a-couple-that-wants-to-choose-the-best-tv.jpg?s=612x612&w=0&k=20&c=MR8V0mDdeSN9Uvbo_lrFHLT7WjABCck3KF9JljXkN8U=" },
        { name: 'Airport', value: 'airport', img: "https://media.istockphoto.com/id/1254973568/photo/empty-airport-terminal-lounge-with-airplane-on-background.jpg?s=612x612&w=0&k=20&c=WoX_hcz_igZ1NNRlwwR9Cc_EjjL4Ncf_hoTMDatg2AU=" },
        { name: 'Accommodation', value: 'accommodation', img: "https://media.istockphoto.com/id/146765403/photo/a-luxurious-florida-beach-hotel-during-sunrise.jpg?s=612x612&w=0&k=20&c=pxw9Q78KbvqV6_pS_C-v_m6S_WQjKWLBSdqgRtqMUUg=" },
    ];

    const search = async (event) => {
        const searchText = event.query;

        if (searchText.length > 2) {
            try {
                const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&format=json&apiKey=${apiKey}`);
                setSuggestions(response.data.results);
            } catch (error) {
                console.error('Error fetching autocomplete data:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const toggleCategory = (category) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category);
            }
            return [...prev, category];
        });
    };

    const fetchPlaceDetails = async (placeId) => {
        try {
            const categoriesParam = selectedCategories.join(',');
            const response = await fetch(`https://api.geoapify.com/v2/places?categories=${categoriesParam}&filter=place:${placeId}&limit=20&apiKey=${apiKey}`);
            const data = await response.json();
            setPlaceDetails(data.features);
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        function toRad(x) {
            return (x * Math.PI) / 180;
        }
        // console.log(lat1,lat2);
        const R = 6371; // Earth's radius in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const handleSelectSuggestion = (suggestion) => {
        setSelectedPlace(suggestion);
        console.log("selectedPlace", suggestion);
        if (selectedCategories.length > 1) {
            fetchPlaceDetails(suggestion.place_id);
            setSuggestions([]);
        }
    };

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLat(position.coords.latitude);
                        setLon(position.coords.longitude);
                        console.log(position.coords.latitude, lon);
                        getCurrentPlaceName(position.coords.latitude, position.coords.longitude); // Fetch place name based on current location
                    },
                    (error) => {
                        console.error('Unable to retrieve location', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);
    // Function to fetch place name using reverse geocoding
    const getCurrentPlaceName = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
            );
            const place = response.data.features[0];
            // const placeId=response.data.features[0]?.properties?.place_id;
            setCurrentPlaceName(place?.properties?.city || 'Unknown Location');
            setCurrentPlaceId(place?.properties?.place_id || 'Unknown Location');
            console.log("response", place?.properties?.place_id, place?.properties?.city);
        } catch (error) {
            console.error('Error fetching current place name:', error);
        }
    };
    const isSearchButtonEnabled = selectedPlace && selectedCategories.length > 0;
    const fetchCategoryDetails = async (category) => {
        try {

            const response = await axios.get(
                `https://api.geoapify.com/v2/places?categories=${category}&filter=place:${currentPlaceId}&limit=20&apiKey=${apiKey}`
            );
            // setDefaultCategoryDetails(response.data.features);
            setPlaceDetails(response.data.features);
            console.log("response.data.features", response.data.features);
            // console.log(`https://api.geoapify.com/v2/places?categories=${category}&filter=place:${currentPlaceId}&limit=20&apiKey=${apiKey}`);
        } catch (error) {

            console.error('Error fetching category details:', error);
        }
    };

    const handleCategoryCardClick = (category) => {
        setSelectedCategories([category]);
        fetchCategoryDetails(category);
    };
    const [visibleCards, setVisibleCards] = useState({}); // State to track visibility of each card

    const toggleAddress = (index) => {
        setVisibleCards((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Toggle visibility for the specific card
        }));
    };
    return (
        <>
            {/* {user ? ( */}
            <div>
                <div className='serachcontainer'>
                    <AutoComplete
                        field="formatted"
                        value={searchTerm}
                        suggestions={suggestions}
                        completeMethod={search}
                        onChange={(e) => { setSearchTerm(e.value); }}
                        // dropdown
                        placeholder="Search location"
                        onSelect={(e) => { handleSelectSuggestion(e.value) }}
                    />
                    <Button
                        onClick={() => fetchPlaceDetails(selectedPlace.place_id)}
                        disabled={!isSearchButtonEnabled}
                        className='but'
                    >
                        Search
                    </Button>
                    {/* <Button
                            onClick={logout} // Call logout on button click
                            className='but' // You can apply your styles
                            style={{ marginLeft: '10px' }} // Optional spacing
                        >
                            Logout
                        </Button> */}
                    <p style={{ marginLeft: "10px", padding: "2px 2px" }}><i className="hugeicons--location-05" style={{ fontSize: '1rem' }}></i>{currentPlaceName}</p>
                </div>

                <h2 style={{ color: "var(--blue-900)" }}>Select Categories</h2>
                <hr />
                <div>
                    {availableCategories.map((category, index) => (
                        <Chip
                            key={index}
                            label={category.name}
                            // removable={selectedCategories.includes(category.value)}
                            // onRemove={() => toggleCategory(category.value)} // Remove category on click
                            onClick={() => toggleCategory(category.value)} // Add category on click
                            className={`category-chip ${selectedCategories.includes(category.value) ? 'selected' : ''}`}
                        />
                    ))}
                </div>
                <hr />

                {/* Display selected categories as Chips */}
                <div style={{ margin: '10px 0' }}>
                    {selectedCategories.map((category, index) => (
                        <Chip
                            key={index}
                            label={category}
                            removable
                            onRemove={() => toggleCategory(category)} // Remove selected category
                        />
                    ))}
                </div>

                {/* Search Button */}

                {selectedCategories.length === 0 && (
                    <>
                        <h2 className='heading-box'>Explore Places in our <span style={{ color: "black" }}>{currentPlaceName}</span></h2>
                        <div className="category-container">
                            {availableCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className="category-card"
                                    onClick={() => handleCategoryCardClick(category.value)}
                                >
                                    <img
                                        src={category.img}
                                        alt={category.name}
                                        className="category-image"
                                    />
                                    <div className="category-name">{category.name}</div>
                                </div>
                            ))}
                        </div>

                    </>
                )}

                {/* Render selected place details */}
                <div className='container'>
                    {placeDetails.length > 0 && (
                        <div className='cards-grid'>
                            {placeDetails.map((feature, index) => {
                                const placeLat = feature.geometry.coordinates[1];
                                const placeLon = feature.geometry.coordinates[0];
                                const distance = lat && lon ? haversineDistance(lat, lon, placeLat, placeLon).toFixed(2) : 'N/A';
                                const matchedCategory = availableCategories.find(cat =>
                                    feature.properties.categories?.includes(cat.value)
                                );

                                return (
                                    <div key={index} className="card" >
                                        <img src={matchedCategory?.img} alt="Place" className="card-image"></img>
                                        <div className='card-content'>
                                            <h3 className='card-title'>{feature.properties.name || 'N/A'}</h3>
                                            <span className="card-tag">{feature.properties.commercial?.type || feature.properties.datasource.raw?.tourism}</span>
                                            
                                            <button
                                                className="more-btn"
                                                onClick={() => toggleAddress(index)} // Toggle for the specific card
                                            >
                                                {visibleCards[index] ? 'Less Info' : 'More Info'}
                                            </button>
                                            {visibleCards[index] && (
                                                <p
                                                    className={`card-address ${visibleCards[index] ? 'show' : ''}`}
                                                >
                                                    Address: {feature.properties.formatted || 'N/A'}
                                                </p>

                                            )}
                                            <div className="card-footer">
                                                <span className="distance">{distance !== 'N/A' ? `${distance} km` : 'Unable to calculate distance'} away</span>
                                                <a href={`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${placeLat},${placeLon}`} target="_blank" className="directions-btn">
                                                    <i className="lets-icons--map-light"></i>
                                                    Get Directions
                                                </a>
                                            </div>


                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}


                </div>

                <ScrollTop />
            </div>
            {/* ) : (
                <h1>You must be logged in to view this page.</h1>
            )} */}
        </>
    );
};

export default GeoapifyAutocomplete;



{/* <div className='distance'>
<p style={{ color: "var(--blue-900)" }}>{currentPlaceName}</p>
<div>
    <p style={{ textAlign: "center" }}>{distance !== 'N/A' ? `${distance} km` : 'Unable to calculate distance'}</p>
    <Slider value={[0, 100]} range style={{ width: "200px", marginLeft: "10px", marginRight: "10px" }} />
</div>
<p style={{ color: "var(--blue-900)" }}>{selectedPlace?.city || selectedPlace?.county}</p>
<Link className='direction' to={`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${placeLat},${placeLon}`} target="_blank"><i className="lets-icons--map-light"></i>Get Directions</Link>
</div> */}