import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle email change
  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError && validateEmail(text)) {
      setEmailError('');
    }
  };

  // Handle password change
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (passwordError && validatePassword(text)) {
      setPasswordError('');
    }
  };

  // Handle login
  const handleLogin = async () => {
    let hasError = false;

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      const loginData = {
        email: email.toLowerCase().trim(),
        password: password,
        timestamp: new Date().toISOString(),
        deviceInfo: {
          platform: Platform.OS,
          screenWidth: width,
          screenHeight: height,
        }
      };

      console.log('Login Data JSON:', JSON.stringify(loginData, null, 2));
      
      Alert.alert(
        'Login Successful! 🎉',
        `Welcome back!\n\nEmail: ${email}\nPassword: ${'•'.repeat(password.length)}\n\nJSON data logged to console for backend integration.`,
        [
          {
            text: 'OK',
            style: 'default',
          },
        ]
      );
    }, 1500);
  };

  // Handle get started
  const handleGetStarted = () => {
    setIsLoginMode(true);
  };

  // Handle sign up
  const handleSignUp = () => {
    Alert.alert(
      'Sign Up',
      'Redirecting to registration screen...',
      [{ text: 'OK' }]
    );
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset link will be sent to your email address.',
      [{ text: 'OK' }]
    );
  };

  const AppLogo = ({ isLoginScreen = false }) => (
    <View style={styles.logoContainer}>
      <Image 
        source={require('./assets/Kubernetes.png')} 
        style={isLoginScreen ? styles.loginLogoImage : styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );

  if (!isLoginMode) {
    // Welcome Screen
    return (
      <SafeAreaView style={styles.welcomeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Animated.View
          style={[
            styles.welcomeContent,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ],
            },
          ]}
        >
          <AppLogo />
          
          <Text style={styles.welcomeTitle}>Welcome To</Text>
          <Text style={styles.welcomeSubtitle}>
            Create an account and access thousand{'\n'}of cool stuffs
          </Text>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>
              Do you have an account ? 
            </Text>
            <TouchableOpacity onPress={handleGetStarted}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }

  // Login Screen
  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.loginScrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.loginContent,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ],
              },
            ]}
          >
            <View style={styles.loginHeader}>
              <AppLogo isLoginScreen={true} />
              <Text style={styles.loginTitle}>Log In Now</Text>
              <Text style={styles.loginSubtitle}>Please login to continue using our app</Text>
            </View>

            <View style={styles.loginFormContainer}>
              <View style={styles.inputContainer}>
                <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#B0B0B0"
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              <View style={styles.inputContainer}>
                <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#B0B0B0"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#9CA3AF" 
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Loading...' : 'Log In'}
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                  Don't have an account? 
                </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Welcome Screen Styles
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  welcomeContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  logoContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: 250,
    height: 250
  },
  loginLogoImage: {
    width: 140,
    height: 140,
    marginTop: 80,
    marginBottom: 25
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 20,
    textAlign: 'center'
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 50
  },
  getStartedButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 15,
    paddingVertical: 16,
    width: "100%",
    marginBottom: 20,
    shadowColor: '#1E40AF',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  getStartedButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginPromptText: {
    fontSize: 16,
    color: '#6B7280'
  },
  loginLink: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    marginLeft: 5
  },

  // Login Screen Styles
  loginContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  keyboardAvoid: {
    flex: 1
  },
  loginScrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingVertical: 60
  },
  loginContent: {
    flex: 1
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 50
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 12,
    textAlign: 'center'
  },
  loginSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 24
  },
  loginFormContainer: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 20
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    paddingVertical: 4,
    height: 56
  },
  inputError: {
    borderColor: '#EF4444'
  },
  inputIcon: {
    marginRight: 12
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 12
  },
  eyeIcon: {
    padding: 8
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30
  },
  forgotPasswordText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500'
  },
  loginButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#1E40AF',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  loginButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000'
  },
  signUpLink: {
    color: '#1E40AF',
    fontWeight: '600',
    marginLeft: 5
  }
});

export default LoginScreen;