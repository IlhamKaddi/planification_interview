"use client";
import React, { useState } from 'react';
import { Calendar, Clock, Video, Send, Check, AlertCircle } from 'lucide-react';
import './globals.css'

const ScheduleInterview = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    videoLink: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Example mock candidate data
  const candidate = {
    name: "Marie Dubois",
    position: "Frontend Developer",
    email: "marie.dubois@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    
    if (!formData.videoLink) {
      newErrors.videoLink = "Video link is required";
    }
    
    if (formData.videoLink && !isValidUrl(formData.videoLink)) {
      newErrors.videoLink = "Please enter a valid link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        date: '',
        time: '',
        videoLink: '',
        message: ''
      });
    }, 5000);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Scheduled!</h2>
          <p className="text-gray-600 mb-6">
            A notification has been sent to {candidate.name}, along with a confirmation email.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-600 mb-1">Interview details:</p>
            <p className="font-medium">{new Date(formData.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p className="font-medium">{formData.time}</p>
            {formData.videoLink && (
              <p className="text-blue-600 text-sm mt-2 break-all">{formData.videoLink}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule an Interview</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interview Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 ">
              <div className="space-y-6">
                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 ">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Interview Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getTomorrowDate()}
                      className={`w-full px-4 py-3 border rounded-xl  transition-all ${
                        errors.date ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Interview Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl  transition-all ${
                        errors.time ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none`}
                    />
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Video Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Video className="w-4 h-4 inline mr-2" />
                    Video Conference Link
                  </label>
                  <input
                    type="url"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleInputChange}
                    placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                    className={`w-full px-4 py-3 border rounded-xl  transition-all ${
                      errors.videoLink ? 'border-red-500' : 'border-gray-300'
                    } `}
                  />
                  {errors.videoLink && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.videoLink}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personalized Message (optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Add any additional information for the candidate..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl  transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02]  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending....
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Invitation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterview;
