import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar,
  Chip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ScheduleIcon from '@mui/icons-material/Schedule';

const features = [
  {
    icon: <RestaurantIcon />,
    title: 'Meal Planning',
    description: 'Get personalized meal plans based on your dietary preferences and health goals',
    color: '#4CAF50',
    tags: ['Custom Plans', 'Dietary Restrictions']
  },
  {
    icon: <LocalHospitalIcon />,
    title: 'Health Guidance',
    description: 'Evidence-based nutrition advice for various health conditions and wellness goals',
    color: '#2196F3',
    tags: ['Medical Advice', 'Wellness']
  },
  {
    icon: <FitnessCenterIcon />,
    title: 'Fitness Nutrition',
    description: 'Optimize your nutrition for workout performance and muscle building',
    color: '#FF9800',
    tags: ['Performance', 'Recovery']
  },
  {
    icon: <PsychologyIcon />,
    title: 'Behavioral Support',
    description: 'Get tips on developing healthy eating habits and maintaining motivation',
    color: '#9C27B0',
    tags: ['Habits', 'Motivation']
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Progress Tracking',
    description: 'Monitor your nutrition journey and track your health improvements',
    color: '#E91E63',
    tags: ['Analytics', 'Goals']
  },
  {
    icon: <ScheduleIcon />,
    title: '24/7 Availability',
    description: 'Access professional nutrition advice anytime, anywhere through AI assistance',
    color: '#607D8B',
    tags: ['Always Available', 'Instant Help']
  }
];

function FeatureCards() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          mb: 4, 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        What I Can Help You With
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: isMobile ? 2 : 3,
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            sx={{
              flex: isMobile ? '1 1 100%' : '1 1 30%',
              minWidth: isMobile ? '100%' : 260,
              maxWidth: isMobile ? '100%' : 340,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: isMobile ? 2 : 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  mb: 2,
                  background: `linear-gradient(45deg, ${feature.color}, ${feature.color}dd)`,
                  boxShadow: `0 8px 24px ${feature.color}40`
                }}
              >
                {feature.icon}
              </Avatar>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 600,
                  color: feature.color
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2, lineHeight: 1.6 }}
              >
                {feature.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                {feature.tags.map((tag, tagIndex) => (
                  <Chip
                    key={tagIndex}
                    label={tag}
                    size="small"
                    sx={{
                      background: `${feature.color}15`,
                      color: feature.color,
                      fontWeight: 500,
                      '&:hover': {
                        background: `${feature.color}25`,
                      }
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default FeatureCards; 