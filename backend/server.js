// Simple AI Architecture Generator Backend
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  });

  // Test endpoint
  app.get('/', (req, res) => {
    res.send('🚀 AI Architect Backend is Running!');
    });

    // Health check
    app.get('/health', (req, res) => {
      res.json({
          status: 'healthy',
              message: 'AI Architect Backend',
                  timestamp: new Date().toISOString()
                    });
                    });

                    // Generate architecture
                    app.post('/api/generate', async (req, res) => {
                      try {
                          const { requirements } = req.body;
                              
                                  if (!requirements) {
                                        return res.status(400).json({ error: 'Please provide requirements' });
                                            }

                                                const prompt = `Create a complete software architecture for: ${requirements}

                                                Please provide in JSON format with these sections:
                                                1. project_structure - folder and file structure
                                                2. technology_stack - recommended technologies
                                                3. key_features - main features to implement
                                                4. api_endpoints - if applicable
                                                5. database_schema - if needed

                                                Return ONLY valid JSON.`;

                                                    const response = await openai.chat.completions.create({
                                                          model: "gpt-3.5-turbo",
                                                                messages: [{ role: "user", content: prompt }],
                                                                      temperature: 0.7,
                                                                          });

                                                                              const content = response.choices[0].message.content;
                                                                                  
                                                                                      // Try to parse as JSON
                                                                                          try {
                                                                                                const architecture = JSON.parse(content);
                                                                                                      res.json({
                                                                                                              success: true,
                                                                                                                      message: 'Architecture generated successfully!',
                                                                                                                              architecture
                                                                                                                                    });
                                                                                                                                        } catch (e) {
                                                                                                                                              res.json({
                                                                                                                                                      success: true,
                                                                                                                                                              message: 'Architecture generated!',
                                                                                                                                                                      architecture: { description: content }
                                                                                                                                                                            });
                                                                                                                                                                                }

                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                      console.error('AI Error:', error);
                                                                                                                                                                                          res.status(500).json({
                                                                                                                                                                                                success: false,
                                                                                                                                                                                                      error: error.message,
                                                                                                                                                                                                            help: 'Make sure OPENAI_API_KEY is set in .env file'
                                                                                                                                                                                                                });
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                  });

                                                                                                                                                                                                                  // Start server
                                                                                                                                                                                                                  const PORT = process.env.PORT || 5000;
                                                                                                                                                                                                                  app.listen(PORT, () => {
                                                                                                                                                                                                                    console.log(`✅ Backend running on port ${PORT}`);
                                                                                                                                                                                                                      console.log(`🔗 http://localhost:${PORT}`);
                                                                                                                                                                                                                        console.log(`🏥 Health: http://localhost:${PORT}/health`);
                                                                                                                                                                                                                        });