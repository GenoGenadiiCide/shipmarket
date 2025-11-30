import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AddressAutocomplete } from '../components/AddressAutocomplete';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Form state
  const [category, setCategory] = useState('');
  const [pickupAddress, setPickupAddress] = useState<any>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [isEbay, setIsEbay] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [isAuthMode, setIsAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const isAuthenticated = false; // Mock auth state

  const handleNext = () => {
    setError('');
    
    if (step === 1) {
      if (!category || !pickupAddress || !deliveryAddress) {
        setError('Please fill in all required fields.');
        return;
      }
    } else if (step === 2) {
      if (!description) {
        setError('Please provide a description.');
        return;
      }
    }

    setStep(step + 1);
  };

  const handlePrevious = () => {
    setError('');
    setStep(step - 1);
  };

  const handleCreateJob = () => {
    navigate('/listings/1?created=true');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
            Create Your Delivery Request
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Fill in the details below and get quotes from verified carriers
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4].map(num => (
              <div
                key={num}
                className={`h-2 flex-1 rounded-full ${
                  num <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Step {step} of 4</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What do you need to move?</h3>
                <p className="text-gray-600 mb-4">Select the type of item you need to ship</p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="FURNITURE">Furniture</option>
                  <option value="CAR">Car</option>
                  <option value="MOTORCYCLE">Motorcycle</option>
                  <option value="VEHICLE">Vehicle</option>
                  <option value="MOVE">Move</option>
                  <option value="FREIGHT">Freight</option>
                  <option value="BOAT">Boat</option>
                  <option value="PARTS">Parts</option>
                  <option value="PIANO">Piano</option>
                  <option value="PETS">Pets</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collection Location</h3>
                <p className="text-gray-600 mb-4">Start typing and pick an address from the list.</p>
                <AddressAutocomplete
                  label="Pickup address"
                  placeholder="123 Main Street, New York"
                  required
                  onChange={(val, data) => setPickupAddress(data)}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Delivery Location</h3>
                <p className="text-gray-600 mb-4">Select where we should deliver your shipment.</p>
                <AddressAutocomplete
                  label="Delivery address"
                  placeholder="456 Oak Avenue, Los Angeles"
                  required
                  onChange={(val, data) => setDeliveryAddress(data)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tell us more about the item(s)</h3>
                <p className="text-gray-600 mb-4">
                  Describe what you need to move. Include details like size, weight, or special requirements.
                </p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="For example: Large wooden dining table, approximately 6 feet long and 3 feet wide. Needs careful handling."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isEbay}
                    onChange={(e) => setIsEbay(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-lg text-gray-700">Is this from eBay?</span>
                </label>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Optional: Upload photos</h3>
                <p className="text-gray-600 mb-4">
                  Photos help carriers understand what they'll be moving. You can upload up to 5 photos.
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <p className="text-gray-600">
                      Drag and drop photos here, or <span className="text-blue-600 underline">browse</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">When would you like the job carried out?</h3>
              <p className="text-gray-600 mb-4">Select when you need your item to be delivered</p>

              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="week"
                    checked={deliveryTime === 'week'}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mt-1"
                  />
                  <span className="text-lg text-gray-700">Within a week</span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="two-weeks"
                    checked={deliveryTime === 'two-weeks'}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mt-1"
                  />
                  <span className="text-lg text-gray-700">Within 2 weeks</span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="specific"
                    checked={deliveryTime === 'specific'}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-lg text-gray-700">On a specific date</span>
                    {deliveryTime === 'specific' && (
                      <input
                        type="date"
                        value={specificDate}
                        onChange={(e) => setSpecificDate(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="between"
                    checked={deliveryTime === 'between'}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-lg text-gray-700">Between specific dates</span>
                    {deliveryTime === 'between' && (
                      <div className="mt-2 space-y-2">
                        <div>
                          <label className="text-sm text-gray-600">From</label>
                          <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">To</label>
                          <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="flexible"
                    checked={deliveryTime === 'flexible'}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mt-1"
                  />
                  <span className="text-lg text-gray-700">Flexible</span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="no-date"
                    checked={deliveryTime === 'no-date'}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="mt-1"
                  />
                  <span className="text-lg text-gray-700">Don't have a date yet</span>
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              {isAuthenticated ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Your Request</h3>
                  <p className="text-gray-600 mb-4">
                    Please review your delivery request and click "Create Job" to submit it.
                  </p>

                  <div className="space-y-3 text-sm">
                    <div><strong>Category:</strong> {category}</div>
                    <div><strong>From:</strong> {pickupAddress?.mainText}</div>
                    <div><strong>To:</strong> {deliveryAddress?.mainText}</div>
                    <div><strong>Description:</strong> {description}</div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 text-sm">
                    Logged in as: user@example.com
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isAuthMode === 'login' ? 'Log in to continue' : 'Create an account to continue'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isAuthMode === 'login' 
                      ? 'Log in to create your delivery request.'
                      : 'Create an account to submit your delivery request and get quotes from carriers.'
                    }
                  </p>

                  <div className="space-y-4">
                    {isAuthMode === 'register' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isAuthMode === 'login' ? 'Enter your password' : 'Create a password (min. 6 characters)'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {isAuthMode === 'register' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    )}

                    <button
                      onClick={handleCreateJob}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      {isAuthMode === 'login' ? 'Log in and Create Job' : 'Register and Create Job'}
                    </button>

                    <p className="text-center text-sm">
                      <button
                        onClick={() => setIsAuthMode(isAuthMode === 'login' ? 'register' : 'login')}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        {isAuthMode === 'login' 
                          ? "Don't have an account? Register" 
                          : 'Already have an account? Log in'
                        }
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={step === 1 ? () => navigate('/') : handlePrevious}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            <ChevronLeft className="h-5 w-5" />
            {step === 1 ? 'Cancel' : 'Previous'}
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Continue
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : isAuthenticated ? (
            <button
              onClick={handleCreateJob}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Create Job
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}