import { useEffect, useState } from 'react';
import ProductLayout from '../../Layouts/ProductLayout.js';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useDispatch } from 'react-redux';
import { SetShippingInfo } from '../../redux/slices/orderSlice.js';
import { useNavigate } from 'react-router-dom';
export default function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneno] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    GetCountries().then(result => {
      setCountriesList(result);
    });
  }, []);

  useEffect(() => {
    if (countryid !== 0) {
      GetState(countryid).then(result => {
        setStateList(result);
        setStateid(0); // Reset state selection when country changes
        setCityList([]); // Reset city list when country changes
      });
    }
  }, [countryid]);

  useEffect(() => {
    if (stateid !== 0) {
      GetCity(countryid, stateid).then(result => {
        setCityList(result);
      });
    }
  }, [stateid, countryid]);

  function onSubmit(e) {
    e.preventDefault();
    const shipping = {
      address,
      phoneNo,
      zipCode,
      country,
      city,
      state,
    };
    dispatch(SetShippingInfo(shipping));
    navigate('/payment_method');
  }

  return (
    <ProductLayout>
      <div className="container checkout-container">
        <div className="row">
          <div className="col-md-10 order-md-1 mx-auto my-2">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNo">Phone No</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  placeholder="134677564"
                  required
                  value={phoneNo}
                  onChange={e => setPhoneno(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please enter your phone number.
                </div>
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select
                    onChange={e => {
                      const selectedCountryId = parseInt(e.target.value);
                      const selectedCountry = countriesList.find(
                        item => item.id === selectedCountryId
                      );
                      setCountryid(selectedCountryId);
                      setCountry(selectedCountry ? selectedCountry.name : '');
                    }}
                    value={countryid}
                    className="form-control"
                    required
                  >
                    <option value={0}>Choose...</option>
                    {countriesList.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    onChange={e => {
                      const selectedStateId = parseInt(e.target.value);
                      const selectedState = stateList.find(
                        item => item.id === selectedStateId
                      );
                      setStateid(selectedStateId);
                      setState(selectedState ? selectedState.name : '');
                    }}
                    value={stateid}
                    className="form-control"
                    required
                  >
                    <option value={0}>Choose...</option>
                    {stateList.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="city">City</label>
                  <select
                    onChange={e => {
                      const selectedCityId = parseInt(e.target.value);
                      const selectedCity = cityList.find(
                        item => item.id === selectedCityId
                      );
                      setCityid(selectedCityId);
                      setCity(selectedCity ? selectedCity.name : '');
                    }}
                    value={cityid}
                    className="form-control"
                    required
                  >
                    <option value={0}>Choose...</option>
                    {cityList.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid city.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="same-address"
                />
                <label className="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="save-info"
                />
                <label className="custom-control-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              <hr className="mb-4" />

              <button className="checkout-btn" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}
