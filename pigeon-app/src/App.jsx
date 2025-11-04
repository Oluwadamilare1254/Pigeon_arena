import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

// Main App Component with Routing
function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userData, setUserData] = useState({
    authMethod: '',
    email: '',
    phone: '',
    name: '',
    username: '',
    password: '',
    dob: '',
    interests: []
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {currentScreen === 'splash' && <SplashScreen onNext={() => setCurrentScreen('welcome')} />}
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onNext={() => setCurrentScreen('auth-choice')} 
          onLogin={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'auth-choice' && (
        <AuthChoiceScreen 
          onNext={(method) => {
            setUserData({...userData, authMethod: method});
            setCurrentScreen(method === 'email' ? 'email-input' : 'phone-input');
          }}
          onLogin={() => setCurrentScreen('login')}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}
      {currentScreen === 'email-input' && (
        <EmailInputScreen 
          onNext={(email) => {
            setUserData({...userData, email});
            setCurrentScreen('verify-email');
          }}
          onBack={() => setCurrentScreen('auth-choice')}
          onSwitchToPhone={() => setCurrentScreen('phone-input')}
          onLogin={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'phone-input' && (
        <PhoneInputScreen 
          onNext={(phone) => {
            setUserData({...userData, phone});
            setCurrentScreen('verify-phone');
          }}
          onBack={() => setCurrentScreen('auth-choice')}
          onSwitchToEmail={() => setCurrentScreen('email-input')}
          onLogin={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'verify-email' && (
        <VerificationScreen 
          type="email"
          contact={userData.email}
          onNext={() => setCurrentScreen('name-input')}
          onBack={() => setCurrentScreen('email-input')}
        />
      )}
      {currentScreen === 'verify-phone' && (
        <VerificationScreen 
          type="phone"
          contact={userData.phone}
          onNext={() => setCurrentScreen('name-input')}
          onBack={() => setCurrentScreen('phone-input')}
        />
      )}
      {currentScreen === 'name-input' && (
        <NameInputScreen 
          onNext={(name) => {
            setUserData({...userData, name});
            setCurrentScreen('username-input');
          }}
          onSkip={() => setCurrentScreen('username-input')}
          onBack={() => setCurrentScreen(userData.authMethod === 'email' ? 'verify-email' : 'verify-phone')}
        />
      )}
      {currentScreen === 'username-input' && (
        <UsernameInputScreen 
          onNext={(username, password) => {
            setUserData({...userData, username, password});
            setCurrentScreen('dob-input');
          }}
          onBack={() => setCurrentScreen('name-input')}
        />
      )}
      {currentScreen === 'dob-input' && (
        <DOBInputScreen 
          onNext={(dob) => {
            setUserData({...userData, dob});
            setCurrentScreen('interests');
          }}
          onBack={() => setCurrentScreen('username-input')}
        />
      )}
      {currentScreen === 'interests' && (
        <InterestsScreen 
          onNext={(interests) => {
            setUserData({...userData, interests});
            setCurrentScreen('complete');
          }}
          onBack={() => setCurrentScreen('dob-input')}
        />
      )}
      {currentScreen === 'login' && (
        <LoginScreen 
          onBack={() => setCurrentScreen('welcome')}
          onSuccess={() => setCurrentScreen('complete')}
        />
      )}
      {currentScreen === 'complete' && <CompleteScreen userData={userData} />}
    </div>
  );
}

// Splash Screen
function SplashScreen({ onNext }) {
  React.useEffect(() => {
    const timer = setTimeout(() => onNext(), 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-wider">
          P/GE<span className="inline-block w-12 h-12 bg-white rounded-full align-middle mx-1"></span>N
        </h1>
      </div>
    </div>
  );
}

// Welcome Screen
function WelcomeScreen({ onNext, onLogin }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-wider mb-4">
          P/GE<span className="inline-block w-8 h-8 bg-white rounded-full align-middle mx-1"></span>N
        </h1>
      </div>
      
      <div className="mb-12 text-center">
        <div className="text-6xl mb-6">👀</div>
        <h2 className="text-3xl font-bold mb-2">See what the world</h2>
        <h2 className="text-3xl font-bold">currently believes in.</h2>
      </div>

      <button 
        onClick={onNext}
        className="w-full max-w-md bg-white text-black py-4 rounded-full font-semibold text-lg"
      >
        Get Started
      </button>

      <button onClick={onLogin} className="mt-6 text-red-500">
        Already have an account? Log in
      </button>
    </div>
  );
}

// Auth Choice Screen - Simplified to just phone/email choice
function AuthChoiceScreen({ onNext, onLogin, onBack }) {
  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-8">What's your number?</h2>

      <button 
        onClick={() => onNext('phone')}
        className="w-full bg-[#2a2a2a] rounded-xl p-4 mb-4 text-left flex items-center"
      >
        <span className="mr-3">🇳🇬</span>
        <span className="text-gray-400">+ 234</span>
      </button>

      <button 
        onClick={() => onNext('email')}
        className="text-center py-3 mb-8"
      >
        Use email instead
      </button>

      <div className="mt-auto pb-8">
        <button onClick={onLogin} className="w-full text-red-500">
          I already have an account
        </button>
      </div>
    </div>
  );
}

// Email Input Screen
function EmailInputScreen({ onNext, onBack, onSwitchToPhone, onLogin }) {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-8">What's your email?</h2>

      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="bg-[#2a2a2a] rounded-xl p-4 mb-4 outline-none text-white w-full"
      />

      <button onClick={onSwitchToPhone} className="text-center py-3 mb-8">
        Use number instead
      </button>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => email && onNext(email)}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg disabled:opacity-50"
          disabled={!email}
        >
          Continue
        </button>
        <button onClick={onLogin} className="w-full mt-4 text-red-500">
          I already have an account
        </button>
      </div>
    </div>
  );
}

// Phone Input Screen
function PhoneInputScreen({ onNext, onBack, onSwitchToEmail, onLogin }) {
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-8">What's your number?</h2>

      <div className="flex items-center bg-[#2a2a2a] rounded-xl p-4 mb-4">
        <span className="mr-3">🇳🇬</span>
        <input 
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+ 234"
          className="bg-transparent flex-1 outline-none text-white"
        />
      </div>

      <button onClick={onSwitchToEmail} className="text-center py-3 mb-8">
        Use email instead
      </button>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => phone && onNext(phone)}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg disabled:opacity-50"
          disabled={!phone}
        >
          Continue
        </button>
        <button onClick={onLogin} className="w-full mt-4 text-red-500">
          I already have an account
        </button>
      </div>
    </div>
  );
}

// Verification Screen
function VerificationScreen({ type, contact, onNext, onBack }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(41);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-4">Enter Code</h2>
      <p className="text-gray-400 mb-8">
        We sent a verification code to your {type}, <br />
        <span className="text-white">{contact}</span>
      </p>

      <div className="flex justify-center gap-4 mb-4">
        {code.map((digit, i) => (
          <input
            key={i}
            id={`code-${i}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(i, e.target.value)}
            className="w-16 h-16 bg-[#2a2a2a] rounded-2xl text-center text-2xl outline-none focus:ring-2 focus:ring-white"
          />
        ))}
        <div className="flex items-center ml-4 text-xl">{formatTime(timer)}</div>
      </div>

      {error && <p className="text-yellow-500 text-sm mb-4">{error}</p>}

      <button className="text-gray-400 mb-8">
        Didn't receive any code? <span className="text-red-500">Resend Code</span>
      </button>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => {
            if (code.join('').length === 4) {
              onNext();
            } else {
              setError('Wrong code');
            }
          }}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Name Input Screen
function NameInputScreen({ onNext, onSkip, onBack }) {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={onSkip} className="text-red-500">Skip</button>
      </div>

      <h2 className="text-3xl font-bold mb-8">What's your name?</h2>

      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Profile Name"
        className="bg-[#2a2a2a] rounded-xl p-4 mb-2 outline-none text-white w-full"
      />
      <p className="text-gray-400 text-sm mb-8">You can use special characters and emojis.</p>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => onNext(name || 'User')}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Username Input Screen
function UsernameInputScreen({ onNext, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState('');

  const checkUsername = (value) => {
    if (value.length > 0) {
      if (value === 'dotadams') {
        setUsernameStatus('taken');
      } else {
        setUsernameStatus('available');
      }
    } else {
      setUsernameStatus('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-8">Create an account</h2>

      <div className="mb-4">
        <div className="relative">
          <input 
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              checkUsername(e.target.value);
            }}
            placeholder="Username"
            className="bg-[#2a2a2a] rounded-xl p-4 pr-12 outline-none text-white w-full"
          />
          {username && (
            <button 
              onClick={() => {
                setUsername('');
                setUsernameStatus('');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X size={20} className="text-gray-400" />
            </button>
          )}
        </div>
        {usernameStatus === 'available' && (
          <p className="text-green-500 text-sm mt-1">Great! Username is available</p>
        )}
        {usernameStatus === 'taken' && (
          <p className="text-yellow-500 text-sm mt-1">Username not available</p>
        )}
        <p className="text-gray-400 text-sm mt-1">
          Only use letters, numbers, underscores, and periods.
        </p>
      </div>

      <div className="relative mb-8">
        <input 
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-[#2a2a2a] rounded-xl p-4 pr-12 outline-none text-white w-full"
        />
        <button 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
        </button>
        <p className="text-gray-400 text-sm mt-1">Passwords must be 8 or more characters.</p>
      </div>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => username && password.length >= 8 && usernameStatus === 'available' && onNext(username, password)}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg disabled:opacity-50"
          disabled={!username || password.length < 8 || usernameStatus !== 'available'}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// DOB Input Screen
function DOBInputScreen({ onNext, onBack }) {
  const [dob, setDob] = useState('');

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-8">And, How old are you?</h2>

      <label className="text-gray-400 text-sm mb-2">Date of Birth</label>
      <input 
        type="text"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        placeholder="DD/MM/YYYY"
        className="bg-[#2a2a2a] rounded-xl p-4 outline-none text-white w-full mb-2"
      />
      <p className="text-gray-400 text-sm mb-8">You must be 18 and above to join Pigeon.</p>

      <div className="mt-auto pb-8">
        <p className="text-gray-400 text-sm text-center mb-4">
          By clicking "Enter Pigeon," you agree to Pigeon's{' '}
          <span className="text-red-500">Terms of Service</span> and have read the{' '}
          <span className="text-red-500">Privacy Policy</span>
        </p>
        <button 
          onClick={() => dob && onNext(dob)}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg disabled:opacity-50"
          disabled={!dob}
        >
          Enter Pigeon
        </button>
      </div>
    </div>
  );
}

// Interests Screen
function InterestsScreen({ onNext, onBack }) {
  const [selected, setSelected] = useState([]);

  const interests = [
    { icon: '⚽', label: 'Sports' },
    { icon: '🎮', label: 'Gaming' },
    { icon: '💰', label: 'Crypto & Finance' },
    { icon: '🗳️', label: 'Politics' },
    { icon: '🔬', label: 'Science' },
    { icon: '🎭', label: 'Culture & Entertainment' },
    { icon: '📊', label: 'Markets & Economy' },
    { icon: '🤖', label: 'Tech & AI' },
    { icon: '😂', label: 'Memes & Pop Culture' },
    { icon: '🔮', label: 'Future Trends' },
    { icon: '👤', label: 'Influencer & Lifestyle' }
  ];

  const toggleInterest = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter(i => i !== label));
    } else {
      setSelected([...selected, label]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-4">Pick what you're into</h2>
      <p className="text-gray-400 mb-8">
        Choose 3-5 topics to personalize your Pigeon experience and we'll curate the best events for your feed
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {interests.map((interest) => (
          <button
            key={interest.label}
            onClick={() => toggleInterest(interest.label)}
            className={`px-4 py-3 rounded-full flex items-center gap-2 transition-colors ${
              selected.includes(interest.label)
                ? 'bg-white text-black'
                : 'bg-[#2a2a2a] text-white'
            }`}
          >
            <span>{interest.icon}</span>
            <span>{interest.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => selected.length >= 3 && onNext(selected)}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg disabled:opacity-50"
          disabled={selected.length < 3}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Login Screen
function LoginScreen({ onBack, onSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col px-6 pt-16">
      <button onClick={onBack} className="self-start mb-8">
        <span className="text-2xl">←</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-12">
          P/GE<span className="inline-block w-6 h-6 bg-gray-400 rounded-full align-middle mx-1"></span>N
        </h1>
      </div>

      <h2 className="text-3xl font-bold mb-8">Welcome back!</h2>

      <input 
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Email, phone number or username"
        className="bg-[#2a2a2a] rounded-xl p-4 mb-4 outline-none text-white w-full"
      />

      <div className="relative mb-8">
        <input 
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-[#2a2a2a] rounded-xl p-4 pr-12 outline-none text-white w-full"
        />
        <button 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
        </button>
      </div>

      <button className="text-center py-3 mb-8">Other methods</button>

      <div className="mt-auto pb-8">
        <button 
          onClick={() => identifier && password && onSuccess()}
          className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg disabled:opacity-50"
          disabled={!identifier || !password}
        >
          Enter Pigeon
        </button>
        <button onClick={onBack} className="w-full mt-4 text-red-500">
          I don't have an account
        </button>
      </div>
    </div>
  );
}

// Complete Screen
function CompleteScreen({ userData }) {
  return (
    <div className="h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold mb-4">All Set!</h2>
        <p className="text-gray-400 mb-8">Welcome to Pigeon, {userData.name || userData.username}!</p>
        <div className="bg-[#2a2a2a] p-6 rounded-2xl text-left">
          <p className="text-sm text-gray-400 mb-2">Your Profile:</p>
          {userData.name && <p className="mb-1">Name: {userData.name}</p>}
          {userData.username && <p className="mb-1">Username: @{userData.username}</p>}
          {userData.email && <p className="mb-1">Email: {userData.email}</p>}
          {userData.phone && <p className="mb-1">Phone: {userData.phone}</p>}
          {userData.interests.length > 0 && (
            <p className="mb-1">Interests: {userData.interests.join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;