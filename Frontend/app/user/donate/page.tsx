"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Shield, Award, TrendingUp, TrendingDown } from 'lucide-react';

const TempleDonationPage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedTemple, setSelectedTemple] = useState('');
  const [donationPurpose, setDonationPurpose] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [cryptoPrices, setCryptoPrices] = useState({
    bitcoin: { price: 67234.45, change: 2.34 },
    ethereum: { price: 3456.78, change: -1.23 },
    bnb: { price: 542.12, change: 0.89 },
    polygon: { price: 0.87, change: 3.45 },
    cardano: { price: 0.43, change: -2.1 },
    solana: { price: 195.67, change: 4.56 }
  });

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => {
        const newPrices = { ...prev };
        Object.keys(newPrices).forEach(coin => {
          const randomChange = (Math.random() - 0.5) * 2; // Random change between -1 and 1
          const newPrice = prev[coin].price * (1 + randomChange / 100);
          newPrices[coin] = {
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(randomChange.toFixed(2))
          };
        });
        return newPrices;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const temples = [
    'Tirupati Balaji Temple',
    'Golden Temple, Amritsar',
    'Kedarnath Temple',
    'Vaishno Devi Temple',
    'Shirdi Sai Baba Temple'
  ];

  const purposes = [
    'General Fund',
    'Prasadam Distribution',
    'Temple Maintenance',
    'Festival Celebrations',
    'Educational Programs',
    'Community Kitchen'
  ];

  const handleWalletConnect = () => {
    alert('Wallet connection will be handled by your navbar component');
  };

  const handleDonate = () => {
    if (!donationAmount || !selectedTemple || !donationPurpose || !selectedCrypto) {
      alert('Please fill all fields');
      return;
    }
    const cryptoInfo = {
      bitcoin: 'BTC',
      ethereum: 'ETH', 
      bnb: 'BNB',
      polygon: 'MATIC',
      cardano: 'ADA',
      solana: 'SOL'
    };
    alert(`Donation of ${donationAmount} ${cryptoInfo[selectedCrypto]} to ${selectedTemple} for ${donationPurpose} initiated!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Live Crypto Prices
          </h2>
          
          {/* Crypto Price Ticker */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-4 mb-8 border border-gray-600">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse mr-2"></div>
              <h3 className="text-white text-sm font-semibold">Live Crypto Prices</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(cryptoPrices).map(([coin, data]) => {
                const coinInfo = {
                  bitcoin: { symbol: 'BTC', color: 'from-orange-400 to-orange-600' },
                  ethereum: { symbol: 'ETH', color: 'from-blue-400 to-blue-600' },
                  bnb: { symbol: 'BNB', color: 'from-yellow-400 to-yellow-600' },
                  polygon: { symbol: 'MATIC', color: 'from-purple-400 to-purple-600' },
                  cardano: { symbol: 'ADA', color: 'from-cyan-400 to-cyan-600' },
                  solana: { symbol: 'SOL', color: 'from-green-400 to-green-600' }
                };
                const info = coinInfo[coin];
                
                return (
                  <div key={coin} className="bg-gray-700 backdrop-blur-sm rounded-lg p-3 border border-gray-600 hover:border-gray-500 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mr-2`}>
                        <span className="text-white text-xs font-bold">
                          {info.symbol.slice(0, 1)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-xs">{info.symbol}</h4>
                    </div>
                    
                    <p className="text-lg font-bold text-white mb-1">
                      ${data.price > 1000 ? (data.price/1000).toFixed(1) + 'K' : data.price.toFixed(2)}
                    </p>
                    <div className={`flex items-center text-xs ${
                      data.change >= 0 ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {data.change >= 0 ? 
                        <TrendingUp className="w-3 h-3 mr-1" /> : 
                        <TrendingDown className="w-3 h-3 mr-1" />
                      }
                      <span className="font-medium">
                        {data.change >= 0 ? '+' : ''}{data.change}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make donations using various cryptocurrencies with complete transparency. 
            Track your contributions in real-time with blockchain technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h3>
              
              <div className="space-y-6">
                {/* Temple Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Temple
                  </label>
                  <select
                    value={selectedTemple}
                    onChange={(e) => setSelectedTemple(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Choose a temple...</option>
                    {temples.map((temple, index) => (
                      <option key={index} value={temple}>{temple}</option>
                    ))}
                  </select>
                </div>

                {/* Purpose Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Purpose
                  </label>
                  <select
                    value={donationPurpose}
                    onChange={(e) => setDonationPurpose(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select purpose...</option>
                    {purposes.map((purpose, index) => (
                      <option key={index} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>

                {/* Cryptocurrency Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Cryptocurrency
                  </label>
                  <select
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="bitcoin">Bitcoin (BTC)</option>
                    <option value="ethereum">Ethereum (ETH)</option>
                    <option value="bnb">Binance Coin (BNB)</option>
                    <option value="polygon">Polygon (MATIC)</option>
                    <option value="cardano">Cardano (ADA)</option>
                    <option value="solana">Solana (SOL)</option>
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount ({selectedCrypto ? Object.entries({
                      bitcoin: 'BTC',
                      ethereum: 'ETH', 
                      bnb: 'BNB',
                      polygon: 'MATIC',
                      cardano: 'ADA',
                      solana: 'SOL'
                    }).find(([key]) => key === selectedCrypto)?.[1] : 'Crypto'})
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder={`Enter amount in ${selectedCrypto ? Object.entries({
                      bitcoin: 'BTC',
                      ethereum: 'ETH', 
                      bnb: 'BNB',
                      polygon: 'MATIC',
                      cardano: 'ADA',
                      solana: 'SOL'
                    }).find(([key]) => key === selectedCrypto)?.[1] : 'crypto'}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    min="0.001"
                    step="0.001"
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {selectedCrypto === 'bitcoin' && [0.001, 0.005, 0.01, 0.05].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount.toString())}
                        className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm"
                      >
                        {amount} BTC
                      </button>
                    ))}
                    {selectedCrypto === 'ethereum' && [0.01, 0.05, 0.1, 0.5].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount.toString())}
                        className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm"
                      >
                        {amount} ETH
                      </button>
                    ))}
                    {(selectedCrypto === 'bnb' || selectedCrypto === 'solana') && [0.1, 0.5, 1, 5].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount.toString())}
                        className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm"
                      >
                        {amount} {selectedCrypto === 'bnb' ? 'BNB' : 'SOL'}
                      </button>
                    ))}
                    {(selectedCrypto === 'polygon' || selectedCrypto === 'cardano') && [1, 10, 50, 100].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount.toString())}
                        className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm"
                      >
                        {amount} {selectedCrypto === 'polygon' ? 'MATIC' : 'ADA'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Why Donate Here?</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-800">Transparent</h5>
                    <p className="text-sm text-gray-600">Every transaction recorded on blockchain</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-800">Verified</h5>
                    <p className="text-sm text-gray-600">All temples verified and authentic</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-800">Impact Tracking</h5>
                    <p className="text-sm text-gray-600">See how your donation is used</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Recent Donations</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">₹2,500</p>
                    <p className="text-sm text-gray-600">Tirupati Balaji</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">₹1,000</p>
                    <p className="text-sm text-gray-600">Golden Temple</p>
                  </div>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">₹500</p>
                    <p className="text-sm text-gray-600">Kedarnath Temple</p>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>

            {/* Total Raised */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <h4 className="text-lg font-bold mb-2">Total Raised</h4>
              <p className="text-3xl font-bold">₹12,45,678</p>
              <p className="text-orange-100 text-sm">This month: ₹2,34,567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 DevTemple. Empowering sacred traditions through blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TempleDonationPage;