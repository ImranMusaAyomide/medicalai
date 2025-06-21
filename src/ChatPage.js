import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Avatar, CircularProgress } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { generateNutritionResponse } from './services/geminiService';

function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI nutrition and dietetics assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateNutritionResponse(input);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiResponse }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, minHeight: 500, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Nutrition & Dietetics AI Chat
        </Typography>
        <List sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
          {messages.map((msg, idx) => (
            <ListItem key={idx} alignItems={msg.sender === 'ai' ? 'flex-start' : 'flex-end'}>
              {msg.sender === 'ai' && <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}><SmartToyIcon /></Avatar>}
              <ListItemText
                primary={msg.text}
                sx={{ textAlign: msg.sender === 'ai' ? 'left' : 'right' }}
              />
              {msg.sender === 'user' && <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>{'U'}</Avatar>}
            </ListItem>
          ))}
          {isLoading && (
            <ListItem alignItems="flex-start">
              <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}><SmartToyIcon /></Avatar>
              <CircularProgress size={20} />
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading) handleSend(); }}
            disabled={isLoading}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ChatPage; 