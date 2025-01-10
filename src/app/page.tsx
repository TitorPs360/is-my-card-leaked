'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

import '../i18n'; // Import the i18n configuration

interface FormData {
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardHolder: string;
}

const CreditCardForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardHolder: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue =
        value
          .replace(/\s/g, '')
          .match(/.{1,4}/g)
          ?.join(' ') || '';
      formattedValue = formattedValue.substring(0, 19);
    } else if (name === 'expDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    } else if (name === 'cardHolder') {
      formattedValue = value.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleNextClick = () => {
    if (!isFlipped && formData.cardNumber && formData.expDate && formData.cardHolder) {
      setIsFlipped(true);
    }
  };

  const handleSubmit = async () => {
    if (isFormComplete()) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const isFormComplete = (): boolean => {
    return (
      formData.cardNumber.length === 19 &&
      formData.expDate.length === 5 &&
      formData.cvv.length === 3 &&
      formData.cardHolder.length > 0
    );
  };

  if (isLoading || isSubmitted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="text-white text-center max-w-md mx-auto px-4">
          {isLoading ? (
            <div className="space-y-6">
              <div className="relative">
                <Loader2 className="w-20 h-20 animate-spin mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>
              <p className="text-2xl font-medium">{t('scanning')}</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <CheckCircle2 className="w-20 h-20 mx-auto text-green-400" />
              <p className="text-2xl font-medium">{t('success')}</p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    cardNumber: '',
                    expDate: '',
                    cvv: '',
                    cardHolder: '',
                  });
                  setIsFlipped(false);
                }}
                className="mt-6 bg-white text-purple-600 hover:bg-gray-100"
              >
                {t('makeAnother')}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Language Toggle */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1.5 rounded-lg font-medium ${
              i18n.language === 'en' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('th')}
            className={`px-3 py-1.5 rounded-lg font-medium ${
              i18n.language === 'th' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            ไทย
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600 leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Credit Card Display */}
        <div className="relative w-full h-56">
          <div
            className="w-full h-full transition-all duration-700 relative preserve-3d"
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front of card */}
            <div
              className="absolute w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <Card className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-xl">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <CreditCard className="w-12 h-12" />
                    <div className="text-sm">{t('creditCard')}</div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-2xl tracking-wider font-mono">
                      {formData.cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs opacity-75">{t('validThru')}</div>
                        <div className="font-mono">{formData.expDate || 'MM/YY'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-75">{t('cardHolderLabel')}</div>
                        <div>{formData.cardHolder || 'FULL NAME'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Back of card */}
            <div
              className="absolute w-full h-full"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <Card className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-xl">
                <div className="h-full flex flex-col justify-between">
                  <div className="w-full h-12 bg-gray-800 -mx-6 mt-4"></div>
                  <div className="relative">
                    <div className="absolute -right-6 w-3/4 h-10 bg-gray-200">
                      <div className="h-full flex items-center justify-end px-4">
                        <div className="font-mono text-gray-800">{formData.cvv || 'CVV'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs opacity-75 text-right">{t('bankProperty')}</div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {!isFlipped ? (
            <>
              <Input
                type="text"
                name="cardNumber"
                placeholder={t('cardNumber')}
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full"
              />
              <Input
                type="text"
                name="expDate"
                placeholder={t('expDate')}
                value={formData.expDate}
                onChange={handleInputChange}
                className="w-full"
              />
              <Input
                type="text"
                name="cardHolder"
                placeholder={t('cardHolder')}
                value={formData.cardHolder}
                onChange={handleInputChange}
                className="w-full"
              />
              <Button
                onClick={handleNextClick}
                disabled={!formData.cardNumber || !formData.expDate || !formData.cardHolder}
                className="w-full"
              >
                {t('next')}
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                name="cvv"
                placeholder={t('cvv')}
                value={formData.cvv}
                onChange={handleInputChange}
                className="w-full"
                maxLength={3}
              />
              <div className="flex gap-4">
                <Button onClick={() => setIsFlipped(false)} className="w-full" variant="outline">
                  {t('back')}
                </Button>
                <Button onClick={handleSubmit} disabled={!isFormComplete()} className="w-full">
                  {t('submit')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreditCardForm), {
  ssr: false,
});
