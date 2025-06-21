import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Avatar, 
  CircularProgress,
  Paper,
  IconButton,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { generateNutritionResponse } from './services/geminiService';
import FeatureCards from './components/FeatureCards';

const LOCAL_STORAGE_KEY = 'nutriAI_chat_messages';

function ChatPage() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      // Parse and revive Date objects
      return JSON.parse(saved).map(msg => ({
        ...msg,
        timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
      }));
    }
    return [
      {
        sender: 'ai',
        text: "Hello! I'm your AI nutrition and dietetics assistant. I can help you with meal planning, dietary advice, and healthy eating tips. What would you like to know today?",
        timestamp: new Date()
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateNutritionResponse(input);
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'ai', 
          text: aiResponse,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'ai', 
          text: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
          color: 'white',
          py: 2,
          px: 3,
          boxShadow: '0 2px 20px rgba(76, 175, 80, 0.3)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)'
              }}
            >
              <RestaurantIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                NutriAI Assistant
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Your Personal AI Nutritionist & Dietitian
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* Feature Cards */}
      <Container maxWidth="md">
        <FeatureCards />
      </Container>
      {/* Chat Messages */}
      <Container maxWidth="md" sx={{ flex: 1, py: 3, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 3 }}>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'ai' ? 'flex-start' : 'flex-end',
                mb: 2
              }}
            >
              <Card
                sx={{
                  maxWidth: '70%',
                  borderRadius: 3,
                  background: msg.sender === 'ai' 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                    : 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
                  color: msg.sender === 'ai' ? 'text.primary' : 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: msg.sender === 'ai' ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'
                }}
              >
                <CardContent sx={{ p: 2, pb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                    {msg.sender === 'ai' && (
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                          boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                        }}
                      >
                        <SmartToyIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        {msg.text}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          opacity: 0.7, 
                          display: 'block', 
                          mt: 1,
                          textAlign: msg.sender === 'ai' ? 'left' : 'right'
                        }}
                      >
                        {formatTime(msg.timestamp)}
                      </Typography>
                    </Box>
                    {msg.sender === 'user' && (
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          background: 'rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 2px 8px rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        U
                      </Avatar>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
          
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
              >
                <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                  <CircularProgress size={20} sx={{ color: '#4CAF50' }} />
                  <Typography variant="body2" color="text.secondary">
                    Thinking...
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Paper
          elevation={8}
          sx={{
            p: 2,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Ask me about nutrition, meal planning, or healthy eating..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { 
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              sx={{
                background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #45a049, #7cb342)',
                  transform: 'scale(1.05)',
                },
                '&:disabled': {
                  background: '#ccc',
                  color: '#666',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ChatPage; 